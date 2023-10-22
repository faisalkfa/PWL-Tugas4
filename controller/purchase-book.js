const PurchaseBook = require('../model/books');

exports.getPurchase = async (req, res) => {
    try {
        const books = await PurchaseBook.find();
        res.status(200).json({
            status: 'success',
            requestAt: req.requestTime,
            data: {
                purchase: books,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'failed request',
            message: err,
        });
    }
};
exports.getPurhcaseBookById = async (req, res) => {
    try {
        const book = await PurchaseBook.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            requestAt: req.requestTime,
            data: {
                purchase: book,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'failed request',
            message: err,
        });
    }
};
exports.createPurchase = async (req, res) => {
    try {
        const title = req.body.title;
        const author = req.body.author;
        const price = req.body.price;
        const genre = req.body.genre;

        const newBook = await PurchaseBook.create({
            title: title,
            author: author,
            price: price,
            genre: genre,
        });
        res.status(201).json({
            status: 'create success',
            books: {
                book: newBook,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err,
        });
    }
};
exports.updatePurchase = async (req, res) => {
    try {
        const purchaseUpdate = await PurchaseBook.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: 'update success',
            data: {
                purchaseUpdate,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'error, invalid object or ID',
            message: err,
        });
    }
};
exports.deletePurchaseById = async (req, res) => {
    try {
        const deletedPurchase = await PurchaseBook.findByIdAndDelete(req.params.id);
        if (!deletedPurchase) {
            res.status(404).json({
                status: 'error',
                message: 'Purchase not found',
            });
        } else {
            res.status(200).json({
                status: 'delete success',
                data: null,
            });
        }
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
};
exports.deleteAllPurchase = async (req, res) => {
    try {
        const result = await PurchaseBook.deleteMany({});
        if (result.deletedCount > 0) {
            res.status(200).json({
                message: 'delete success',
                data: null,
            });
        } else {
            res.status(200).json({
                message: 'no entries deleted',
                data: null,
            });
        }
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
};
