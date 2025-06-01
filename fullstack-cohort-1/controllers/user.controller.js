const registerUser = (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body); 

    if (!name || !email || !password) {
        return res.status(400).json({ 
            message: "All fields are required" 
        });
    }

    console.log(email);
    

    res.status(200).json({ message: "User registered", name, email, password });
};

const login = async (req, res) => {
    res.send("loged in")
}

export {
    registerUser,
    login
}