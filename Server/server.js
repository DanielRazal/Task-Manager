require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Urls = require("./settings/staticUrls");
const UserRoutes = require('./routes/userRoutes');
const ListRoutes = require('./routes/listRoutes');
const cors = require("cors");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

app.use(cors());

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());

app.use('/User', UserRoutes);
app.use('/List', ListRoutes);

app.listen(Urls.serverPort, () =>
    console.log(
        `Server is running at ${Urls.serverDomain}:${Urls.serverPort}`
    )
);
