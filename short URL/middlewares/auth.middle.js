const { getUser } = require("../service/auth.service")

function checkForAuth(req, res, next) {
    const tokenCookies = req.cookies?.token;
    req.user = null;

    if (!tokenCookies) return next();

    const token = tokenCookies;
    const user = getUser(token);

    req.user = user;
    return next();
}

function restrictTo(roles){
    return function(req, res, next){
        if(!req.user) return res.redirect("/login");
        
        if(!roles.includes(req.user.role)) return res.end("UnAuthorize");

        return next();
    };
}

// async function restrictToLoggedInUserOnly(req, res, next) {
//     const userUid = req.headers['Authorization'];

//     console.log(req.headers);
    
//     if(!userUid) return res.redirect("/login");
//     const token = userUid.split('Bearer')[1];
//     const user = getUser(token);

//     if(!user) return res.redirect("/login");

//     req.user = user;
//     next();
// }

// async function checkAuth(req, res, next) {
//     const userUid = req.headers['authorization'];
//     console.log(req.headers);
//     const token = userUid.split('Bearer ')[1];

//     const user = getUser(token);

//     req.user = user;
//     next();
// }

module.exports = {
    checkForAuth,
    restrictTo
}