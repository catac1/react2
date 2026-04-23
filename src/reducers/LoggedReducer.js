import React from 'react';

const initialState = {
    counter: 1,
    logged: 0,
    token: "",
};

const LoggedReducer = (state = initialState, action) => {
    switch (action.type) {

        // dispatch({type:"LOGIN", payload: 토큰})
        case "LOGIN":
            sessionStorage.setItem("token", action.payload);
            return {
                ...state,
                logged: 1,
                counter: state.counter + 1,
                token: action.payload,
            };
        // dispatch({type:"LOGOUT"})
        case "LOGOUT":
            sessionStorage.removeItem("token");
            return {
                ...state,
                logged: 0,
                counter: state.counter + 1,
                token: "",
            };
        default:
            if ( sessionStorage.getItem("token")) {
                return {
                    ...state,
                    logged: 1,
                    token: sessionStorage.getItem("token"),
                };
            }
            return state;
    }
};

export default LoggedReducer;