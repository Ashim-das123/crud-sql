import express from "express";
import mysql from "mysql"
import cors from 'cors'
const app = express();
// connect to the sql db
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Ashim6048#",
    database: "test"  //its db name or schema name
})

//ALTER USER 'root'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY 'ypur_pass'; run it in workbench
app.use(cors());
app.use(express.json());  //json data client theke send korar jonno, by default express cant understand json so

app.get('/', (req, res) => {
    res.json("hello from backend");
})

app.get('/books', (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err);
        }
        else {
            return res.json(data);
        }

    });
})

app.post('/books', (req, res) => {
    const q = "INSERT INTO books (`title`, `desc`, `cover`,`price`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price
    ];

    db.query(q, [values], (err, data) => {
        if (err) {

            return res.json(err);
        }
        else {
            return res.json("book has been created");
        }
    })
})

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?";

    db.query(q, [bookId], (err, data) => {
        if (err) {

            return res.json(err);
        }
        else {
            return res.json("book has been deleted");
        }
    })
})

// for update api
app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title` = ?, `desc` = ?, `cover` = ?, `price` = ? WHERE id = ?";

    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price
    ];


    db.query(q, [...values, bookId], (err, data) => {
        if (err) {

            return res.json(err);
        }
        else {
            return res.json("book has been updated");
        }
    })
})


app.listen(8000, () => {
    console.log("Backend is connected")
})