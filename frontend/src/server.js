"use strict";

var _http = require("http");

function getConfig(token, response) {
    if (token === user.token) {
        response.statusCode = 200;
        response.setHeader("Content-type", "application/json");
        response.end(JSON.stringify(userConfig));
    } else {
        response.statusCode = 401;
        response.end();
    }
}

function setConfig(config, token, response) {
    if (token === user.token) {
        userConfig.alarmWhenZero = config.alarmWhenZero;
        userConfig.longBreakDuration = config.longBreakDuration;
        userConfig.numberOfPomidorsBeforeLongBreak = config.numberOfPomidorsBeforeLongBreak;
        userConfig.pomidorDuration = config.pomidorDuration;
        userConfig.shortBreakDuration = config.shortBreakDuration;
        response.statusCode = 204;
        response.end();
    } else {
        response.statusCode = 401;
        response.end();
    }
}

function signUp(name, pass, response) {
    if (name === user.userName) {
        response.statusCode = 409;
        response.end();
    } else {
        user.userName = name;
        user.password = pass;
        response.statusCode = 200;
        response.end();
    }
}

function signIn(name, pass, response) {
    if (user.userName === name && user.password === pass) {
        user.token = tokens[tokenI];
        tokenI++;
        tokenResponse.token = user.token;
        tokenResponse.expiresIn = 3600;
        response.statusCode = 200;
        response.setHeader("Content-type", "application/json");
        response.end(JSON.stringify(tokenResponse));
    } else {
        response.statusCode = 404;
        response.end();
    }
}

function refresh(token, response) {
    if (token === user.token) {
        console.log(tokenI)
        console.log("res " + token)
        console.log("send " + tokens[tokenI])
        user.token = tokens[tokenI];
        tokenI++;
        tokenResponse.token = user.token;
        tokenResponse.expiresIn = 1000 * 60; //60 sec
        response.statusCode = 200;
        response.setHeader("Content-type", "application/json");
        response.end(JSON.stringify(tokenResponse));
    } else {
        response.statusCode = 401;
        response.end();
    }
}

var tokenResponse = {
    token: "",
    expiresIn: 123
};
var user = {
    userName: "",
    password: "",
    token: "asdfdghfj"
};
var userConfig = {
    pomidorDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    numberOfPomidorsBeforeLongBreak: 4,
    alarmWhenZero: false
};
var tokenI = 0;
var tokens = ["asdfdghfj", "asddgfsffasdfj", "asddffasdfj", "asdfdghfjsdafasdfasdfa", "asdfdghfsdds", "asdfdghfjsdafasdfasdfasadfsadfd", "asdfsdfsdfdghfjsdafasdfasdfa", "fsffas", "fsffasfsffasfsffas"];

var http = require('http');

var port = 8053;

var requestHandler = function requestHandler(request, response) {
    console.log("RECEIVED");
    response.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE");
    response.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    response.setHeader("Access-Control-Allow-Headers","Content-type, Token, Accept");
    if (request.method === "OPTIONS") {
        response.end()
        return
    }
    try {
        if (request.method === "GET") {
            if (request.url === "/api/v1/timer" && request.headers.accept === "application/json") {
                // @ts-ignore
                getConfig(request.headers.token, response);
                return;
            }
        }

        if (request.method === "POST") {
            if (request.url === "/api/v1/refresh" && request.headers.accept === "application/json") {
                // @ts-ignore
                refresh(request.headers.token, response);
                return;
            }
        }


        var body = [];
        request.on('error', function (err) {
            console.error(err);
        }).on('data', function (chunk) {
            body.push(chunk);
        }).on('end', function () {
            body = JSON.parse(Buffer.concat(body).toString());
            console.log("Body");
            console.log(body);

            if (request.method === "POST") {
                if (request.url === "/api/v1/signin" && request.headers.accept === "application/json") {
                    // @ts-ignore
                    signIn(body.login, body.password, response);
                    return;
                } else if (request.url === "/api/v1/signup") {
                    // @ts-ignore
                    signUp(body.login, body.password, response);
                    return;
                }
            } else if (request.method === "PUT") {
                if (request.url === "/api/v1/timer") {
                    // @ts-ignore
                    setConfig(body, request.headers.token, response);
                    return;
                }
            }

            console.log("SHOULD not be here");
        });
    } catch (e) {
        console.log(e);
        response.statusCode = 400;
        response.end();
    }
};

var server = http.createServer(requestHandler);
console.log("Listening at port: " + port)
server.listen(port);