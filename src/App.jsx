import Layout from "./components/layout";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Upload, { UploadList } from "./pages/Documents";
import { BidPlot, ViewPlot } from "./pages/Services";
import NewComplaint, { TrackComplaint } from "./pages/Complaint";

import { Box, Typography } from "@mui/material";

import "./styles.css";
import LoginHandler from "./components/LoginHandler";
import { useEffect } from "react";
import Profile from "./pages/Profile/profile";

export default function App() {

  return (
    <Routes>

      <Route path="auth/callback" element={<LoginHandler />} />
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
          path="services/plot-bid"
          element={
            <Layout>
              <BidPlot />
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

function RequireAuth() {
  const token = sessionStorage.getItem('token') || "Some";

  return token ? <Outlet /> : <AccessDenied />
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
