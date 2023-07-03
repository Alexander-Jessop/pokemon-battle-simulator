export var checkAuthMiddleware = function (req, res, next) {
    var sessionUser = req.session;
    !sessionUser.user ? res.status(401).json({ error: "Unauthorized" }) : next();
};
