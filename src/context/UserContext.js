import { useState, useEffect, createContext } from "react";
import { baseUrl, apiPath, getHeaderConfig } from "../utils/axios";
import { useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [cart, setCart] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useParams;

  useEffect(() => {
    console.log("Component mounted for user state");
    const fetchToken = async () => {
      setIsLoading(true);
      let token = localStorage.getItem("accessToken");
      if (token) {
        let tokenExpiry = jwtDecode(token).exp;
        let currentUnixTime = Math.round(new Date().getTime() / 1000);
        if (currentUnixTime >= tokenExpiry) {
          console.log("Access token has expired. retrieving new access token");
          const refreshToken = localStorage.getItem("refreshToken");
          let refreshResponse = await baseUrl.post(apiPath.refreshToken, {
            refreshToken: refreshToken,
          });
          localStorage.setItem("accessToken", refreshResponse.data.accessToken);
          token = refreshResponse.data.accessToken;
        }
      }
      let fetchProfile = await baseUrl.get(
        apiPath.profile,
        getHeaderConfig(token)
      );
      setUser(fetchProfile.data);
      setIsLoading(false);
    };
    fetchToken();
  }, []);

  //   useEffect(() => {
  //     console.log("Component mounted for cart state");
  //     const fetchToken = async () => {
  //       let token = localStorage.getItem("accessToken");
  //       if (token) {
  //         let tokenExpiry = jwtDecode(token).exp;
  //         let currentUnixTime = Math.round(new Date().getTime() / 1000);
  //         if (currentUnixTime >= tokenExpiry) {
  //           console.log("Access token has expired. retrieving new access token");
  //           const refreshToken = localStorage.getItem("refreshToken");
  //           let refreshResponse = await baseUrl.post(apiPath.refreshToken, {
  //             refreshToken: refreshToken,
  //           });
  //           localStorage.setItem("accessToken", refreshResponse.data.accessToken);
  //           token = refreshResponse.data.accessToken;
  //         }
  //       }
  //       let fetchCart = await baseUrl.get(
  //         apiPath.getAllCartItems`${userId}`,
  //         getHeaderConfig(token)
  //       );
  //       setUser(fetchCart.data);
  //     };
  //     fetchToken().then(setIsLoading(false));
  //   });

  const userCall = {
    user: user,
    cart: cart,
  };

  return (
    <UserContext.Provider value={userCall}>{children}</UserContext.Provider>
  );
};

export default UserContext;
