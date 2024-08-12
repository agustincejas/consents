import { render, screen } from "@testing-library/react";
import App from "./App";

it("App works", async () => {
  render(<App />);
  expect(screen.getByText(/react/i)).toBeInTheDocument();
});
