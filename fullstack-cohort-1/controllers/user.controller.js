

const resgisterUser = async (req, res) => {
    res.send("registered")
}

const login = async (req, res) => {
    res.send("loged in")
}

export {
    resgisterUser,
    login
}