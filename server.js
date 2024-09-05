const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const authRoutes = require('./routes/auth').router;  
const videoRoutes = require('./routes/Video');  

dotenv.config();

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));


app.use(express.json());


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api/auth', authRoutes); 
app.use('/api/videos', videoRoutes); 


app.get('/', (req, res) => {
  res.send('Welcome to My Video Compressor API');
});



const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
