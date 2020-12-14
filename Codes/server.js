const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
//const fileUpload = require('express-fileupload');
//const nocache = require('nocache');
const http =  require('http');
//var enforce = require('express-sslify');

const app = express();
const server = http.createServer(app);
//app.use(enforce.HTTPS({trustProtoHeader: true, trustXForwardedHostHeader: true}));

const users = require('./routes/api/users');
const items = require('./routes/api/items');
const admin = require('./routes/api/admin');
const auth = require('./routes/api/auth');

//Bodyparser Middleware
app.use(express.json());
//app.use(nocache());[]

//DB config
const db = config.get('mongoURI');
//Connect to DB
const dbConnect = mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true , useFindAndModify: false }).catch(err => console.log(err));

if(dbConnect){
    console.log("connected");
}

//Use routes

//app.use(fileUpload());
app.use('/users', users);
app.use('/items', items);
app.use('/admin', admin);
app.use('/auth', auth);

//app.use('/uploads', express.static('uploads'));


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.use('*', express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}
const port = process.env.PORT || 5000;

//app.listen(port, () => console.log(`server started on port ${port}`));
server.listen(port, () => console.log(`Server started: ${port}`));