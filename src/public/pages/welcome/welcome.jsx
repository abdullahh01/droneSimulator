// Welcome.js
import './style.css'; // Make sure the path to your CSS file is correct
import drone from "../../../assets/WingsimLogo.png";

const Welcome = () => {
  return (
    <section id="welcome" className="hero">
      <div>
        <div className="container">
          <div className="image">
            <img src={drone} alt="WingSim Logo" />
          </div>
          <div className="typewriter">
            <h1 style={{fontSize:"100px"}}>Welcome to <br /> WingSim</h1>
            <p>"Experience the Future of Drone Simulation"</p>
            <div className="buttons">
              <a href="Login" className="btn">Login</a>
              <a href="Signup" className="btn">Signup</a>
            </div>
          </div>
        </div>
      </div>
      <div className="circle">
        <span className="dot"></span>
        <span className="dot1"></span>
      </div>
    </section>
  );
};

export default Welcome;
