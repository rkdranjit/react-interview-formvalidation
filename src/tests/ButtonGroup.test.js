
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ButtonGroup from "./ButtonGroup";

describe("ButtonGroup Component", () => {
  it("renders without errors", () => {
    render(
      <ButtonGroup
        onBack={() => {}}
        onSave={() => {}}
        onSaveAndNext={() => {}}
        backDisabled={false}
        saveDisabled={false}
        saveAndNextDisabled={false}
      />,
    );
  });

  it("calls onBack when 'Back' button is clicked", () => {
    const onBackMock = jest.fn();
    const { getByText } = render(
      <ButtonGroup
        onBack={onBackMock}
        onSave={() => {}}
        onSaveAndNext={() => {}}
        backDisabled={false}
        saveDisabled={false}
        saveAndNextDisabled={false}
      />,
    );

    fireEvent.click(getByText("Back"));
    expect(onBackMock).toHaveBeenCalled();
  });

  it("calls onSave when 'Save' button is clicked", () => {
    const onSaveMock = jest.fn();
    const { getByText } = render(
      <ButtonGroup
        onBack={() => {}}
        onSave={onSaveMock}
        onSaveAndNext={() => {}}
        backDisabled={false}
        saveDisabled={false}
        saveAndNextDisabled={false}
      />,
    );

    fireEvent.click(getByText("Save"));
    expect(onSaveMock).toHaveBeenCalled();
  });

  it("calls onSaveAndNext when 'Save and Next' button is clicked", () => {
    const onSaveAndNextMock = jest.fn();
    const { getByText } = render(
      <ButtonGroup
        onBack={() => {}}
        onSave={() => {}}
        onSaveAndNext={onSaveAndNextMock}
        backDisabled={false}
        saveDisabled={false}
        saveAndNextDisabled={false}
      />,
    );

    fireEvent.click(getByText("Save and Next"));
    expect(onSaveAndNextMock).toHaveBeenCalled();
  });
});
