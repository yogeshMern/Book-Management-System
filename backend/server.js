const app = require("./app");
const database = require("./database/mongoDB");

const PORT = process.env.PORT || 3000

database()
app.listen(PORT, () => console.log(`App is ruuning on ${PORT}`))