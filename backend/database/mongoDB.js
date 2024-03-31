const mongoose = require("mongoose");

const database = async () => {
    await mongoose
        .connect(process.env.MONGO_URL)
        .then((res) => console.log("Database Connected!🟢"))
        .catch((err) => console.log("Database Error!🔴"));
};
module.exports = database