const express = require("express");
const app = express();

app.use(express.json());
app.use("/authors", require("./routes/authorsRoutes"));
app.use("/posts", require("./routes/postsRoutes"));
app.use("/comments", require("./routes/commentsRoutes"));
app.use(require("./middlewares/errorHandler"));

module.exports = app;