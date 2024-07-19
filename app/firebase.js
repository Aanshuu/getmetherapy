import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBE4evhUL1NCj38mBJ5VUZludR93jrL1e0",
  authDomain: "getmetherapy-792ed.firebaseapp.com",
  projectId: "getmetherapy-792ed",
  storageBucket: "getmetherapy-792ed.appspot.com",
  messagingSenderId: "616670890509",
  appId: "1:616670890509:web:9bb26e326749fa29ffe344",
  measurementId: "G-7V29P139MF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const signInWithGoogleHandler = async () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(async (result) => {
      const { displayName, email, photoURL } = result.user;
      const token = await result.user.getIdToken();

      localStorage.setItem("token", token);

      localStorage.setItem(
        "userdata",
        JSON.stringify({ name: displayName, email, profilePic: photoURL })
      );
    })
    .catch((error) => console.error(error));
};

export {auth};
export default app;
