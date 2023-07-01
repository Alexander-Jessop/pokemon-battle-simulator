import { useState, ChangeEvent, FormEvent } from "react";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (formData: LoginFormData) => void;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof LoginFormData
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);

    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
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
            text-sm text-secondary-400"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>
      <button
        type="submit"
        className="rounded bg-secondary-400 px-4 py-2 text-white"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
