// import { GestureDescription, Finger, FingerCurl, FingerDirection } from 'fingerpose';

// const rockGesture = new GestureDescription('rock');
// const paperGesture = new GestureDescription('paper');
// const scissorsGesture = new GestureDescription('scissors');
// const dontGesture = new GestureDescription('dont');

// // Rock
// rockGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
// rockGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.5);

// for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
//   rockGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
//   rockGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
// }

// // Paper
// for (let finger of Finger.all) {
//   paperGesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
// }

// // Scissors
// scissorsGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
// scissorsGesture.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);

// scissorsGesture.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
// scissorsGesture.addCurl(Finger.Ring, FingerCurl.HalfCurl, 0.9);
// scissorsGesture.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
// scissorsGesture.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 0.9);

// // Dont
// for (const finger of Finger.all) {
//   dontGesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
//   dontGesture.addCurl(finger, FingerCurl.HalfCurl, 0.8);

//   dontGesture.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
//   dontGesture.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);

//   dontGesture.addDirection(finger, FingerDirection.HorizontalRight, 1.0);
//   dontGesture.addDirection(finger, FingerDirection.HorizontalLeft, 1.0);
// }

// const gestures = [
//   rockGesture, paperGesture, scissorsGesture, dontGesture
// ];

// export {
//   gestures
// };

// Import dependencies
import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose'; 

// Define Gesture Description
const rotateLeft = new GestureDescription('rotateLeft'); 

// Thumb 
rotateLeft.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0)
rotateLeft.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.25);
rotateLeft.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.25);

// Index
rotateLeft.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0)
rotateLeft.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.25);

// Pinky
rotateLeft.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0)
rotateLeft.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 0.25);

for(let finger of [Finger.Middle, Finger.Ring]){
    rotateLeft.addCurl(finger, FingerCurl.FullCurl, .75); 
    rotateLeft.addDirection(finger, FingerDirection.VerticalDown, 0.25);
}


export {rotateLeft}
