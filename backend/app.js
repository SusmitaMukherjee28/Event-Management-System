const express = require('express');
const cors = require('cors');
const app = express();
const feedbackRouter = require('./routes/feedback');

app.use(cors());
app.use(express.json());
app.use('/feedback', feedbackRouter);

const PORT = process.env.PORT || 3004;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
