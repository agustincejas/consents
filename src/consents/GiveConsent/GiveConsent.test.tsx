import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GiveConsent } from "./GiveConsent";
import { fieldEmailErrorFormatMsg, fieldEmailErrorRequiredMsg, fieldNameErrorRequiredMsg } from "../../constants";
import { act, ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

const withRouter = (component: ReactNode) => {
  return <MemoryRouter>{component}</MemoryRouter>;
};

vi.mock("../../hooks/use-post-consent", async () => {
  return {
    usePostConsent: vi.fn(() => ({
      mutateAsync: vi.fn(),
    })),
  };
});

describe("GiveConsent", () => {
  it("renders all elements", async () => {
    render(withRouter(<GiveConsent />));

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByText(/I agree to/i)).toBeInTheDocument();
    expect(screen.getByText(/receive newsletter/i)).toBeInTheDocument();
    expect(screen.getByText(/be shown targeted ads/i)).toBeInTheDocument();
    expect(screen.getByText(/contribute to anonymous visit statistics/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /give consent/i })).toBeInTheDocument();
  });

  it("shows error when submitting and name is not present", async () => {
    render(withRouter(<GiveConsent />));

    const submitBtn = screen.getByRole("button", { name: /give consent/i });
    await act(() => userEvent.click(submitBtn));

    expect(screen.getByText(fieldNameErrorRequiredMsg)).toBeInTheDocument();
  });

  it("shows error when submitting and email is not present", async () => {
    render(withRouter(<GiveConsent />));

    const submitBtn = screen.getByRole("button", { name: /give consent/i });

    await act(() => userEvent.click(submitBtn));

    expect(screen.getByText(fieldEmailErrorRequiredMsg)).toBeInTheDocument();
  });

  it("shows error when email does not match format", async () => {
    render(withRouter(<GiveConsent />));
    const emailInput = screen.getByLabelText(/email/i);
    const nameInput = screen.getByLabelText(/name/i);
    const wrongEmail = "notanemail";

    await act(async () => {
      await userEvent.type(emailInput, wrongEmail);

      //remove focus from email input
      await userEvent.click(nameInput);
    });

    expect(screen.getByText(fieldEmailErrorFormatMsg)).toBeInTheDocument();
  });

  it("shows error when submitting and no consent is checked", async () => {
    render(withRouter(<GiveConsent />));
  });

  it("inputs correct data", async () => {
    render(withRouter(<GiveConsent />));

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const adsCheckbox = screen.getByRole("checkbox", { name: /be shown targeted ads/i });
    const nameToSend = "Test name";
    const emailToSend = "email@mail.com";

    await act(async () => {
      await userEvent.type(nameInput, nameToSend);
      await userEvent.type(emailInput, emailToSend);
      await userEvent.click(adsCheckbox);
    });

    expect(nameInput).toHaveValue(nameToSend);
    expect(emailInput).toHaveValue(emailToSend);
    expect(adsCheckbox).toBeChecked();
  });
});
