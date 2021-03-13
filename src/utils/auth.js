import { useContext, useEffect, useState } from "react";
import { Logout } from "../components/search/SearchStyles";
import { FireContext } from "./fireContext";

export const LogoutComponent = () =>   {
  // const {firebase}
  return <Logout>Logout</Logout>
}


export const useHookLocalStorage = (authUser) => {
  const [user, setUser] = useState(localStorage.getItem(authUser) || null);
  useEffect(() => {
    function checkUserData() {
      const item = localStorage.getItem(authUser) || null;
      console.log(item);
      if (item) {
        return setUser(item);
      } else {
        setUser(null);
      }
    }
    window.addEventListener("storage", checkUserData);
  }, []);

  return [user, setUser];
};
