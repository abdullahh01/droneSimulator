import LoginForm from "../../components/loginForm/LoginForm";
import "./login.css"
import background from "../../../assets/videos/tech.mp4"

const Login = () => {
  return (
    <>
      <video id="background" className="videoTag" autoPlay loop muted>
        <source src={background} type="video/mp4" />
      </video>
      <LoginForm />
    </>
  );
};

export default Login;
