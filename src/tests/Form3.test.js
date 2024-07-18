
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Form3 from "./Form3";

describe("Form3 Component", () => {
  it("renders without errors", () => {
    render(<Form3 onSubmit={() => {}} onBack={() => {}} />);
  });

  it("validates input fields correctly", () => {
    const { getByLabelText, getByText } = render(<Form3 onSubmit={() => {}} onBack={() => {}} />);

    // Test invalid phone number
    fireEvent.change(getByLabelText("Phone Number"), { target: { value: "12345" } });
    fireEvent.blur(getByLabelText("Phone Number"));
    expect(getByText("Phone number must be 10 digits")).toBeInTheDocument();

    // Test valid phone number
    fireEvent.change(getByLabelText("Phone Number"), { target: { value: "1234567890" } });
    fireEvent.blur(getByLabelText("Phone Number"));
    expect(() => getByText("Phone number must be 10 digits")).toThrow();
  });

  it("calls onSubmit when all fields are valid and 'Save and Submit' is clicked", () => {
    const onSubmitMock = jest.fn();
    const { getByLabelText, getByText } = render(
      <Form3 onSubmit={onSubmitMock} onBack={() => {}} />,
    );

    fireEvent.change(getByLabelText("Country Code"), { target: { value: "+91" } });
    fireEvent.change(getByLabelText("Phone Number"), { target: { value: "1234567890" } });
    fireEvent.click(getByText("Save and Submit"));

    expect(onSubmitMock).toHaveBeenCalled();
  });
});
