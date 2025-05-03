const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const { log } = require("console");

const app = express();
const PORT = 8000;

// Middlewares
app.use(express.urlencoded({extended: false}));

app.use((req, res, next) => {
    fs.appendFile('log.txt', 
        `\n${Date.now()} - ${req.ip} - ${req.method} - ${req.path}`,
        (err, data) => {
            next();
        }
    );

    next();
    // return res.json({msg: "hello from Middleware1"})
})



// Routes 
app.get('/', (req, res) => {
    return res.send("this is home")
})

app.get('/users', (req, res) => {
    const html = 
    `
        <ul>
            ${users.map((user) => `<li>${user.first_name}</li></br>`).join("")}
        </ul>
    `
    return res.send(html)
})

app.get('/api/users', (req, res) => {
    return res.json(users)
})

app.route('/api/users/:id')
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        return res.json(user);
    })
    .patch((req, res) => {
        const id = Number(req.params.id);
        const body = req.body;

        const idx = users.findIndex((user) => user.id === id);

        users[idx] = {
            ...users[idx],
            ...body
        }

        console.log(users[idx]);
        

        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
            return res.json({ success: true, id : id})
        })
    })
    .delete((req, res) => {
        return res.json({status: 'Pending delete'})
    })

app.post("/api/users", (req, res) => {
    const body = req.body;
    users.push({...body, id: users.length + 1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data)=> {
        return res.json({status: "Success" , id: users.length})
    })
})

app.listen(PORT, () => console.log(`Server Started at ${PORT}`))