const {v4: uuidv4} = require('uuid')
const User = require("../model/user.model")
const { getUser, setUser} = require("../service/auth.service")

async function handleUserSignup(req, res) {
    const {name, email, password } = req.body;
    await User.create ({
        name,
        email,
        password,
    })

    return res.redirect("/");
}

async function handleUserLogin(req, res) {
    const {email, password } = req.body;
    const user = await User.findOne({
        email, password
    })

    if(!user) return res.render('login.view.ejs', {
        error: "invalid Username or password",
    })


    const token = setUser(user);
    res.cookie("token", token);
    return res.redirect("/");
}

module.exports = {
    handleUserSignup,
    handleUserLogin
}