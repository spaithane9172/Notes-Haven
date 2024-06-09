const jwt = require("jsonwebtoken");

//secrete key for jwt token
const JWT_SECRETE = "rajuthedone";

//this is middleware function
const fetchUser = (req, res, next) => {
  //taking auth token from request header
  const token = req.header("auth-header");

  //if token not exists then below resonse send
  if (!token) {
    res.status(401).json({ error: "Authenticate using valid token." });
  }

  //if token exists
  try {
    //verify token and get payload
    const data = jwt.verify(token, JWT_SECRETE);
    //set user in request
    req.user = data.user;
    //request is send to /getUser end point
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Authenticate using valid token." });
  }
};

module.exports = fetchUser;
