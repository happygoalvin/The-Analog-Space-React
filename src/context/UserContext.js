import { useState, useEffect, createContext } from "react";
import { baseUrl, apiPath, getHeaderConfig } from "../utils/axios";
import jwtDecode from "jwt-decode";

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
        updateTokens(token).then(async () => {
          console.log("moved onto retrieve profile");
          setIsLoading(true);
          console.log("Test retrieval");
          const getUserProfile = await baseUrl.get(
            apiPath.profile,
            getHeaderConfig(token.accessToken)
          );
          console.log("retrieved profile");

          setUserInfo(getUserProfile.data);
          setIsLoading(false);
          console.log("profile retrieval end");
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
      let tokenExpiryAccess = jwtDecode(token.accessToken).exp;
      let tokenExpiryAccessFiveMinBefore = tokenExpiryAccess - 5 * 60 * 1000;
      let currentUnixTime = Math.round(new Date().getTime() / 1000);
      if (currentUnixTime >= tokenExpiryAccessFiveMinBefore) {
        console.log("Access token has expired. Retrieving new token.");
        setIsLoading(true);

        const refreshAccess = await baseUrl.post(apiPath.refreshTokens, {
          refreshToken: token.refreshToken,
        });

        console.log(refreshAccess.data);
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
        console.log("Storing tokens");

        setIsLoading(false);
        console.log("Token retrieved");
      } else if (currentUnixTime <= tokenExpiryAccess) {
        console.log("Access token has not expired");
        setAuthState({
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
        });
      }
    } else {
      setAuthState({
        accessToken: "",
        refreshToken: "",
      });
      localStorage.setItem(
        "tokens",
        JSON.stringify({
          accessToken: "",
          refreshToken: "",
        })
      );
      console.log("refresh token has expired, please re-login");
    }
  };

  const logout = async () => {
    const token = JSON.parse(localStorage.getItem("tokens"));
    if (token) {
      console.log("Logout begin");
      setIsLoading(true);
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
    userInfo: userInfo,
    isLoading: isLoading,
  };

  return (
    <UserContext.Provider value={userAuth}>{children}</UserContext.Provider>
  );
};

export default UserContext;
