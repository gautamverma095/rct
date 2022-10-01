import React from "react";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("React Form Component Testing", () => {
  beforeAll(() => {
    global.score = 1;
  });

  beforeEach(() => {
    cleanup();
  });

  test("Check if the name input tag is present, with the 'name' attribute", () => {
    render(<App />);
    expect(screen.getByRole("textbox")).toHaveAttribute("name");
    global.score += 1;
  });

  test("Check if the Username can be typed in the name input tag", () => {
    render(<App />);
    const nameInputBox = screen.getByRole("textbox");
    fireEvent.change(nameInputBox, { target: { value: "Masai School" } });
    expect(screen.getByRole("textbox")).toHaveValue("Masai School");
    global.score += 1;
  });

  test("Check if the Gender is being selected from the Male and Female options", () => {
    render(<App />);

    userEvent.selectOptions(
      screen.getAllByRole("combobox")[0],
      screen.getAllByRole("option", { name: "Male" })
    );
    expect(screen.getByRole("option", { name: "Male" }).selected).toBe(true);
    global.score += 1;
  });

  test("Check if the Role is being selected from FrontEnd Developer, BackEnd Developer, FullStack Developer options", () => {
    render(<App />);
    userEvent.selectOptions(
      screen.getAllByRole("combobox")[1],
      screen.getAllByRole("option", { name: "BackEnd Developer" })
    );
    expect(
      screen.getByRole("option", { name: "BackEnd Developer" }).selected
    ).toBe(true);

    global.score += 1;
  });

  it("should render no users found text initially", () => {
    render(<App />);
    expect(screen.getByTestId("no-user-container")).toHaveTextContent(
      /no users found/i
    );
    global.score += 1;
  });

  it("should display details in a table", async () => {
    render(<App />);
    let name = screen.getByRole("textbox");
    let gender = screen.getByTestId("gender-select");
    let role = screen.getByTestId("role-select");
    const maritalStatusCheckbox = screen.getByRole("checkbox");
    fireEvent.change(name, { target: { value: "Aman" } });
    fireEvent.change(gender, {
      target: { value: "Male" },
    });
    fireEvent.change(role, {
      target: { value: "BackEnd Developer" },
    });

    fireEvent.click(maritalStatusCheckbox);
    const formElement = screen.getByTestId("form-element");
    fireEvent.submit(formElement);

    expect(screen.getAllByRole("row")[1]).toHaveTextContent("Aman");
    expect(screen.getAllByRole("row")[1]).toHaveTextContent("Male");
    expect(screen.getAllByRole("row")[1]).toHaveTextContent(
      "BackEnd Developer"
    );
    expect(screen.getAllByRole("row")[1]).toHaveTextContent(/married/i);
    fireEvent.change(name, { target: { value: "Santhi" } });
    fireEvent.change(gender, {
      target: { value: "Female" },
    });
    fireEvent.change(role, {
      target: { value: "FullStack Developer" },
    });

    fireEvent.click(maritalStatusCheckbox);
    fireEvent.submit(formElement);
    expect(screen.getAllByRole("row")[2]).toHaveTextContent("Santhi");
    expect(screen.getAllByRole("row")[2]).toHaveTextContent("Female");
    expect(screen.getAllByRole("row")[2]).toHaveTextContent(
      "FullStack Developer"
    );
    expect(screen.getAllByRole("row")).toHaveLength(3);

    global.score += 3;
  });
  it("should reset the fileds with intitial data", () => {
    render(<App />);
    let name = screen.getByRole("textbox");
    let gender = screen.getByTestId("gender-select");
    let role = screen.getByTestId("role-select");
    const maritalStatusCheckbox = screen.getByRole("checkbox");
    fireEvent.change(name, { target: { value: "Aman" } });
    fireEvent.change(gender, {
      target: { value: "Female" },
    });
    fireEvent.change(role, {
      target: { value: "BackEnd Developer" },
    });

    fireEvent.click(maritalStatusCheckbox);
    const formElement = screen.getByTestId("form-element");
    fireEvent.submit(formElement);

    expect(screen.getAllByRole("row")[1]).toHaveTextContent("Aman");
    expect(screen.getAllByRole("row")[1]).toHaveTextContent("Female");
    expect(screen.getAllByRole("row")[1]).toHaveTextContent(
      "BackEnd Developer"
    );
    expect(screen.getAllByRole("row")[1]).toHaveTextContent(/married/i);
    expect(name.value).toBe("");
    expect(gender.value).toBe("Male");
    expect(role.value).toBe("FrontEnd Developer");
    expect(maritalStatusCheckbox.checked).toBe(false);
    global.score += 1;
  });
  afterAll(() => {
    console.log("Final Score is", global.score);
  });
});
