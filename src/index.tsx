import "./index.css";
export { default as ArabicDateInput } from "./components/ADISA";
import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.getElementById("root")!).render(<App />);
