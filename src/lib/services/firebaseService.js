import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut
} from "firebase/auth";
import auth from "../../config/firebase/firebaseConfig";

export const registerUser = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      localStorage.setItem("user", true);
      alert("Welcome! ", email);
      location.pathname = "/home";
    })
    .catch((error) => {
      console.log("error code ", error.code);
      if (error.code === "auth/email-already-in-use") {
        alert("This email is already in use!");
      } else {
        alert("Sorry! please try creating your account again");
      }
    });
};

export const loginUser = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      localStorage.setItem("user", true);
      location.pathname = "/home";
    })
    .catch((error) => {
      console.log("error code", error.code);
      if (error.code === "auth/invalid-credential") {
        alert("Wrong email or password!");
      } else {
        alert("Sorry! please try logging in your account again");
      }
    });
};

export const logoutUser = () => {
  signOut(auth).then(function() {
    localStorage.removeItem("user");
    location.pathname = "/login";
  })
};

export const resetPassword = (email) => {
  sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    alert("password reset email sent");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("Sorry! ", errorCode)
  });

}

export const userDataOnLogin = () => {
  return new Promise((resolve, reject) => {
    try {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          resolve(user);
        } else {
          // User is signed out
          reject(new Error("User signed out"));
        }
      });
      // Return a function to unsubscribe from the auth state changes
      return unsubscribe;
    } catch (error) {
      // Catch and handle any errors
      reject(error);
    }
  });
};
