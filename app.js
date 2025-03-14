const express = require('express');
const app = express();
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const books = [
    {
        title: "The Changing World Orders",
        author: "Ray Dalio",
        publisher: "Avid Reader Press",
        date: "2021-11-11",
        website: "amazon.ca"
    }
];

app.get('/', function (req, res) {
    res.send(`
        <h1>Dibbyo Saha Book Inventory</h1>
        <p><a href="/bookinventory/list">View Books</a></p>
        <p><a href="/bookinventory/add">Add Books</a></p>`);
});

app.get('/bookinventory/add', function (req, res) {
    res.send(`
        <h2>Add a Book</h2>
        <form action="/bookinventory/add" method="POST">
            Title: <input type="text" name="title"><br>
            Author: <input type="text" name="author"><br>
            Publisher: <input type="text" name="publisher"><br>
            Date: <input type="text" name="date"><br>
            Website: <input type="url" name="website"><br>
            <button type="submit">Add</button>
        </form>`);
});


app.post('/bookinventory/add', function (req, res) {
    const { title, author, publisher, date, website } = req.body;

    if (!title || !author || !publisher || !date || !website) {
        return res.status(400).json({ error: "*Required*" });
    }

    const newBook = { title, author, publisher, date, website };
    books.push(newBook);

    res.status(201).send(`
        <p>Successfully Added!</p>
        <a href="/bookinventory/list">View</a><br>
        <a href="/bookinventory/add">Add</a>`
    );
});

app.get('/bookinventory/list', function (req, res) {
    res.json(books);
});

app.listen(port, () => {
    console.log(`Running at http://localhost:${port}`);
});