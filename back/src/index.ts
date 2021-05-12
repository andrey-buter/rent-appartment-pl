// const express = require('express');
// const path = require('path');
// const router = require('./routes/schedule');

import express from "express";
import path from "path";
import router from "./routes/get-items.route";

const PORT = process.env.PORT || 3000;

const app = express();

// router.get('/*', (req, res) => {
//     res.sendFile( path.join( __dirname,  '../frontend/dist/schedule/index.html'));
// });

app.use(express.urlencoded({extended: true}))
// app.use( express.static( path.join( __dirname, '../frontend/dist/schedule' ) ));
app.use(router);

async function start() {
    try {
        app.listen( PORT, () => {
            console.log( 'Server has been started...' );
        } );
    } catch(e) {;
        console.log(e)
    }
}

start();
