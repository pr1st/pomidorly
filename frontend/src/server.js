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
        console.log("refresh token at " + Date.now())
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
            } else if (request.url === "/api/v1/current/tasks" && request.headers.accept === "application/json") {
                getCurTasks(request.headers.token, response);
                return;
            } else if (request.url === "/api/v1/history/tasks" && request.headers.accept === "application/json") {
                getHisTasks(request.headers.token, response);
                return;
            }
        }

        if (request.method === "POST") {
            if (request.url === "/api/v1/auth/refresh" && request.headers.accept === "application/json") {
                // @ts-ignore
                refresh(request.headers.token, response);
                return;
            } else if (request.url.startsWith("/api/v1/current/tasks/swap/")) {
                var arr = request.url.split("/");
                var id1 = arr[arr.length - 1];
                var id2 = arr[arr.length - 2];
                swapCurTasks(id1, id2, request.headers.token, response);
                return;
            }
        }

        if (request.method === "DELETE") {
            if (request.url.startsWith("/api/v1/current/tasks/")) {
                var arr = request.url.split("/");
                var id = arr[arr.length - 1];
                deleteCurTasks(id, request.headers.token, response);
                return;
            } else if (request.url.startsWith("/api/v1/history/tasks/")) {
                var arr = request.url.split("/");
                var id = arr[arr.length - 1];
                deleteHisTasks(id, request.headers.token, response);
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
                if (request.url === "/api/v1/auth/signin" && request.headers.accept === "application/json") {
                    // @ts-ignore
                    signIn(body.login, body.password, response);
                    return;
                } else if (request.url === "/api/v1/auth/signup") {
                    // @ts-ignore
                    signUp(body.login, body.password, response);
                    return;
                } else if (request.url === "/api/v1/current/tasks") {
                    createCurTasks(body.tag, body.description, body.numberOfPomidors, request.headers.token, response);
                    return;
                } else if (request.url === "/api/v1/history/tasks") {
                    createHisTasks(body.tag, body.description, body.timeFinished, request.headers.token, response);
                    return;
                }
            } else if (request.method === "PUT") {
                if (request.url === "/api/v1/timer") {
                    // @ts-ignore
                    setConfig(body, request.headers.token, response);
                    return;
                } else if (request.url.startsWith("/api/v1/current/tasks/")) {
                    var arr = request.url.split("/");
                    var id = arr[arr.length - 1];
                    console.log("update id: " + id)
                    updateCurTasks(id, body.tag, body.description, body.numberOfPomidors, request.headers.token, response);
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

var curId = 10;
var curInQueue = 100;

const curTasks = [
    {
        id:1,
        inQueue: 2,
        description: "DESC",
        numberOfPomidors:23,
        tag:"TAG"
    },
    {
        id:2,
        inQueue: 3,
        description: "DESC2",
        numberOfPomidors:34,
        tag:"TAG2"
    },
    {
        id:3,
        inQueue: 4,
        description: "DESC3",
        numberOfPomidors:34,
        tag:"TAG3"
    },
    {
        id:4,
        inQueue: 6,
        description: "DESC4",
        numberOfPomidors:2,
        tag:"TAF4"
    },
    {
        id:5,
        inQueue: 87,
        description: "DES5",
        numberOfPomidors:33,
        tag:"TAG5"
    }
];


function getCurTasks(token, response) {
    if (token === user.token) {
        response.statusCode = 200;
        response.setHeader("Content-type", "application/json");
        response.end(JSON.stringify(curTasks.filter(d => d !== undefined)));
    } else {
        response.statusCode = 401;
        response.end();
    }
}

function createCurTasks(tag, description, numberOfPomidors, token, response) {
    if (token === user.token) {
        curTasks.push({
            id: curId,
            tag: tag,
            description: description,
            numberOfPomidors: numberOfPomidors,
            inQueue: curInQueue
        });
        curId++;
        curInQueue++;
        response.statusCode = 201;
        response.end();
    } else {
        response.statusCode = 401;
        response.end();
    }
}

function getCurTaskById(id) {
    return curTasks.findIndex(t => {
        return t != undefined && t.id == id;
    });
}

function updateCurTasks(id, tag, description, numberOfPomidors, token, response) {
    if (token === user.token) {
        var taskById = getCurTaskById(id);
        if (curTasks[taskById] !== undefined) {
            curTasks[taskById].tag = tag;
            curTasks[taskById].description = description;
            curTasks[taskById].numberOfPomidors = numberOfPomidors;
            response.statusCode = 204;
            response.end();
        } else {
            response.statusCode = 404;
            response.end();
        }
    } else {
        response.statusCode = 401;
        response.end();
    }
}

function deleteCurTasks(id, token, response) {
    if (token === user.token) {
        var taskById = getCurTaskById(id);
        if (curTasks[taskById] !== undefined) {
            curTasks[taskById] = undefined;
            response.statusCode = 204;
            response.end();
        } else {
            response.statusCode = 404;
            response.end();
        }
    } else {
        response.statusCode = 401;
        response.end();
    }
}

function swapCurTasks(id1, id2, token, response) {
    if (token === user.token) {
        var taskById1 = getCurTaskById(id1);
        var taskById2 = getCurTaskById(id2);
        if (curTasks[taskById1] !== undefined && curTasks[taskById2] !== undefined) {
            var t = curTasks[taskById1].inQueue;
            curTasks[taskById1].inQueue = curTasks[taskById2].inQueue;
            curTasks[taskById2].inQueue = t;
            response.statusCode = 204;
            response.end();
        } else {
            response.statusCode = 404;
            response.end();
        }
    } else {
        response.statusCode = 401;
        response.end();
    }
}


var hisId = 3;

const hisTasks = [
    {
        id:1,
        description: "DESC1",
        timeFinished:1574781003753,
        tag:"TAG1"
    },
    {
        id:2,
        description: "DESC2",
        timeFinished:1574781007516,
        tag:"TAG2"
    }
];


function getHisTasks(token, response) {
    if (token === user.token) {
        response.statusCode = 200;
        response.setHeader("Content-type", "application/json");
        response.end(JSON.stringify(hisTasks.filter(d => d !== undefined)));
    } else {
        response.statusCode = 401;
        response.end();
    }
}

function createHisTasks(tag, description, timeFinished, token, response) {
    if (token === user.token) {
        hisTasks.push({
            id: hisId,
            tag: tag,
            description: description,
            timeFinished: timeFinished
        });
        hisId++;
        response.statusCode = 201;
        response.end();
    } else {
        response.statusCode = 401;
        response.end();
    }
}

function getHisTaskById(id) {
    return hisTasks.findIndex(t => {
        return t != undefined && t.id == id;
    });
}


function deleteHisTasks(id, token, response) {
    if (token === user.token) {
        var taskById = getHisTaskById(id);
        if (hisTasks[taskById] !== undefined) {
            hisTasks[taskById] = undefined;
            response.statusCode = 204;
            response.end();
        } else {
            response.statusCode = 404;
            response.end();
        }
    } else {
        response.statusCode = 401;
        response.end();
    }
}

