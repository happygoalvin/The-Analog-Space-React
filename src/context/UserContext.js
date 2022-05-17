import { useState, useEffect, createContext } from "react";
import { baseUrl, apiPath, getHeaderConfig } from "../utils/axios";
import Notify from "simple-notify";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState({
    accessToken: "",
    refreshToken: "",
  });
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);
  const [tokenUpdated, setTokenUpdated] = useState(false);

  // check refreshToken expiry and refresh if needed
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("tokens"));
    const tokenExpiryRefresh =
      jwtDecode(token.refreshToken).exp - 5 * 60 * 1000;
    const currentUnixTime = Math.round(new Date().getTime() / 1000);
    if (token.refreshToken) {
      updateTokens(token);
    } else if (currentUnixTime <= tokenExpiryRefresh) {
      new Notify({
        status: "info",
        text: "Session has expired. Please re-login.",
        effect: "slide",
      });
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
      setLoggedOut(true);
      setTimeout(navigate("/login"), 1500);;
    }
    // eslint-disable-next-line
  }, []);

  // check token expiry and retrieve profile info if valid
  useEffect(() => {
    const getUserInfo = () => {
      const token = JSON.parse(localStorage.getItem("tokens"));
      if (token) {
        updateTokens(token).then(async () => {
          if (tokenUpdated) {
            console.log("moved onto retrieve profile");
            setIsLoading(true);
            console.log("Test retrieval");
            const getUserProfile = await baseUrl.get(
              apiPath.profile,
              getHeaderConfig(token.accessToken)
            );
            console.log("retrieved profile");

            setUserInfo(getUserProfile.data);

            setLoggedOut(false);
            setIsLoading(false);
            setTokenUpdated(false);
            console.log("profile retrieval end");
          }
        });
      } else {
        new Notify({
          status: "info",
          text: "Session has expired. Please re-login.",
          effect: "slide",
        });
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
        setLoggedOut(true);
        setTimeout(navigate("/login"), 1500);
      }
    };
    getUserInfo();
    // eslint-disable-next-line
  }, [authState.accessToken]);

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
        setLoggedOut(false);
        setTokenUpdated(true);
        console.log("Token retrieved");
      } else if (currentUnixTime <= tokenExpiryAccess) {
        console.log("Access token has not expired");
        setAuthState({
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
        });
      }
    }
  };

  const logout = async () => {
    const token = JSON.parse(localStorage.getItem("tokens"));
    if (token) {
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
      setLoggedOut(true);
    }

    if (loggedOut) {
      new Notify({
        status: "success",
        text: "Logout successful",
        effect: "slide",
        autoclose: true,
        autotimeout: 1500,
      });
      setTimeout(navigate("/"), 1500);
    }
  };

  const userAuth = {
    userTokens: authState,
    logout: logout,
    updateTokens: updateTokens,
    userInfo: userInfo,
    isLoading: isLoading,
    loggedOut: loggedOut,
  };

  return (
    <UserContext.Provider value={userAuth}>{children}</UserContext.Provider>
  );
};

export default UserContext;
