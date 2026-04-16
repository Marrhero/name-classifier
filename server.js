const express = require('express');
const cors = require('cors');
const classifyRoute = require('./routes/classify');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', classifyRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {console.log('server running on port ${PORT}');
});