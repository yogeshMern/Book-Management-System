import React, { useEffect, useState } from "react";
import Axios from "axios";

const Home = () => {
  const BASE_URL = `http://localhost:8000/books`;
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState({ title: "", author: "", year: "" });
  const [openEditForm, setOpenEditForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [book, setBook] = useState({
    title: "",
    author: "",
    year: "",
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const addBook = async (e) => {
    if (!book.title || !book.author || !book.year) {
      return console.log("Data not filled!");
    }
    try {
      await Axios.post(`${BASE_URL}/create-new-book`, book);
      fetchBooks();
      setBook({
        title: "",
        author: "",
        year: "",
      });
    } catch (error) {
      console.log("Error Add Book");
    }
  };

  const fetchBooks = async () => {
    await Axios.get(`${BASE_URL}/get-all-books`)
      .then((res) => setData(res?.data?.Books))
      .catch((err) => console.log("Error"));
  };

  const removeBook = async (id) => {
    try {
      Axios.delete(`${BASE_URL}/delete-books/${id}`).then((res) => {
        if (res?.status === 200) {
          fetchBooks();
        }
      });
    } catch (error) {
      console.log("Error Remove Book");
    }
  };

  const editForm = (e) => {
    setEdit({ ...edit, [e.target.name]: e.target.value });
  };

  const submitEditDetails = async (e, editId) => {
    // e.preventDefault();
    console.log({ edit: JSON.stringify(edit), editId });
    try {
      const res = await Axios.patch(
        `${BASE_URL}/update-book-details/${editId}`,
        edit
      );
      fetchBooks();
      console.log("updateRes", res);
      setOpenEditForm(false);
    } catch (error) {
      console.log("Error updating book details :", error.message);
    }
  };

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Book Management System</h2>
      <div className="cont" style={{ marginTop: "50px" }}>
        <div className="cont-lss">
          <input
            type="text"
            placeholder="enter title here..."
            name="title"
            onChange={(e) => handleChange(e)}
            value={book.title}
            className="inp"
          />
          <input
            type="text"
            placeholder="enter author here..."
            name="author"
            onChange={(e) => handleChange(e)}
            value={book.author}
            className="inp"
          />
          <input
            type="text"
            placeholder="enter year here..."
            name="year"
            onChange={(e) => handleChange(e)}
            value={book.year}
            className="inp"
          />
          <button
            className="action-button"
            style={{ width: "50px" }}
            onClick={(e) => addBook(e)}
          >
            Add Book
          </button>
        </div>
      </div>

      <div style={{ marginTop: "50px", textAlign: "center" }}>
        {data.length !== 0 ? (
          <>
            <ul className="ul_class">
              <li>S.No</li>
              <li>Title</li>
              <li>Author</li>
              <li>Year</li>
              <li>Action</li>
            </ul>
            {data.map((ele, ind) => (
              <ul className="ul_class" key={ele._id}>
                <li>{`${ind === 0 ? 1 : ind + 1}`}.</li>
                <li>{ele?.title}</li>
                <li>{ele?.author}</li>
                <li>{ele?.year}</li>
                <li style={{ display: "flex", justifyContent: "space-evenly" }}>
                  <button
                    className="action-button"
                    onClick={() => {
                      setEdit(ele);
                      setOpenEditForm(true);
                      setEditId(ele._id);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="action-button"
                    onClick={() => removeBook(ele._id)}
                  >
                    Delete
                  </button>
                </li>
              </ul>
            ))}
          </>
        ) : (
          <h1>Data not found</h1>
        )}

        {/* Edit form */}
        {openEditForm && (
          <div className="edit-form">
            <h2>Edit Book Details</h2>
            <form>
              <div>
                <input
                  type="text"
                  placeholder="Enter title"
                  name="title"
                  value={edit?.title}
                  onChange={(e) => editForm(e)}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter author"
                  name="author"
                  value={edit?.author}
                  onChange={(e) => editForm(e)}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter year"
                  name="year"
                  value={edit?.year}
                  onChange={(e) => editForm(e)}
                />
              </div>
              <div>
                <button
                  type="button"
                  className="action-button"
                  onClick={(e) => submitEditDetails(e, editId)}
                >
                  Update
                </button>
                <button
                  className="action-button"
                  onClick={() => setOpenEditForm(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
