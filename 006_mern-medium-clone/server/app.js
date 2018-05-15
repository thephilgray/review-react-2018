import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cloudinary from 'cloudinary';
import routes from './routes/';

const app = express();
const router = express.Router();
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/medium';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

try {
  mongoose.connect(url);
} catch (error) {
  console.error(error);
}

const port = 5000 || process.env.port;
routes(router);

app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

app.use('/api', router);

app.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});
