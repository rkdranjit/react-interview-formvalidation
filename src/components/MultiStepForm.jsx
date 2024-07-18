import React, { useState } from "react";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";
import { useFormContext } from "../context/FormContext";
import { useNavigate } from "react-router-dom";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const { formData } = useFormContext();
  const navigate = useNavigate();

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async () => {
    try {
      const response = await fetch("https://codebuddy.review/submit", {
        method: "POST",
        body: JSON.stringify({
          emailId: formData.emailId,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          countryCode: formData.countryCode,
          phoneNumber: formData.phoneNumber,
        }),
      });
      const data = await response.json();
      if (data.message === "Success") {
        navigate("/posts");
      } else {
        console.error("Submission failed", data);
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-400">
      <div className="mx-auto max-w-3xl p-4">
        <h1 className="mb-4 text-center text-2xl font-bold">Multi-Step Form</h1>
        <div className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
          {step === 1 && <Form1 onNext={handleNext} />}
          {step === 2 && <Form2 onNext={handleNext} onBack={handleBack} />}
          {step === 3 && <Form3 onBack={handleBack} onSubmit={handleSubmit} />}
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
