import "./App.css";
import Auth from "./components/Auth";
import Table from "./components/Table";
import Modal from "./components/Modal";
import { initJuno } from "@junobuild/core";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    (async () =>
      await initJuno({
        satelliteId: "i7bdp-3yaaa-aaaal-adafa-cai",
      }))();
  }, []);

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-full h-screen flex justify-center items-center">
      <Auth>
        <Table />
      </Auth>
    </div>
  );
}

export default App;
