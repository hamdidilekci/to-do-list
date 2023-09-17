import express from 'express';
import cors from 'cors'
import 'dotenv/config'

import mongoose from "mongoose";

import authenticate from './common/authenticate.js'
import routes from './routes/index.js'

const {DATABASE_USERNAME,DATABASE_PASSWORD, DATABASE_URL} = process.env

const connectionString = `mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_URL}`

await mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true})

// allow empty strings
mongoose.Schema.Types.String.checkRequired(v => typeof v === 'string');

const PORT = process.env.PORT || 3001

const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(authenticate({ secret: process.env.JWT_SECRET }));
app.use('/', routes);


app.listen(PORT, () => {
    console.log(`app listening on http://localhost:${PORT}`);
})

