import React from "react";
import { useContext, useEffect, useState } from "react";
import { Logout } from "../components/search/SearchStyles";
import { FireContext } from "./fireContext";

export const LogoutComponent = () => {
  const firebase = useContext(FireContext);

  function logout(){
    firebase.auth().signOut()
      .then(() => {
        localStorage.clear();
      })
      .catch((e) => {
        console.error("Sign Out Error", e);
      });
  };
  return <Logout onClick={logout}>Logout</Logout>;
};

export const useHookLocalStorage = (authUser) => {
  const [user, setUser] = useState(localStorage.getItem(authUser) || null);
  useEffect(() => {
    function checkUserData() {
      const item = localStorage.getItem(authUser) || null;
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
