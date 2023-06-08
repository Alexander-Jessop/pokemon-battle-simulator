import React, { useState } from "react";

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
    } catch (error: any) {
      setError("Failed to sign up. Please try again");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <label htmlFor="username" className="text-secondary-400">
          Username:
        </label>
        <input
          type="text"
          id="username"
          value={formData.username}
          onChange={(e) => handleChange(e, "username")}
          required
          className="w-full rounded border border-secondary-400 px-2 py-1"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="email" className="text-secondary-400">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => handleChange(e, "email")}
          required
          className="w-full rounded border border-secondary-400 px-2 py-1"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="password" className="text-secondary-400">
          Password:
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={formData.password}
            onChange={(e) => handleChange(e, "password")}
            required
            className="w-full rounded border border-secondary-400 px-2 py-1"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2
            transform text-sm text-secondary-400"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>
      <div className="mb-2">
        <label htmlFor="confirmPassword" className="text-secondary-400">
          Confirm Password:
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) => handleChange(e, "confirmPassword")}
            required
            className="w-full rounded border border-secondary-400 px-2 py-1"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2
            transform text-sm text-secondary-400"
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>
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
