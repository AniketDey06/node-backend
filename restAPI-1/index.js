const { error } = require("console");
const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose"); 
require('dotenv').config();

// const users = require("./MOCK_DATA.json");

// db con
mongoose
    .connect(process.env.db_URI)
    .then(() => console.log("DB connect"))
    .catch(err => console.log(err))



const app = express();
const PORT = process.env.PORT || 8000;

// Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    }
},{timestamps: true})

const User = mongoose.model("user", userSchema);

// Middlewares
app.use(express.urlencoded({extended: false}));

app.use((req, res, next) => {
    fs.appendFile('log.txt', 
        `\n${Date.now()} - ${req.ip} - ${req.method} - ${req.path}`,
        (err, data) => {
            if(err){
                console.log("err: ",err);
            }
            next();
        }
    );

    // return res.json({msg: "hello from Middleware1"})
})



// Routes 
app.get('/', (req, res) => {
    return res.send("this is home")
})

app.get('/users', async (req, res) => {
    const allDbUsers = await User.find({});
    const html = 
    `
        <ul>
            ${allDbUsers.map((user) => `<li>ID - ${user._id} - ${user.firstName} - ${user.email}</li></br>`).join("")}
        </ul>
    `
    return res.send(html)
})

app.get('/api/users', async (req, res) => {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers)
})

app.route('/api/users/:id')
    .get(async(req, res) => {
        const user = await User.findById(req.params.id);
        if(!user) return res.status(400).json({error: "User not Found"});
        return res.json(user);
    })
    .patch( async (req, res) => {
        // const id = Number(req.params.id);
        const body = req.body;

        // const idx = users.findIndex((user) => user.id === id);
        
        await User.findByIdAndUpdate(req.params.id, { ...body})
        .then(console.log())
        .catch((err) => console.log(err))

        return res.json({ success: true});
        
    })
    .delete( async (req, res) => {
        await User.findByIdAndDelete(req.params.id);
        return res.json({ success: true});
    })

app.post("/api/users", async(req, res) => {
    const body = req.body;
    if (
        !body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.job_title
    ) {
        return res.status(400).json({msg: "all fields are req.. "})
    }

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title
    })

    return res.status(201).json({msg: "success"});

})

app.listen(PORT, () => console.log(`Server Started at ${PORT}`))