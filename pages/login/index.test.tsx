import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import axios from 'axios';
import Login from './index';
import { useRouter } from 'next/router';
import { ROUTES } from '@/pages/lib/helpers';

jest.mock('axios');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Login component', () => {
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {
    });
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush } as any);
  });

  it('should render login form and handle successful login', async () => {
    const mockToken = 'mock-token';

    (axios.post as jest.Mock).mockResolvedValue({ data: { token: mockToken } });

    const { getByTestId } = render(<Login/>);

    fireEvent.change(getByTestId('username-input'), { target: { value: 'testuser' } });
    fireEvent.change(getByTestId('password-input'), { target: { value: 'testpassword' } });

    fireEvent.click(getByTestId('login-button'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/api/auth', {
        action: 'login',
        username: 'testuser',
        password: 'testpassword',
      });
    });

    expect(console.error).not.toHaveBeenCalled();
    expect(mockRouterPush).toHaveBeenCalledWith(ROUTES.TODOS);
  });

  it('should handle login error and display error message', async () => {
    const errorMessage = 'Invalid credentials';

    (axios.post as jest.Mock).mockRejectedValue({ message: errorMessage });

    const { getByTestId } = render(<Login/>);

    fireEvent.change(getByTestId('username-input'), { target: { value: 'testuser' } });
    fireEvent.change(getByTestId('password-input'), { target: { value: 'testpassword' } });

    fireEvent.click(getByTestId('login-button'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/api/auth', {
        action: 'login',
        username: 'testuser',
        password: 'testpassword',
      });
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(console.error).toHaveBeenCalled();
  });
});
