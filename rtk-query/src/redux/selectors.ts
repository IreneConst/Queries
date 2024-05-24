import { createSelector } from "@reduxjs/toolkit";

const selectQuery = (state: any) => state?.jsonServerApi?.queries?.['getUsers(1)']?.data?.data;
const selectPostedUsers = (state: any) => Object.values(state?.jsonServerApi?.mutations).map((value: any) => value.data);

export const selectUsers = createSelector(
    selectQuery,
    selectPostedUsers,
    (users, newUsers) => {
        if(newUsers?.length && users?.length) {
        return [...newUsers, ...users];
        }
    }
);