import React, { useState } from "react";
import { useFormContext } from "../context/FormContext";
import ButtonGroup from "./ButtonGroup"; // Import the ButtonGroup component

const Form1 = ({ onNext }) => {
  const { formData, updateFormData } = useFormContext();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validateEmail = (value) => {
    if (!value) return "Email is required";
    else if (!/\S+@\S+\.\S+/.test(value)) return "Email is invalid";
    return "";
  };

  const validatePassword = (value) => {
    if (!value) return "Password is required";
    else if (
      !/(?=.*[A-Z].*[A-Z])(?=.*[a-z].*[a-z])(?=.*\d.*\d)(?=.*[@$!%*?&].*[@$!%*?&])/.test(value)
    ) {
      return "Password must contain 2 uppercase letters, 2 lowercase letters, 2 numbers, and 2 special characters";
    }
    return "";
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    const errorMessage = validateEmail(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      emailId: errorMessage,
    }));
    updateFormData({ emailId: value });
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    const errorMessage = validatePassword(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: errorMessage,
    }));
    updateFormData({ password: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(formData.emailId) === "" && validatePassword(formData.password) === "") {
      onNext();
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-lg bg-white p-8 shadow-lg"
        style={{ width: "400px" }}
      >
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="emailId">
            Email ID
          </label>
          <input
            id="emailId"
            type="email"
            value={formData.emailId}
            onChange={handleEmailChange}
            onBlur={handleEmailChange} // Validate on blur as well
            className="block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
            placeholder="Enter Email"
            required
          />
          {errors.emailId && <p className="mt-1 text-sm text-red-500">{errors.emailId}</p>}
        </div>
        <div className="mb-5 max-w-sm">
          <label htmlFor="password" className="mb-2 block text-sm">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handlePasswordChange}
              onBlur={handlePasswordChange} // Validate on blur as well
              className="block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
              placeholder="Enter Password"
              required
            />
          </div>
          <input
            type="checkbox"
            id="togglePassword"
            className="relative inset-y-0 right-0 mt-0.5 rounded border-gray-200 text-blue-600 focus:ring-blue-500"
            onChange={togglePasswordVisibility}
          />
          <label htmlFor="togglePassword" className="ms-3 cursor-pointer text-sm text-gray-500">
            Show password
          </label>
          {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
        </div>
        <ButtonGroup onBack={() => {}} onSave={handleSubmit} onSaveAndNext={handleSubmit} />
      </form>
    </div>
  );
};

export default Form1;
