import { useLayoutEffect, useState } from "react";
import { Context } from "./context";
import { useQuery } from "react-query";

export const ContextProvider = ({ children }) => {
    const { isLoading, error, data } = useQuery(
        'getData',
        () =>
          fetch(
            'https://api.restful-api.dev/objects'
          ).then((response) => response.json())
      );

    const [itemsList, setItemsList] = useState(data || []);

    useLayoutEffect(() => {setItemsList(data)}, [data]);

    return (
      <Context.Provider value={{ itemsList, setItemsList, isLoading, error }}>
        {children}
      </Context.Provider>
    );
  };