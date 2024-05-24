import { Dispatch } from "react";

export const defaultNewUserData = {
    first_name: "morpheus",
    last_name: "leader",
    email: "email@email.com",
    photo: "",
};

export const defaultUser = {
    email: '',
    name: 'Guest',
    picture: '',
    isAuthorized: false,
};

export const defaultContext = {
    usersList: [],
    isLoading: true,
    authorizatedUserData: defaultUser,
    setUsersList: (() => undefined) as Dispatch<any>,
    setAuthorizatedUserData: (() => undefined) as Dispatch<any>,
};

export const clientId = '480137410815-es4ueo00fl35dq3ibphohk2qbl4gsuaa.apps.googleusercontent.com';

export const decodeJWT = (token: string | undefined) => {
    if (!token) return 'no token provided'
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedToken = JSON.parse(window.atob(base64));
    return decodedToken;
};