/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Home from "./components/Home";

import { ChakraProvider } from "@chakra-ui/react";
import { TabList, TabPanels, Tab, Tabs, Button } from "@chakra-ui/react";
import Admin from "./components/Admin";
import User from "./components/User";

function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [hasCustomRole, setHasCustomRole] = useState(false);

  useEffect(() => {
    async function getUserInfo() {
      const response = await fetch("/.auth/me");
      const user = await response.json();
      setUserInfo(user);

      const isAuthenticated = user.clientPrincipal !== null;
      setAuthenticated(isAuthenticated);

      // Check if user has custom roles
      if (isAuthenticated && user.clientPrincipal.userRoles) {
        // Filter out standard roles like 'anonymous' and 'authenticated'
        const standardRoles = ["anonymous", "authenticated"];
        const customRoles = user.clientPrincipal.userRoles.filter(
          (role) => !standardRoles.includes(role.toLowerCase()),
        );

        setHasCustomRole(customRoles.length > 0);
      } else {
        setHasCustomRole(false);
      }
    }

    getUserInfo();
  }, []);

  return (
    <ChakraProvider>
      <Router>
        <Tabs isFitted={true} orientation={"vertical"}>
          <TabList margin={3} w={"10%"} h="100%">
            {authenticated && hasCustomRole ? (
              // Only show navigation tabs if authenticated and has custom roles
              <>
                <Link to="/">
                  <Tab>Home</Tab>
                </Link>
                <Link to="/user">
                  <Tab>User</Tab>
                </Link>
                <Link to="/admin">
                  <Tab>Admin</Tab>
                </Link>
              </>
            ) : (
              // Always show home tab when authenticated
              authenticated && (
                <Link to="/">
                  <Tab>Home</Tab>
                </Link>
              )
            )}

            <Button margin={2}>
              {!authenticated ? (
                <a href="/.auth/login/aad">Login</a>
              ) : (
                <a href="/.auth/logout">Logout</a>
              )}
            </Button>
          </TabList>
          <TabPanels flexDir="column" marginTop={7}>
            <Routes>
              <Route
                path="/"
                element={
                  <Home authenticated={authenticated} userInfo={userInfo} />
                }
              />
              <Route path="/user" Component={User} />
              <Route path="/admin" Component={Admin} />
            </Routes>
          </TabPanels>
        </Tabs>
      </Router>
    </ChakraProvider>
  );
}

export default App;
