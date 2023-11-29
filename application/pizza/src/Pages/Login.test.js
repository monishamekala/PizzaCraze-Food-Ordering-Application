import Login from "./Login";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("Login Component", () => {
    it("Login page is loaded", async () => {
        const { getByTestId } = render(
            <MemoryRouter>
              <Login />
            </MemoryRouter>
          );
        // const {getByTestId} = render(<Login />);
        const loginheading = getByTestId("loginHeading").textContent;
        expect(loginheading).toEqual("Login");
    });
});