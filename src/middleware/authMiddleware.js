const jwt = require('jsonwebtoken');

// Middleware để xác thực người dùng
const authUserMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Không có token, truy cập bị từ chối' });
    }

    try {
        // Xác thực JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Gắn thông tin người dùng vào request
        next();  // Chuyển sang bước tiếp theo (controller)
    } catch (error) {
        return res.status(401).json({ message: 'Token không hợp lệ hoặc hết hạn' });
    }
};

module.exports = authUserMiddleware;
