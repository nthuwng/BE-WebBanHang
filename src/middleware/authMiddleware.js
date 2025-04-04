const jwt = require("jsonwebtoken");

const checkAdminMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]; // Lấy token từ header Authorization

  if (!token) {
    return res.status(403).json({ message: "Không có quyền truy cập" });
  }

  try {
    // Tách "Bearer" ra khỏi token
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);

    // Kiểm tra role người dùng
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Bạn không có quyền admin" });
    }

    req.user = decoded; // Gắn thông tin người dùng vào request
    next(); // Tiếp tục xử lý
  } catch (error) {
    return res.status(500).json({ message: "Token không hợp lệ hoặc hết hạn" });
  }
};


module.exports = checkAdminMiddleware;
