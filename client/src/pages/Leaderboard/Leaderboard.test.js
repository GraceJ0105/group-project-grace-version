// Leaderboard.test.js
import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import Leaderboard from './Leaderboard';

jest.mock('axios');

describe('Leaderboard Component', () => {
  test('throws an error on axios request failure', async () => {
    axios.get.mockRejectedValue({ message: 'Data fetching failed'});

    const renderComponent = () => render(<Leaderboard />);

    
    expect(() => {
      renderComponent();
    }).toThrow('Data fetching failed');
  });
});
