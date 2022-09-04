import Layout from "./components/layout";
import Home from "./pages/Home";
import Upload, { UploadList } from "./pages/Upload";
import "./styles.css";

export default function App() {
  return (
    <Layout><UploadList/></Layout>
  );
}
