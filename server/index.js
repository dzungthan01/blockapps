const express = require('express');
const cors = require('cors');
const nhlRoutes = require('./routes/nhlRoutes.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/nhl', nhlRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
