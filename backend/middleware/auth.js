import jwt from 'jsonwebtoken';

export const JWT_SECRET = 'AWS_DASHBOARD_SECRET_KEY_2026';

export const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (!bearerHeader) return res.status(403).json({ error: "Access Denied: No token provided" });
  
  const token = bearerHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Gắn info (id, username, role) vào req để dùng ở API sau
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
  }
};

export const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden: You don't have permission for this action" });
    }
    next();
  };
};
