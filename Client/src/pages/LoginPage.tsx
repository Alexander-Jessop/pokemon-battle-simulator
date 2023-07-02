import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";
import putUserData from "../util/putUserData";

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
  const USER_API = "api/users/signup";
  const USER_LOGIN_API = "api/users/login";
  const [error, setError] = useState<string | null>(null);
  const [showSignupForm, setShowSignupForm] = useState(true);
  const navigate = useNavigate();

  const handleSignupSubmit = async (formData: SignupFormData) => {
    try {
      await axios.post(USER_API, formData);
      setShowSignupForm(true);
      setError(null);
    } catch (error) {
      setError("Failed to sign up. Please try again.");
    }
  };

  const handleLoginSubmit = async (formData: LoginFormData) => {
    try {
      const response = await axios.post(USER_LOGIN_API, formData);
      localStorage.setItem("userSession", JSON.stringify(response.data.user));

      navigate("/");
    } catch (error) {
      setError("Failed to log in. Please try again.");
    }
  };

  const toggleForm = () => {
    setShowSignupForm((prevState) => !prevState);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-primary-700">
      <div
        className="flex min-h-[30rem] w-1/3 min-w-[30rem] max-w-[40rem] flex-col
        items-center justify-center rounded-lg bg-secondary-800 p-6 shadow-lg"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold text-secondary-200">
            {showSignupForm ? "Log In" : "Sign Up"}
          </h2>
          {error && <div className="mb-4 text-red-500">{error}</div>}
          {showSignupForm ? (
            <LoginForm onSubmit={handleLoginSubmit} />
          ) : (
            <SignupForm onSubmit={handleSignupSubmit} />
          )}
          <p className="text-secondary-100">
            {showSignupForm
              ? "Don't have an account?"
              : "Already have account?"}
          </p>
          <button className="text-secondary-200 underline" onClick={toggleForm}>
            {showSignupForm ? "Sign Up" : "Log In"}
          </button>
        </div>
        <div>
          {showSignupForm ? (
            <button className="text-secondary-200 underline">
              Forgot Password?
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
