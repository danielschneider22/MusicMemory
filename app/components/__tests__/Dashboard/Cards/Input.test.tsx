import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Input from "@/app/components/Dashboard/Cards/Input";
import userEvent from "@testing-library/user-event";

describe("Input", () => {
  beforeEach(() => {
    render(
      <Input
        value={"test"}
        label="Test Label"
        id="test_id"
        onChange={() => undefined}
      />
    );
  });

  it("renders an input with a label", () => {
    const testInput = screen.getByLabelText(/Test Label/i);
    expect(testInput).toBeInTheDocument();
  });

  // doesn't work because of tailwind not being imported
  // it.only("clicking on an input makes it have a blue background", () => {
  //   const testInput = screen.getByLabelText(/Test Label/i);
  //   userEvent.click(testInput);
  //   testInput.focus();
  //   const computedStyle = window.getComputedStyle(testInput);
  //   expect(testInput).toHaveStyle("border-color: rgb(100 130 246)");
  // });
});
