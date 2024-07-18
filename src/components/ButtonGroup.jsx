import React from "react";

const ButtonGroup = ({ onBack, onSave, onSaveAndNext }) => {
  return (
    <div className="flex justify-between">
      <button
        type="button"
        className="rounded bg-gray-300 px-4 py-2 text-gray-800"
        onClick={onBack}
      >
        Back
      </button>
      <button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white" onClick={onSave}>
        Save
      </button>
      <button
        type="submit"
        className="rounded bg-green-500 px-4 py-2 text-white"
        onClick={onSaveAndNext}
      >
        Save and Next
      </button>
    </div>
  );
};

export default ButtonGroup;
