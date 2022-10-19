const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const indexController = require("./controllers/index_controller");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/recipe", indexController);

//NOT FOUND
app.get('*', (req, res) => {
  res.status(404)
  res.send('Page Not Found')
})

//db connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
