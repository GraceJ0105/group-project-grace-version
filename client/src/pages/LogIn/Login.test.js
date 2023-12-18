import { render, fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import LogIn from './LogIn'

test('loads the login component', async () => {
    // Arrange
    render(<Login />)
    // Act
    // Assert
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
});

//The toHaveValue matcher checks the value of an input element 
//against an expected value. So, to verify that an input field starts empty, 
// the correct assertion is to use toHaveValue('') 
// to check if the input fields are initially empty.

test('input fields start empty', async () => {
    // Arrange
    render(<Login />)
    // Act
    // Assert
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');

    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
});

test('submits form on login button click', () => {
    // Arrange
    const { getByPlaceholderText, getByText } = render(<Login />);
    const emailInput = getByPlaceholderText('Email')
    const passwordInput = getByPlaceholderText('Password')
    const loginButton = getByText('Log in')

    // Act
    // Set values for email and password inputs
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    // Simulate button click
    fireEvent.click(loginButton);

    // Assert
    expect(window.location.pathname).toEqual('/dashboard');
});