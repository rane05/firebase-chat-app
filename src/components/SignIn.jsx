import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

export default function SignIn() {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider);
  };

  return (
    <div className="signin">
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
}