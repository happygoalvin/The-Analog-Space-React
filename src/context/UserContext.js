import { useState, useEffect, createContext } from "react";
import { baseUrl, apiPath, getHeaderConfig } from "../utils/axios";
import jwtDecode from "jwt-decode";
import axios from "axios";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    accessToken: "",
    refreshToken: "",
  });
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // check refreshToken expiry and refresh if needed
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("tokens"));
    if (token.refreshToken) {
      updateTokens(token);
    }
  }, []);

  // check token expiry and retrieve profile info if valid
  useEffect(() => {
    const getUserInfo = () => {
      const token = JSON.parse(localStorage.getItem("tokens"));
      if (token) {
        updateTokens(token).then(() => {
          setIsLoading(true);
          const getUserProfile = baseUrl.get(
            apiPath.profile,
            getHeaderConfig(token.accessToken)
          );

          setUserInfo(getUserProfile.data);
          setIsLoading(false);
        });
      } else {
        console.log(
          "refresh token has expired. Please login to retrieve user profile"
        );
      }
    };
    getUserInfo();
  }, []);

  const updateTokens = async (token) => {
    if (token) {
      let tokenExpiry = jwtDecode(token.accessToken).exp;
      let currentUnixTime = Math.round(new Date().getTime() / 1000);
      if (currentUnixTime >= tokenExpiry) {
        console.log("Access token has expired. Retrieving new token.");
        setIsLoading(true);

        const refreshAccess = await baseUrl.post(apiPath.refreshTokens, {
          refreshToken: token.refreshToken,
        });

        localStorage.setItem(
          "tokens",
          JSON.stringify({
            accessToken: refreshAccess.data.accessToken,
            refreshToken: refreshAccess.data.refreshToken,
          })
        );

        setAuthState({
          accessToken: refreshAccess.data.accessToken,
          refreshToken: refreshAccess.data.refreshToken,
        });

        setIsLoading(false);
      } else if (currentUnixTime <= tokenExpiry) {
        console.log("Access token has not expired");
        setAuthState({
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
        });
      }
    } else {
      console.log("refresh token has expired, please re-login");
    }
  };

  const logout = async () => {
    const token = JSON.parse(localStorage.getItem("tokens"));
    if (token) {
      setIsLoading(true)
      await baseUrl.post(apiPath.logout, {
        refreshToken: token.refreshToken,
      });

      localStorage.setItem(
        "tokens",
        JSON.stringify({
          accessToken: "",
          refreshToken: "",
        })
      );

      setAuthState({
        accessToken: "",
        refreshToken: "",
      });

      setIsLoading(false);
      console.log("Logout successful");
    } else {
      console.log("Logout unsuccessful");
    }
  };

  const userAuth = {
    getAuth: authState,
    logout: logout,
    updateTokens: updateTokens,
    profile: userInfo,
    isLoading: isLoading
  };

  return (
    <UserContext.Provider value={userAuth}>{children}</UserContext.Provider>
  );
};

export default UserContext;
