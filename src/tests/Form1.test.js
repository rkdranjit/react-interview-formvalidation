

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Form1 from "./Form1";

describe("Form1 Component", () => {
  it("renders without errors", () => {
    render(<Form1 onNext={() => {}} />);
  });

  it("validates email input correctly", () => {
    const { getByLabelText, getByText } = render(<Form1 onNext={() => {}} />);
    const emailInput = getByLabelText("Email ID");

    // Test invalid email
    fireEvent.change(emailInput, { target: { value: "invalidemail" } });
    fireEvent.blur(emailInput);
    expect(getByText("Email is invalid")).toBeInTheDocument();

    // Test valid email
    fireEvent.change(emailInput, { target: { value: "validemail@example.com" } });
    fireEvent.blur(emailInput);
    expect(() => getByText("Email is invalid")).toThrow();
  });

  it("validates password input correctly", () => {
    const { getByLabelText, getByText } = render(<Form1 onNext={() => {}} />);
    const passwordInput = getByLabelText("Current password");

    // Test invalid password
    fireEvent.change(passwordInput, { target: { value: "weak" } });
    fireEvent.blur(passwordInput);
    expect(getByText("Password must contain 2 uppercase letters")).toBeInTheDocument();

    // Test valid password
    fireEvent.change(passwordInput, { target: { value: "StrongPassword123@" } });
    fireEvent.blur(passwordInput);
    expect(() => getByText("Password must contain 2 uppercase letters")).toThrow();
  });

  it("calls onNext when valid email and password are submitted", () => {
    const onNextMock = jest.fn();
    const { getByLabelText, getByText } = render(<Form1 onNext={onNextMock} />);

    fireEvent.change(getByLabelText("Email ID"), { target: { value: "validemail@example.com" } });
    fireEvent.change(getByLabelText("Current password"), {
      target: { value: "StrongPassword123@" },
    });
    fireEvent.submit(getByText("Save"));

    expect(onNextMock).toHaveBeenCalled();
  });
});
