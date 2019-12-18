import {Dispatch} from "react";
import {endFetching, startFetching} from "./fetch";
import {serverApi, serverPort, serverProtocol, serverURL} from "../config";
import {changePageToSignIn} from "./currentPage";
import {logOut, setErrorMessage} from "./auth";
import axios from "axios";

export const CONTENT_TYPE = "content-type";
export const ACCEPT = "Accept";
export const TOKEN = "Token";

export const APPLICATION_JSON = "application/json; charset=UTF-8";

export const request = (
    dispatch: Dispatch<any>,
    method: "GET" | "POST" | "PUT" | "DELETE",
    resource: string,
    headers: Record<string, string>,
    body?: any
) => {
    dispatch(startFetching())
    return axios({
        method: method,
        baseURL: `${serverProtocol}://${serverURL}:${serverPort}${serverApi}${resource}`,
        headers,
        data: body
    }).then(res => {
        dispatch(endFetching());
        return res
    })
};

export function unAuthorisedAction(dispatch: Dispatch<any>) {
    return (error: { response: { status: number } }) => {
        if (error.response.status === 401) {
            dispatch(changePageToSignIn());
            dispatch(logOut());
            dispatch(setErrorMessage("Token was not refreshed"));
        }
    }
}

export function lastCatchResponseError(dispatch: Dispatch<any>) {
    return (error: any) => {
        console.log("Bad request");
        if (error.response) {
            console.log(error.response);
        } else {
            console.log(error);
        }
        dispatch(setErrorMessage("Something bad happened"));
    }
}

export function checkError(dispatch: Dispatch<any>, errorCode: number, messageToLog: string) {
    return (error: { response: {status: number} }) => {
        if (error.response.status === errorCode) {
            dispatch(setErrorMessage(messageToLog));
            console.log(messageToLog);
        } else {
            throw error;
        }
    }
}