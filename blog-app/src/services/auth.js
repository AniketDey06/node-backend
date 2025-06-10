import jwt from 'jsonwebtoken'

function creatUserToke (user) {
    const payload = {
        _id: user._id,
        email: user.email,
        name: user.fullName,
        profileImageURL : user.profileImageURL,
        role: user.role 
    }

    const token = jwt.sign(payload, process.env.SECRET_KEY)
    return token
}

function validateUserToke (token) {
    const payload = jwt.verify(token, process.env.SECRET_KEY)
    return payload;
}

export{
    creatUserToke,
    validateUserToke
}