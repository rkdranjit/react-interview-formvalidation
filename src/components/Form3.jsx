import React, { useState } from "react";
import { useFormContext } from "../context/FormContext";
import ButtonGroup from "./ButtonGroup"; // Import the ButtonGroup component

const Form3 = ({ onBack, onSubmit }) => {
  const { formData, updateFormData } = useFormContext();
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.countryCode) newErrors.countryCode = "Country code is required";
    else if (!["+91", "+1"].includes(formData.countryCode))
      newErrors.countryCode = "Invalid country code";

    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phoneNumber))
      newErrors.phoneNumber = "Phone number must be 10 digits";

    if (!formData.acceptTermsAndCondition)
      newErrors.acceptTermsAndCondition = "You must accept the terms and conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onSubmit();
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-lg bg-white p-8 shadow-lg"
        style={{ width: "400px" }}
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">Country Code</label>
          <select
            value={formData.countryCode}
            onChange={(e) => updateFormData({ countryCode: e.target.value })}
            className="mt-1 block h-12 w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select Country Code</option>
            <option value="+91">India (+91)</option>
            <option value="+1">America (+1)</option>
          </select>
          {errors.countryCode && <p className="text-sm text-red-500">{errors.countryCode}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            value={formData.phoneNumber}
            onChange={(e) => updateFormData({ phoneNumber: e.target.value })}
            className="mt-1 block h-12 w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter Number"
          />
          {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              checked={formData.acceptTermsAndCondition}
              onChange={(e) => updateFormData({ acceptTermsAndCondition: e.target.checked })}
              className="mr-2"
            />
            Accept Terms and Conditions
          </label>
          {errors.acceptTermsAndCondition && (
            <p className="text-sm text-red-500">{errors.acceptTermsAndCondition}</p>
          )}
        </div>
        <ButtonGroup onBack={onBack} onSave={handleSubmit} onSaveAndNext={handleSubmit} />
      </form>
    </div>
  );
};

export default Form3;
