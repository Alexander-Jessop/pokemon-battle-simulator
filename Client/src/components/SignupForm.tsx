import React, { useState } from "react";
import InputField from "./InputField";

interface SignupFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignupFormProps {
  onSubmit: (formData: SignupFormData) => void;
}

const SignupForm = ({ onSubmit }: SignupFormProps) => {
  const [formData, setFormData] = useState<SignupFormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof SignupFormData
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  const handleToggleShowPassword = (field: keyof SignupFormData) => {
    if (field === "password") {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(
        (prevShowConfirmPassword) => !prevShowConfirmPassword
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      onSubmit(formData);

      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setError(null);
    } catch (error: unknown) {
      setError("Failed to sign up. Please try again");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <InputField
        label="Username"
        type="text"
        value={formData.username}
        onChange={(e) => handleChange(e, "username")}
      />
      <InputField
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => handleChange(e, "email")}
      />
      <InputField
        label="Password"
        type={showPassword ? "text" : "password"}
        value={formData.password}
        onChange={(e) => handleChange(e, "password")}
        showPasswordToggle
        onToggleShowPassword={() => handleToggleShowPassword("password")}
      />
      <InputField
        label="Confirm Password"
        type={showConfirmPassword ? "text" : "password"}
        value={formData.confirmPassword}
        onChange={(e) => handleChange(e, "confirmPassword")}
        showPasswordToggle
        onToggleShowPassword={() => handleToggleShowPassword("confirmPassword")}
      />
      {error && <div className="mb-2 text-red-500">{error}</div>}
      <button
        type="submit"
        className="rounded bg-secondary-400 px-4 py-2 text-white"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
