module.exports = checkAuth = (req, res, next) => {
   //get the authorization header that was sent by the client
   const auth = req.headers['authorization'];

   const userpass = auth.split(' ')[1];

   //decode userpass to "username:password"
   const text = Buffer.from(userpass, 'base64').toString('ascii');

   //get username and password individually
   const username = text.split(':')[0];
   const password = text.split(':')[1];

   if (username == 'admin' && password == 123456) {
      //auth successful, access to the route is granted
      return next();
   } else {
      //username and password is wrong, auth unsuccessful
      return res.json('Access Denied Authentication.');
   }
};
