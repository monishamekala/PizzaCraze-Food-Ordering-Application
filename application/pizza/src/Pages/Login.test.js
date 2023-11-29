import Login from "./Login";
import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { createMemoryHistory } from "history";

describe(Login, () => {
  //to check if login page is loading
  it("Login page is loaded", async () => {
      const { getByTestId } = render(
          <MemoryRouter>
            <Login />
          </MemoryRouter>
        );
      const loginheading = getByTestId("loginHeading").textContent;
      expect(loginheading).toEqual("Login");
  });

  //to check if the email and password fields are amndatory
  it("Verify that Email and Password fields are mandatory", async() => {
    const { getByTestId, getByRole } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    
    fireEvent.click(getByRole('button', { name: 'Log In' }));

    await waitFor(() => {});
    const emailValidationMessage = getByTestId('email-input');
    expect(emailValidationMessage).toHaveAttribute('required');
  });

  //to check if the password field is mandatory
  it("Verify that Password field is mandatory in the Login form", async() => {
    const { getByTestId, getByRole } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    
    const emailField = getByTestId('email-input');
    fireEvent.change(emailField, {target: {value: 'csc848@gmail.com'}})

    fireEvent.click(getByRole('button', { name: 'Log In' }));
    
    const passwordField = getByTestId('password-input');
    await waitFor(() => {});
    
    expect(passwordField).toHaveAttribute('required');
  });

  //to verify if the user is able to login with valid data
  it("Verify if the user is able to login with valid data", async () => {
    const history = createMemoryHistory();
    const { getByTestId, getByRole } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </MemoryRouter>
    );
  
    const emailField = getByTestId('email-input');
    fireEvent.change(emailField, { target: { value: 'csc848@gmail.com' } });
  
    const passwordField = getByTestId('password-input');
    fireEvent.change(passwordField, { target: { value: 'SOFTware@89' } });
  
    fireEvent.click(getByRole('button', { name: 'Log In' }));
    await waitFor(() => {});
  
    expect(history.location.pathname).toBe('/');
  });

  it("Verify if the user is not able to login with invalid data", async () => {
    const { getByTestId, getByRole } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </MemoryRouter>
    );
  
    const emailField = getByTestId('email-input');
    fireEvent.change(emailField, { target: { value: 'csc848@gmail.com' } });
  
    const passwordField = getByTestId('password-input');
    fireEvent.change(passwordField, { target: { value: 'SOFTwae@89' } });
  
    fireEvent.click(getByRole('button', { name: 'Log In' }));
    await waitFor(() => {
      const FailMessage = screen.getByText(/Either Email or Password is incorrect/i);
      expect(FailMessage).toBeInTheDocument();
    });
  });
});