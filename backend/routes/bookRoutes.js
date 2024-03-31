const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

router.get("/get-all-books", bookController.getAllBooks);
router.post("/create-new-book", bookController.createBook);
router.patch("/update-book-details/:id", bookController.updateBook);
router.delete("/delete-books/:id", bookController.deleteBook);

module.exports = router;