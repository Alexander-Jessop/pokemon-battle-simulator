import React, { ChangeEvent } from "react";

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  showPasswordToggle?: boolean;
  onToggleShowPassword?: () => void;
}

const InputField = ({
  label,
  type,
  value,
  onChange,
  showPasswordToggle = false,
  onToggleShowPassword,
}: InputFieldProps) => {
  return (
    <div className="mb-2">
      <label htmlFor={label.toLowerCase()} className="text-secondary-400">
        {label}:
      </label>
      <div className="relative">
        <input
          type={type}
          id={label.toLowerCase()}
          value={value}
          onChange={onChange}
          required
          className="w-full rounded border border-secondary-400 px-2 py-1"
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={onToggleShowPassword}
            className="absolute right-2 top-1/2 -translate-y-1/2
            text-sm text-secondary-400"
          >
            {type === "password" ? "Show" : "Hide"}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;
