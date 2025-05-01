const express = require("express")
const users = require("./MOCK_DATA.json")

const app = express();
const PORT = 8000;

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
    .post((req, res) => {
        res.json({status: 'Pending post'})
    })
    .patch((req, res) => {
        res.json({status: 'Pending put'})
    })
    .delete((req, res) => {
        res.json({status: 'Pending delete'})
    })

app.listen(PORT, () => console.log(`Server Started at ${PORT}`))