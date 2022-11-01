const checkAuthentication = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.redirect("/index");
	}
};
module.exports = checkAuthentication;
