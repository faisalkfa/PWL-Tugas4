**rayhan_zettacamp_dolphin**
**Name:** Rayhan Zidane Achmad
**Position:** Back-End

### explain $facet
$facet is a stage in a MongoDB aggregation operation that allows you to run multiple aggregation stages in parallel and produce multiple results at once. $facet is useful when we want to perform multiple aggregation operations on the same data and process them separately.
in my case, I want to run two separate aggregation operations on my collection namely to determine the books per page and the total price of the books on each page.

### explain $skip
$skip is a stage in the MongoDB aggregation operation which is used to ignore a certain number of initial documents in the aggregation results. Using $skip, we can skip a specified number of documents in a collection before retrieving or generating documents that match certain criteria.
The use of $skip is useful when we want to divide the aggregation results into several pages or when we are only interested in certain portions of data from the aggregation results.

### explain $group
group is one of the stages in the MongoDB aggregation operation which is used to group documents based on certain values in one or several fields and perform calculations or aggregations on the documents included in each group

### explain $limit
$limit is one of the stages in the MongoDB aggregation operation which is used to limit the number of documents produced by the aggregation. Using $limit, we can retrieve only a specified number of aggregation results that match certain criteria.
