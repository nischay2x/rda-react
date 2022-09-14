import Layout from "./components/layout";

import Home from "./pages/Home";
import Upload, { UploadList } from "./pages/Documents";
import ViewPlot from "./pages/Services";

import "./styles.css";

export default function App() {
  return (
    <Layout><ViewPlot/></Layout>
  );
}
