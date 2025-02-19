import { verifyToken } from "./auth.middleware.js";

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role !== "admin") {
      return res.status(403).send({
        success: false,
        message: "Access denied: Admins only",
      });
    }

    next();
  });
};
