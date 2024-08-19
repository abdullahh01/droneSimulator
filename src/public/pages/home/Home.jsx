import { useEffect } from "react";
import SimulationOptions from "../../components/simulationOptions/SimulationOptions.jsx";
import "./home.css";

const Home = () => {
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      location.pathname = "/signup";
    }
  }, []);
  
  return (
    <>
      <SimulationOptions />
    </>
  );
};

export default Home;
