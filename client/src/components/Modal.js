import { useState } from "react";
import SignUpModal from "./SignUpModal";
import LoginModal from "./LoginModal";

const AuthModal = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
      <>
      {isSignUp ? (
        <SignUpModal isOpen={isOpen} onClose={onClose} switchToLogin={() => setIsSignUp(false)} />
      ) : (
        <LoginModal isOpen={isOpen} onClose={onClose} switchToSignUp={() => setIsSignUp(true)} />
      )}
    </>
  );
};

export default AuthModal;
