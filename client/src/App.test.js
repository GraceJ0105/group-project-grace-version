import React from 'react';
import { render, screen } from '@testing-library/react';
import { Routes, MemoryRouter, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import LogIn from "./pages/LogIn/LogIn";
import Layout from "./pages/Layout";
import SignUp from "./pages/SignUp/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard"; 
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import NoPage from "./pages/NoPage";
import App from './App';

test('renders Home component for "/" route ', () => {
  // render
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
  // retrieve element
  const homePage = screen.getByText(/welcome to run to the moon/i);
  // assertion
  expect(homePage).toBeInTheDocument();
});

test('renders Login component for "/login" route', () => {
  render(
    <MemoryRouter initialEntries={['/login']}>
      <Routes>
        <Route>
          <Route path='/login' element={<LogIn />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
  const loginPage = screen.getByText(/log in/i)
  expect(loginPage).toBeInTheDocument();
});


test('renders SignUp component for "/signUp" route', () => {
  render(
    <MemoryRouter initialEntries={['/signUp']}>
      <Routes>
        <Route>
          <Route path='/signUp' element={<SignUp />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
  const loginPage = screen.getByText(/Sorry spaces are full/i)
  expect(loginPage).toBeInTheDocument();
});

test('renders dashboard component for "/dashboard" route', () => {
  render(
    <MemoryRouter initialEntries={['/dashboard']}>
      <Routes>
        <Route>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
  const loginPage = screen.getByText(/Dashboard/i)
  expect(loginPage).toBeInTheDocument();
});

test('renders leaderboard component for "/leaderboard" route', () => {
  render(
    <MemoryRouter initialEntries={['/leaderboard']}>
      <Routes>
        <Route>
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
  const loginPage = screen.getByText(/leaderboard/i)
  expect(loginPage).toBeInTheDocument();
});

test('renders NoPage component for "*" route', () => {
  render(
    <MemoryRouter initialEntries={['/*']}>
      <Routes>
        <Route>
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
  const loginPage = screen.getByText(/Oops! This page does not exist./i)
  expect(loginPage).toBeInTheDocument();
});