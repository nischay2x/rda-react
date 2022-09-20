import Layout from "./components/layout";

import Home from "./pages/Home";
import Upload, { UploadList } from "./pages/Documents";
import { BidPlot, ViewPlot } from "./pages/Services";
import NewComplaint, { TrackComplaint } from "./pages/Complaint";

import "./styles.css";

export default function App() {
  return (
    <Layout><TrackComplaint/></Layout>
  );
}
