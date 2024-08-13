import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GiveConsent } from "./GiveConsent";
import { fieldEmailErrorRequiredMsg, fieldNameErrorRequiredMsg } from "../../constants";
import { act } from "react";

describe("GiveConsent", () => {
  it("GiveConsent works", async () => {
    render(<GiveConsent />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByText(/I agree to/i)).toBeInTheDocument();
    expect(screen.getByText(/receive newsletter/i)).toBeInTheDocument();
    expect(screen.getByText(/be shown targeted ads/i)).toBeInTheDocument();
    expect(screen.getByText(/contribute to anonymous visit statistics/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /give consent/i })).toBeInTheDocument();
  });

  it("shows error when submitting and name is not present", async () => {
    render(<GiveConsent />);

    const submitBtn = screen.getByRole("button", { name: /give consent/i });
    await act(() => userEvent.click(submitBtn));

    expect(screen.getByText(fieldNameErrorRequiredMsg)).toBeInTheDocument();
  });

  it("shows error when submitting and email is not present", async () => {
    render(<GiveConsent />);

    const submitBtn = screen.getByRole("button", { name: /give consent/i });

    await act(() => userEvent.click(submitBtn));

    expect(screen.getByText(fieldEmailErrorRequiredMsg)).toBeInTheDocument();
  });

  // it("shows error when email does not match format", async () => {
  //   render(<GiveConsent />);
  // });

  // it("shows error when submitting and no consent is checked", async () => {
  //   render(<GiveConsent />);
  // });

  it("sends all data on submit", async () => {
    render(<GiveConsent />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const submitBtn = screen.getByRole("button", { name: /give consent/i });
    const adsCheckbox = screen.getByRole("checkbox", { name: /be shown targeted ads/i });
    const nameToSend = "Test name";
    const emailToSend = "email@mail.com";

    await act(async () => {
      await userEvent.type(nameInput, nameToSend);
      await userEvent.type(emailInput, emailToSend);
      await userEvent.click(adsCheckbox);
      await userEvent.click(submitBtn);
    });

    expect(nameInput).toHaveValue(nameToSend);
    expect(emailInput).toHaveValue(emailToSend);
    expect(adsCheckbox).toBeChecked();
  });
});
