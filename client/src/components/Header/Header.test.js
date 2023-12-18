import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { BrowserRouter } from 'react-router-dom';

test('renders header elements correctly', () => {
    render(
        <BrowserRouter>
            <Header />
        </BrowserRouter>
    );

    // Test if the app name link is rendered and points to "/"
    const appNameLink = screen.getByText(/run to the moon/i);
    expect(appNameLink).toBeInTheDocument();
    expect(appNameLink.getAttribute('href')).toEqual('/');

    // Test if navigation links are rendered and point to the correct paths
    const links = [
        { text: 'Home', path: '/' },
        { text: 'Log In', path: '/logIn' },
        { text: 'Sign Up', path: '/signUp' },
        { text: 'Dashboard', path: '/dashboard' },
        { text: 'Leaderboard', path: '/leaderboard' },
    ];

    links.forEach((link) => {
        const navLink = screen.getByText(link.text);
        expect(navLink).toBeInTheDocument();
        expect(navLink.getAttribute('href')).toEqual(link.path);
    });
});
