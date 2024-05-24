import { useEffect, useState } from "react";
import React from "react";
import { useGetUsersQuery } from "./jsonServerApi";
import { defaultContext, defaultUser } from "./constants";
import { Props, User } from "./types";

export const Context = React.createContext(defaultContext);

export const ContextProvider = ( {children}: Props ) => {

    const { currentData, isLoading } = useGetUsersQuery(1);

    const [authorizatedUserData, setAuthorizatedUserData] = useState<User>(defaultUser);

    const [usersList, setUsersList] = useState(currentData?.data || []);

    useEffect(() => {setUsersList(currentData?.data)}, [currentData?.data]);

    return (
      <Context.Provider value={{ usersList, setUsersList, isLoading, authorizatedUserData,  setAuthorizatedUserData}}>
        {children}
      </Context.Provider>
    );
  };