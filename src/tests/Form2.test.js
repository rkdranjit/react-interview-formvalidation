
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Form2 from "./Form2";

describe("Form2 Component", () => {
  it("renders without errors", () => {
    render(<Form2 onNext={() => {}} onBack={() => {}} />);
  });

  it("validates input fields correctly", () => {
    const { getByLabelText, getByText } = render(<Form2 onNext={() => {}} onBack={() => {}} />);

    // Test invalid first name
    fireEvent.change(getByLabelText("First Name"), { target: { value: "123" } });
    fireEvent.blur(getByLabelText("First Name"));
    expect(getByText("First name must be alphabetic")).toBeInTheDocument();

    // Test valid first name
    fireEvent.change(getByLabelText("First Name"), { target: { value: "John" } });
    fireEvent.blur(getByLabelText("First Name"));
    expect(() => getByText("First name must be alphabetic")).toThrow();
  });

  it("calls onNext when all fields are valid and 'Save and Next' is clicked", () => {
    const onNextMock = jest.fn();
    const { getByLabelText, getByText } = render(<Form2 onNext={onNextMock} onBack={() => {}} />);

    fireEvent.change(getByLabelText("First Name"), { target: { value: "John" } });
    fireEvent.change(getByLabelText("Last Name"), { target: { value: "Doe" } });
    fireEvent.change(getByLabelText("Address"), { target: { value: "123 Main St" } });
    fireEvent.click(getByText("Save and Next"));

    expect(onNextMock).toHaveBeenCalled();
  });
});
