export const verifyRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.roles) {
      return res.status(401).json({ message: "User roles not found" });
    }

    // Check if user has at least one of the allowed roles
    const hasAccess = req.user.roles.some(role => allowedRoles.includes(role));

    console.log("Allowed Roles:", allowedRoles);
    console.log("User Roles:", req.user.roles);
    console.log("Has Access:", hasAccess);

    if (!hasAccess) {
      return res.status(403).json({ message: "Access denied. Not authorized." });
    }

    next();
  };
};
