import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import QuickLogin from './QuickLogin';

jest.mock('../../hooks/useQuickLogin', () => ({
    __esModule: true,
    default: jest.fn(() => ({
      quickLogin: jest.fn((userName, password) => {
        if (userName === 'validUser' && password === 'validPass') {
          return Promise.resolve({
            token: 'fake-token',
            userName: 'validUser',
            userId: '1',
          });
        }
        return Promise.resolve(null);
      }),
      loading: false,
      error: null,
    })),
  }));

jest.mock('../../contexts/AuthContext', () => ({
  useAuth: jest.fn(() => ({
    login: jest.fn(),
  })),
}));

describe('QuickLogin Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the QuickLogin component when open', () => {
    render(
      <MemoryRouter>
        <QuickLogin isOpen={true} onClose={mockOnClose} />
      </MemoryRouter>
    );

    // 檢查基本元素是否存在
    expect(screen.getByPlaceholderText('User Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    const { container } = render(
      <MemoryRouter>
        <QuickLogin isOpen={false} onClose={mockOnClose} />
      </MemoryRouter>
    );

    expect(container.firstChild).toBeNull();
  });

  it('handles username and password input changes', () => {
    render(
      <MemoryRouter>
        <QuickLogin isOpen={true} onClose={mockOnClose} />
      </MemoryRouter>
    );

    const userNameInput = screen.getByPlaceholderText('User Name');
    const passwordInput = screen.getByPlaceholderText('Password');

    fireEvent.change(userNameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'testPass' } });

    expect(userNameInput).toHaveValue('testUser');
    expect(passwordInput).toHaveValue('testPass');
  });

  it('toggles password visibility', () => {
    render(
      <MemoryRouter>
        <QuickLogin isOpen={true} onClose={mockOnClose} />
      </MemoryRouter>
    );

    const passwordInput = screen.getByPlaceholderText('Password');
    const eyeIcon = screen.getByAltText('Password Visibility');

    // 初始應該為密碼隱藏
    expect(passwordInput).toHaveAttribute('type', 'password');

    // 點擊圖標後應切換為明文顯示
    fireEvent.click(eyeIcon);
    expect(passwordInput).toHaveAttribute('type', 'text');

    // 再次點擊應切換回隱藏
    fireEvent.click(eyeIcon);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('shows an alert if username or password is missing', () => {
    window.alert = jest.fn();
    render(
      <MemoryRouter>
        <QuickLogin isOpen={true} onClose={mockOnClose} />
      </MemoryRouter>
    );

    const loginButton = screen.getByText('Login');
    fireEvent.click(loginButton);

    expect(window.alert).toHaveBeenCalledWith('Please enter both username and password');
  });

  it('shows an alert on invalid credentials', async () => {
    window.alert = jest.fn();
    render(
      <MemoryRouter>
        <QuickLogin isOpen={true} onClose={mockOnClose} />
      </MemoryRouter>
    );

    const userNameInput = screen.getByPlaceholderText('User Name');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByText('Login');

    // 輸入無效的用戶名和密碼
    fireEvent.change(userNameInput, { target: { value: 'invalidUser' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongPass' } });
    fireEvent.click(loginButton);

    // 確保顯示警告
    await Promise.resolve();
    expect(window.alert).toHaveBeenCalledWith('密碼不正確');
  });
});
