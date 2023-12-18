import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SignUp from './SignUp';
import axios from 'axios';

jest.mock('axios');

describe('SignUp Component', () => {
  test('renders SignUp component and handles form submission', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    
    fireEvent.change(getByPlaceholderText('enter full name'), { target: { value: 'Claire Lister' } });
    fireEvent.change(getByPlaceholderText('enter email'), { target: { value: 'claire.lister@example.com' } });

    
    fireEvent.click(getByText('Join waitlist'));

    
    axios.post.mockResolvedValueOnce({ data: 'Server response' });

    
    await waitFor(() => {
      
      expect(getByText(/Server response/i)).toBeInTheDocument();
    });
  });
});
