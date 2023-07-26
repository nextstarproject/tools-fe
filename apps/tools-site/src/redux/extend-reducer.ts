import { Reducer } from "@reduxjs/toolkit";

/**
 * extend third-party reducer shape\
 * TODO: add typescript support
 * @param baseReducer third-party reducer
 * @param wrapperReducer your extend reducer
 * @returns composed reducer
 */
export const extendReducer = (
    baseReducer: Reducer,
    wrapperReducer: Reducer
): Reducer => {
    return (state, action) => {
        const preState = baseReducer(state, action);
        return wrapperReducer(preState, action);
    };
};
