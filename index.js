const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = require('./src/routes/authorsRoutes');

app.use(express.json());
app.use('/authors', router);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});