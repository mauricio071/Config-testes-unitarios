import { render, screen } from "@testing-library/react";
import App from "./App";

test("Renderiza o título da aplicação", () => {
  render(<App />);
  const titleElement = screen.getByText(/Minha Aplicação/i);
  expect(titleElement).toBeInTheDocument();
});
