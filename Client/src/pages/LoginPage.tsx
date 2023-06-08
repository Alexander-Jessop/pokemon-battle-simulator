import axios from "axios";
import { useState } from "react";
import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";

interface SignupFormData {
  username: string;
  email: string;
  password: string;
}

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [showSignupForm, setShowSignupForm] = useState(true);

  const handleSignupSubmit = async (formData: SignupFormData) => {
    try {
      await axios.post(import.meta.env.VITE_USER_API, formData);
      setShowSignupForm(true);
      setError(null);
    } catch (error) {
      setError("Failed to sign up. Please try again.");
    }
  };

  const handleLoginSubmit = async (formData: LoginFormData) => {
    try {
      await axios.post(import.meta.env.VITE_USER_LOGIN_API, formData);
    } catch (error) {
      setError("Failed to log in. Please try again.");
    }
  };

  const toggleForm = () => {
    setShowSignupForm((prevState) => !prevState);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div
        className="flex h-2/4 w-2/4 flex-col items-center
        justify-center bg-secondary-800"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold text-secondary-400">
            {showSignupForm ? "Log In" : "Sign Up"}
          </h2>
          {error && <div className="mb-4 text-red-500">{error}</div>}
          {showSignupForm ? (
            <LoginForm onSubmit={handleLoginSubmit} />
          ) : (
            <SignupForm onSubmit={handleSignupSubmit} />
          )}
          <p>
            {showSignupForm
              ? "Don't have an account?"
              : "Already have account?"}
          </p>
          <button className="text-secondary-400 underline" onClick={toggleForm}>
            {showSignupForm ? "Sign Up" : "Log In"}
          </button>
        </div>
        <div>
          <button className="text-secondary-400 underline">
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
