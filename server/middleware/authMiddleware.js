import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  // const token = req.header("Authorization");
  const token = req.cookies.token;
  console.log("Token from cookies", token);

  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decode token", decoded); // Check if the decoded token has the user info
    req.user = decoded;
    console.log("User set in request:", req.user);
    next();
  } catch (err) {
    res.status(401).json({ message: "Not authorized to access this route" });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "User role is not authorized to access this route" });
    }
    next();
  };
};