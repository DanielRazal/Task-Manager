require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Urls = require("./settings/staticUrls");
const createGenericCrudRouter = require('./routes/genericCrudRouter');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());

const User = require('./models/user')
const userRouter = createGenericCrudRouter(User);
app.use('/User', userRouter);

app.listen(Urls.serverPort, () =>
    console.log(
        `Server is running at ${Urls.serverDomain}:${Urls.serverPort}`
    )
);