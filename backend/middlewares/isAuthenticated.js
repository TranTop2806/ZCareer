import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token){
            return res.status(401).json({
                message: "Authentication failed.",
                success: false,
            });
        }
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        // console.log("Decoded token in middleware:", decoded);
        if (!decoded){
            return res.status(401).json({
                message: "Authentication failed.",
                success: false,
            });
        }
        req.id = decoded.userId;
        // console.log(`Decoded User ID: ${decoded.userID}`); 
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Authentication failed.",
            success: false,
            error: error.message, 
        });
    }
};
export default isAuthenticated;