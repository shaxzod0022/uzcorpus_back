const jwt = require("jsonwebtoken");

const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token mavjud emas" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Token yaroqsiz" });
  }
};

module.exports = verifyAdmin;
