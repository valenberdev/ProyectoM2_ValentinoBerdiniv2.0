const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/authors', require('./src/routes/authorsRoutes'));
app.use('/posts', require('./src/routes/postsRoutes'));
app.use(require('./src/middlewares/errorHandler'));
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});