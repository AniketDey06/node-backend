import User from "../models/User.model.js"

const signinRender = async (req, res) => {
    return res.render('signin')
}

const signupRender = async (req, res) => {
    return res.render('signup')
}

const signup = async (req, res) => {
    const { fullName, email, password } = req.body
    const user = await User.create({
        fullName,
        email,
        password,
    })

    console.log(user);

    return res.redirect("/");
}

const signin = async (req, res) => {
    const { email, password } = req.body
    try {
        const token = await User.matchPassword(email, password)
    
        console.log('token', token);
        return res.cookie("token", token).redirect("/");
    } catch (error) {
        return res.render("signin",{
            error: 'Incorrect Email or Password'
        });
    }
}

export {
    signinRender,
    signupRender,
    signin,
    signup
}