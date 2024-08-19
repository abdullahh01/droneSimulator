import React, { useState } from "react";
import { MainContext } from "./MainContext.js";

const UserDataProvider = ({ children }) => {
    const [userData, setUserData] = useState(0)
  return (
    <div>
      <MainContext.Provider
        value={{
            userData,
            setUserData
        }}
      >
        {children}
      </MainContext.Provider>
    </div>
  );
};

export default UserDataProvider;
