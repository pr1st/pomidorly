import {RequestListener, ServerResponse} from "http";

function getConfig(token: string, response: ServerResponse) {
    if (token === user.token) {
        response.statusCode = 200
        response.setHeader("Content-type", "application/json");
        response.end(JSON.stringify(userConfig))
    } else {
        response.statusCode = 401
        response.end()
    }
}

function setConfig(config: any, token: string, response: ServerResponse) {
    if (token === user.token) {
        userConfig.alarmWhenZero = config.alarmWhenZero
        userConfig.longBreakDuration = config.longBreakDuration
        userConfig.numberOfPomidorsBeforeLongBreak = config.numberOfPomidorsBeforeLongBreak
        userConfig.pomidorDuration = config.pomidorDuration
        userConfig.shortBreakDuration = config.shortBreakDuration
        response.statusCode = 204
        response.end()
    } else {
        response.statusCode = 401
        response.end()
    }
}

function signUp(name: string, pass: string, response: ServerResponse) {
    if (name === user.userName) {
        response.statusCode = 409
        response.end()
    } else {
        user.userName = name;
        user.password = pass;
        response.statusCode = 200
        response.end()
    }
}

function signIn(name: string, pass: string, response: ServerResponse) {
    if (user.userName === name && user.password === pass) {
        user.token = tokens[tokenI];
        tokenI++;
        tokenResponse.token = user.token;
        tokenResponse.expiresIn = 3600;
        response.statusCode = 200;
        response.setHeader("Content-type", "application/json");
        response.end(JSON.stringify(tokenResponse))
    } else {
        response.statusCode = 404
        response.end()
    }
}

function refresh(token: string, response: ServerResponse) {
    if (token === user.token) {
        user.token = tokens[tokenI]
        tokenI++;
        tokenResponse.token = user.token;
        tokenResponse.expiresIn = 3600;
        response.statusCode = 200;
        response.setHeader("Content-type", "application/json");
        response.end(JSON.stringify(tokenResponse))
    } else {
        response.statusCode = 401
        response.end()
    }
}

const tokenResponse = {
    token: "",
    expiresIn: 123
};

const user = {
    userName: "",
    password: "",
    token: "asdfdghfj"
};
const userConfig = {
    pomidorDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    numberOfPomidorsBeforeLongBreak: 4,
    alarmWhenZero: false
};
let tokenI = 0;
const tokens = [
    "asdfdghfj",
    "asddgfsffasdfj",
    "asddffasdfj",
    "asdfdghfjsdafasdfasdfa",
    "asdfdghfsdds",
    "asdfdghfjsdafasdfasdfasadfsadfd",
    "asdfsdfsdfdghfjsdafasdfasdfa",
    "fsffas",
    "fsffasfsffasfsffas"
];


const http = require('http');
const port = 8053;
const requestHandler : RequestListener = (request, response) => {
    try {
        if (request.method === "GET") {
            if (request.url === "/api/v1/timer" && request.headers.accept === "application/json") {
                // @ts-ignore
                getConfig(request.headers.token, response)
            }
        }
        if (request.method === "POST") {
            if (request.url === "/api/v1/refresh" && request.headers.accept === "application/json") {
                // @ts-ignore
                refresh(request.headers.token, response)
            }
        }

        // need body
        if (request.headers["content-type"] !== "application/json") {
            console.log("need header");
            return
        }
        let body: any = [];
        request.on('error', (err) => {
            console.error(err);
        }).on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = JSON.parse(Buffer.concat(body).toString());
            if (request.method === "POST") {
                if (request.url === "/api/v1/signin" && request.headers.accept === "application/json") {
                    // @ts-ignore
                    signIn(body.login, body.password, response);
                    return
                } else if (request.url === "/api/v1/signup") {
                    // @ts-ignore
                    signUp(body.login, body.password, response);
                    return
                }
            } else if (request.method === "PUT") {
                if (request.url === "/api/v1/timer") {
                    // @ts-ignore
                    setConfig(body, request.headers.token, response)
                    return;
                }
            }
            console.log("SHOULD not be here");
        });
    } catch (e) {
        console.log(e)
        response.statusCode = 400
        response.end()
    }
};

const server = http.createServer(requestHandler);

server.listen(port);