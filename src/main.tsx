import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // 추가
import App from "./app/App";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
