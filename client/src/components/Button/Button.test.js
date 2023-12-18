import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';


describe('Button', () => {
    // Test cases will go here
    it('renders the component with default props', () => {
        render(<Button text="Click me" />);
        const buttonElement = screen.getByText('Click me');
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveClass('buttonMain');
    });

    it('renders the component with custom background color', () => {
        render(<Button text="Custom Button" backgroundColor="#FF0000" />);
        const buttonElement = screen.getByText('Custom Button');
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveClass('buttonMain');
        expect(buttonElement).toHaveStyle({ backgroundColor: '#FF0000' });
    });

    it('triggers onClick handler when clicked', () => {
        const onClickMock = jest.fn();
        render(<Button text="Click Me" onClick={onClickMock} />);
        const buttonElement = screen.getByText('Click Me');
        fireEvent.click(buttonElement);
        expect(onClickMock).toHaveBeenCalled();
    });
});