import SignupForm from "../../components/signupForm/SignupForm";
import "./signup.css";
import background from "../../../assets/videos/tech.mp4"

const Signup = () => {
  return (
    <>
      <video id="background" className="videoTag" autoPlay loop muted>
        <source src={background} type="video/mp4" />
      </video>
      <SignupForm />
    </>
  );
};

export default Signup;
