const express = require('express');
const axios = require('axios');
let books = require('./booksdb.js');
const public_users = express.Router();

// Task 10: Get the list of books using Promises and Async/Await
public_users.get('/promises', (req, res) => {
    new Promise((resolve, reject) => {
        if (books) {
            resolve(books);
        } else {
            reject({ message: "Books not found" });
        }
    })
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(404).json(error));
});

// Using Async/Await on task 10
public_users.get('/async-await', async (req, res) => {
    try {
        const result = await new Promise((resolve, reject) => {
            if (books) {
                resolve(books);
            } else {
                reject({ message: "Books not found" });
            }
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json(error);
    }
});

// Task 11: Get book details by ISBN using Promises and Async/Await

public_users.get('/isbn/promises/:isbn', (req, res) => {
    const { isbn } = req.params;
    new Promise((resolve, reject) => {
        if (books[isbn]) {
            resolve(books[isbn]);
        } else {
            reject({ message: "Book not found" });
        }
    })
        .then((book) => res.status(200).json(book))
        .catch((error) => res.status(404).json(error));
});

//Async/Await on task 11
public_users.get('/isbn/async-await/:isbn', async (req, res) => {
    const { isbn } = req.params;
    try {
        const book = await new Promise((resolve, reject) => {
            if (books[isbn]) {
                resolve(books[isbn]);
            } else {
                reject({ message: "Book not found" });
            }
        });
        res.status(200).json(book);
    } catch (error) {
        res.status(404).json(error);
    }
});

// Task 12: Get book details by Author using Promises and Async/Await
public_users.get('/author/promises/:author', (req, res) => {
    const { author } = req.params;
    new Promise((resolve, reject) => {
        const filteredBooks = Object.values(books).filter(
            (book) => book.author.toLowerCase() === author.toLowerCase()
        );
        if (filteredBooks.length > 0) {
            resolve(filteredBooks);
        } else {
            reject({ message: "Books by this author not found" });
        }
    })
        .then((books) => res.status(200).json(books))
        .catch((error) => res.status(404).json(error));
});

// Using Async/Await on task 12
public_users.get('/author/async-await/:author', async (req, res) => {
    const { author } = req.params;
    try {
        const filteredBooks = await new Promise((resolve, reject) => {
            const booksByAuthor = Object.values(books).filter(
                (book) => book.author.toLowerCase() === author.toLowerCase()
            );
            if (booksByAuthor.length > 0) {
                resolve(booksByAuthor);
            } else {
                reject({ message: "Books by this author not found" });
            }
        });
        res.status(200).json(filteredBooks);
    } catch (error) {
        res.status(404).json(error);
    }
});

// Task 13: Get book details by Title using Promises and Async/Await
public_users.get('/title/promises/:title', (req, res) => {
    const { title } = req.params;
    new Promise((resolve, reject) => {
        const filteredBooks = Object.values(books).filter(
            (book) => book.title.toLowerCase() === title.toLowerCase()
        );
        if (filteredBooks.length > 0) {
            resolve(filteredBooks);
        } else {
            reject({ message: "Books with this title not found" });
        }
    })
        .then((books) => res.status(200).json(books))
        .catch((error) => res.status(404).json(error));
});

// Using Async/Await on task 13
public_users.get('/title/async-await/:title', async (req, res) => {
    const { title } = req.params;
    try {
        const booksByTitle = await new Promise((resolve, reject) => {
            const filteredBooks = Object.values(books).filter(
                (book) => book.title.toLowerCase() === title.toLowerCase()
            );
            if (filteredBooks.length > 0) {
                resolve(filteredBooks);
            } else {
                reject({ message: "Books with this title not found" });
            }
        });
        res.status(200).json(booksByTitle);
    } catch (error) {
        res.status(404).json(error);
    }
});

module.exports.general = public_users;
