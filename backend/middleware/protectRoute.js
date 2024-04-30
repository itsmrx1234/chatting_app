import jwt from "jsonwebtoken";
import User from "../model/User.model";

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt; // Corrected to req.cookies.jwt
        if (!token) {
            return res.status(401).json({ error: "No token" });
        } 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ error: "Invalid token" });
        }
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error("Error in protectRoute middleware:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export default protectRoute;
