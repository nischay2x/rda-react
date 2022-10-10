import Layout from "./components/layout";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Upload, { UploadList } from "./pages/Documents";
import { BidPlot, ViewPlot } from "./pages/Services";
import NewComplaint, { TrackComplaint } from "./pages/Complaint";

import { Box, Typography } from "@mui/material";

import "./styles.css";

export default function App() {
  return (
    <Routes>
      <Route
        path=""
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />

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

      <Route path="*" element={<Nothing />} />
    </Routes>
  );
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
