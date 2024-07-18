import React, { useState } from "react";
import { useFormContext } from "../context/FormContext";
import ButtonGroup from "./ButtonGroup"; // Import the ButtonGroup component

const Form2 = ({ onNext, onBack }) => {
  const { formData, updateFormData } = useFormContext();
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    else if (!/^[A-Za-z]{2,50}$/.test(formData.firstName))
      newErrors.firstName = "First name must be alphabetic and 2-50 characters long";

    if (formData.lastName && !/^[A-Za-z]+$/.test(formData.lastName))
      newErrors.lastName = "Last name must be alphabetic";

    if (!formData.address) newErrors.address = "Address is required";
    else if (formData.address.length < 10)
      newErrors.address = "Address must be at least 10 characters long";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onNext();
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-lg bg-white p-8 shadow-lg"
        style={{ width: "400px" }}
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => updateFormData({ firstName: e.target.value })}
            className="block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
            placeholder="Enter Your First Name"
          />
          {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => updateFormData({ lastName: e.target.value })}
            className="block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
            placeholder="Enter Your Last Name"
          />
          {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => updateFormData({ address: e.target.value })}
            className="block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
            placeholder="Enter Your Address"
          />
          {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
        </div>
        <ButtonGroup onBack={onBack} onSave={handleSubmit} onSaveAndNext={handleSubmit} />
      </form>
    </div>
  );
};

export default Form2;
