export const checkRole = (roles) => {
    return (req, res, next) => {
        const userRole = req.role; 
        if (!roles.includes(userRole)) {
            return res.status(403).json({
                message: "You are not authorized to perform this action.",
                success: false,
            });
        }
        next();
    };
};