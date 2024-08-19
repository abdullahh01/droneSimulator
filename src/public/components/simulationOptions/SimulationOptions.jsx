import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../../assets/WingsimLogo.png";
import SignoutDropdown from "../../components/dropdrowns/SignoutDropdown.jsx";
import { Link } from "react-router-dom";
import { Button, Form, Input } from 'antd'; 
import TextArea from "antd/es/input/TextArea.js";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const SimulationOptions = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <>
    <Navbar id="homeNavbar">
        <Container id="homeNavbarContainer">
          <Navbar.Brand href="#home" id="logoName">
            <img
              src={logo}
              alt="Logo"
              width="60"
              height="60"
              className="d-inline-block align-top"
            />
            WingSim
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <div id="navLinks">
              <a href="#withKeys">Keys</a>
              <a href="#withJoystick">Joystick</a>
              <a href="#withGestures">Gestures</a>
              <a href="#feedback">Feedback</a>
              <a href="#aboutUs">About Us</a>
            </div>
            <div id="signoutDropdown">
              <SignoutDropdown />
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
   
      <section id="withKeys" className="section">
        <div id="keyboardDiv">
         <h2>Control with Keys</h2>
         <p>This Feature lets you control drone by Keyboard Keys <li>A = left rotation</li><li>W = Upward</li><li>S = Downward</li><li>D = Right rotation</li><li>Arrow Keys = Forward, Backward, Left, Right</li></p>
         <div id="button"><Link id="routingLinks" to="/keyscontrol"><Button id="routingBtn">Keyboard Simulator</Button></Link></div>
        </div>
      </section>
    
      <section id="withJoystick" className="section">
        <div id="joystickDiv">
         <h2>Control with Joystick</h2>
         <p>This Feature lets you control drone by joystick <li>A = Take off</li><li>B = Landing</li><li>LB = Drone Camera</li><li>RB = Drone Bottom View</li><li> Gimbal = Forward, Backward, Left, Right</li></p>
         <div id="button"><Link id="routingLinks" to="/joystickcontrol"><Button id="routingBtn">Joystick Simulator</Button></Link></div>
        </div>      
      </section>
    
      <section id="withGestures" className="section">
        <div id="gestureDiv">
         <h2>Control with Gestures</h2>
         <p>This Feature lets you control drone by Hand Gesture<li>Thumb = Left rotation</li><li>Index Finger = Upwards</li><li>Victory Sign = Downwards</li><li>Pinky Finger = Right rotation</li><li>Punch = Forward</li><li>High-Five = Stop</li></p>
         <div id="button" style={{height: "170px"}}><Link id="routingLinks" to="/gesturescontrol"><Button id="routingBtn">Gesture Simulator</Button></Link></div>
        </div>
      </section>
    
      <section id="feedback" className="section">
        <div id="feedbackDiv">
          <h2>Feedback</h2>
          <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            style={{ width: "100%" }}
          >
            <Input placeholder="Email" style={{width:"100%",height:"50px", fontSize:"1.5em",margin:"40px 0px 25px 0px"}} />
            <Input placeholder="Name" style={{width:"100%", height:"50px", fontSize:"1.5em",margin:"0px 0px 25px 0px"}}/>
            <TextArea placeholder="Message" style={{width:"100%", height:"140px", fontSize:"1.5em",margin:"0px 0px 25px 0px"}}/>

            <Button type="primary"
              htmlType="submit"
              className="login-form-button" style={{fontFamily: "monospace",width:"100%",height:"50px", fontSize:"1.5em"}}>
                Submit
            </Button>
          </Form>
        </div>
      </section>
   
      <section id="aboutUs" className="section">
        <div id="aboutUsDiv">
          <div>
            <h2 style={{marginTop:"50px"}}>About Us</h2>
          </div>
          
          <div style={{ height:"70%", display:"flex", justifyContent:"center",alignItems:"center"}}>
            <p style={{width:"50%"}}>Welcome to WingSim, your gateway to the future of drone control. Our innovative simulator allows users to experience the thrill of piloting a drone, using either traditional keyboard controls or advanced hand gesture technology. Whether you're a beginner eager to learn the basics or an experienced pilot looking to refine your skills, WingSim provides a realistic and immersive environment to explore and master drone flying.</p>   
          </div>
        </div>
      </section>
    </>
  )
}

export default SimulationOptions