import React, {
  createContext,
  useState,
  useContext,
  createElement,
} from "react";

const initialUser = {
  address: "",
  zipCode: "",
  tel: "",
  email: "",
};
const UserInfoContext = createContext();

const UserInfoProvider = ({ children }) => {
  const [formDataUser, setFormDataUser] = useState(initialUser);

  const getFormDataUser = () => {
    return formDataUser;
  };



  return createElement(
    UserInfoContext.Provider,
    { value: { formDataUser, setFormDataUser, getFormDataUser } },
    children
  );
};

const useUserInfo = () => useContext(UserInfoContext);

export { UserInfoProvider, useUserInfo };
