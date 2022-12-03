import Layout from "./components/layout";
import { Routes, Route, Outlet, Navigate, Link } from "react-router-dom";
import Home from "./pages/Home";
import Upload, { UploadList } from "./pages/Documents";
import { BidPlot, KnowHouse, KnowPlot, ViewHouse, ViewPlot } from "./pages/Services";
import NewComplaint, { TrackComplaint } from "./pages/Complaint";

import { Box, CircularProgress, Typography } from "@mui/material";

import "./styles.css";
import LoginHandler from "./components/LoginHandler";
import { useEffect } from "react";
import Profile from "./pages/Profile/profile";
import { useUserContext } from "./components/UserContext";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "./config/api-config.js";

export default function App() {

  return (
    <Routes>

      <Route path="citizen_portal/auth/callback" element={<LoginHandler />} />
      <Route path="" element={<Navigate to="/citizen_portal" />}></Route>
      <Route path="/citizen_portal" element={<RequireAuth />}>

        <Route path="" element={<Layout><Home /></Layout>} />
        <Route
          path="documents"
          element={
            <Layout>
              <Upload />
            </Layout>
          }
        />
        <Route
          path="documents/list"
          element={
            <Layout>
              <UploadList />
            </Layout>
          }
        />

        <Route
          path="services/plot-search"
          element={
            <Layout>
              <ViewPlot />
            </Layout>
          }
        />
        <Route
          path="services/plot-search/:id"
          element={
            <Layout>
              <KnowPlot />
            </Layout>
          }
        />
        <Route
          path="services/plot-bid"
          element={
            <Layout>
              <BidPlot />
            </Layout>
          }
        />
        <Route
          path="services/view-house"
          element={
            <Layout>
              <ViewHouse />
            </Layout>
          }
        />
        <Route
          path="services/view-house/:id"
          element={
            <Layout>
              <KnowHouse />
            </Layout>
          }
        />

        <Route
          path="complaint"
          element={
            <Layout>
              <NewComplaint />
            </Layout>
          }
        />
        <Route
          path="complaint/track"
          element={
            <Layout>
              <TrackComplaint />
            </Layout>
          }
        />

        <Route path="profile" element={<Layout><Profile/></Layout>} />
      </Route>


      <Route path="*" element={<Nothing />} />
    </Routes>
  );
}

async function getAccessToken (refreshToken, username) {
  try {
    const { data } = await axios.post(`${baseUrl}/api/token/refresh/`,{
      refresh: refreshToken
    });
    return { error: false, data };
  } catch (error) {
    return { error };
  }
}

function RequireAuth() {
  // const token = sessionStorage.getItem('token') || "Some";
  const refreshToken = localStorage.getItem('refresh');
  const userContext = useUserContext();
  const userData = userContext.useUser();
  const updateUser = userContext.useUserUpdate();
  const logout = userContext.userLogout();

  // console.log(userData);

  const [suspense, setSuspense] = useState(true);

  useEffect(() => {
    if(userData.token) return;
    getAccessToken(refreshToken).then((res) => {
      if(res.error) {
        logout();
      } else {
        const otherUserData = JSON.parse(sessionStorage.getItem('data'));
        updateUser({ 
          ...otherUserData,
          token: res.data.access, 
          username: sessionStorage.getItem('username'), 
          verified: /^true$/.test(sessionStorage.getItem('verified'))
        });
      }
      setSuspense(false);
    })
  }, [userData.token, refreshToken])

  if (userData.token) return <Outlet/>;

  else if (refreshToken && !userData.token) return <Suspense/>;

  return <LoggedOut/>
  // return token ? <Outlet /> : <AccessDenied />
}

function AccessDenied() {
  return (
    <Box sx={{ width: "100%", height: "97vh", display: 'grid', placeItems: 'center' }}>
      <Box display='flex' flexDirection='column' alignItems='center' rowGap={2}>
        <Typography variant="h4" >Access Denied. Please Log In First.</Typography>
      </Box>
    </Box>
  )
}

function LoggedOut() {
  return (
    <Box sx={{ width: "100%", height: "97vh", display: 'grid', placeItems: 'center' }}>
      <Box display='flex' flexDirection='column' alignItems='center' rowGap={2}>
        <Typography variant="h4" >You have been logged out. Please login again.</Typography>
        <a href='http://test-rda.org/login/'>Login</a>
      </Box>
    </Box>
  )
}

function Suspense() {
  return (
    <Box sx={{ width: "100%", height: "97vh", display: 'grid', placeItems: 'center' }}>
      <Box display='flex' flexDirection='column' alignItems='center' rowGap={2}>
        <CircularProgress/>
        <Typography variant="h4" pt={2}>Logging In...</Typography>
      </Box>
    </Box>
  )
}

function Nothing() {
  return (
    <Box
      sx={{ width: "100%", height: "100vh" }}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box p={2}>
        <Typography>Nothing Here !!</Typography>
      </Box>
    </Box>
  );
}
