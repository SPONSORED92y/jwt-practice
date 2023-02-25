const e = require('express');
const express = require('express');
const { read } = require('fs');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: "wellcome"
    });
});

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'post created...',
                authData
            });
        }
    });
});

app.post('/api/login', (req, res) => {
    //Mock user
    const user = {
        id: 1,
        username: 'brad',
        email: 'brad@gmail.com'
    }

    jwt.sign({ user: user }, 'secretkey', { expiresIn: '30s' }, (err, token) => {
        res.json({
            token: token
        });
    });
});





function verifyToken(req, res, next) {
    //get auth header value
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        //split at the space
        const bearer = bearerHeader.split(' ');
        //get token from array
        const bearerToken = bearer[1];
        //set the token 
        req.token = bearerToken;
        next();
    } else {
        //Forbidden
        res.sendStatus(403);
    }
}

app.listen(5000, () => console.log("server start on 5000"));