// MyContext.js
import React, { createContext, useState } from 'react';

export const MyContext = createContext();

const MyProvider = ({ children }) => {
    const [vendorList, setVendorList] = useState([]);
    const [totalpage, setTotalpage] = useState(null);
    const [isloading, setIsloading] = useState(false);
    const [isError, setIsError] = useState(false);

    return (
        <MyContext.Provider value={{ vendorList, setVendorList, totalpage, setTotalpage, isloading, setIsloading, isError, setIsError }}>
            {children}
        </MyContext.Provider>
    );
};

export default MyProvider;
