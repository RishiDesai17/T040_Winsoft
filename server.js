const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const { dbInit } = require('./db')

app.use(express.json());
app.use(morgan('dev'));
if(process.env.NODE_ENV === "dev"){
    app.use(cors())
}

const decryptionRoutes = require('./routes/decrypt');
const mapRoutes = require('./routes/map');
const userRoutes = require('./routes/user');

app.use('/api/decryption', decryptionRoutes);
app.use('/api/map', mapRoutes);
app.use('/api/user', userRoutes);

app.use(express.static("client/build"));

app.get("*", (req, res) => {
    res.sendFile(__dirname + "/client/build/index.html");
});

app.use((req, res, next) => {
    const error = new Error("Not Found...");
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status||500);
    res.json({
        error: {
            message: error.message
        }
    })
})

const port = process.env.PORT || 3001;
dbInit().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    })
})