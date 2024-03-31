const Book = require("../model/Book");

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        if (!books.length) {
            return res.status(200).json({
                status: "fail",
                message: "Data not found!",
                Books: []
            });
        }

        res.status(200).json({
            status: "success",
            message: "All Books",
            Books: books,
        });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error!" });
    }
};

exports.createBook = async (req, res) => {
    const { title, author, year } = req.body;
    if (!title || !author || !year) {
        return res.status(400).json({
            status: "fail",
            message: "Please fill all the three keys!",
        });
    }

    try {
        const newBook = await Book.create({ title, author, year });
        res.status(201).json({
            status: "success",
            message: "All Books",
            Books: newBook,
        });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error!" });
    }
};

exports.updateBook = async (req, res) => {
    const id = req.params.id;

    const { title, author, year } = req.body;

    console.log(11111111, id);
    if (!id) {
        return res.status(200).json({
            status: "fail",
            message: "Id is missing!",
            Books: {},
        });
    }
    try {
        const updatedBook = await Book.findByIdAndUpdate(id, { title, author, year }, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: "success",
            message: "Details Updated Successfully!",
            Books: updatedBook,
        });
    } catch (err) {
        console.log({ err: err.message })
        res.status(500).json({ message: err.message });
    }
};

exports.deleteBook = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({
            status: "fail",
            message: "Id is missing!",
        });
    }
    try {
        const book = await Book.findByIdAndDelete(id);
        res.status(200).json({
            status: "success",
            message: "Book deleted successfully",
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
