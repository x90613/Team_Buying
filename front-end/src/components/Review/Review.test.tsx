import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ReviewLogin from './Review';
import { useAuth } from '../../contexts/AuthContext';
import useFeedback from '../../hooks/useFeedback';

jest.mock('../../hooks/useFeedback', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    createFeedback: jest.fn(async (formData) => {
      if (formData.hostId && formData.userId && formData.hostFormId) {
        return Promise.resolve(true);
      }
      return Promise.resolve(false);
    }),
    loading: false,
    error: null,
    success: false,
  })),
}));

jest.mock('../../contexts/AuthContext', () => ({
  useAuth: jest.fn(() => ({
    token: 'fake-token',
    username: 'Test User',
    userId: '1',
    isLoggedIn: true,
  })),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(() => jest.fn()),
  useParams: jest.fn(() => ({
    host_form_id: '123',
    user_id: '456',
  })),
}));

describe('ReviewLogin Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the ReviewLogin component when open', () => {
    render(
      <MemoryRouter>
        <ReviewLogin isOpen={true} onClose={mockOnClose} hostId="1" />
      </MemoryRouter>
    );

    // 測試基本渲染
    expect(screen.getByText("Test User's Review")).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Review')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });

  it('does not render the component when isOpen is false', () => {
    const { container } = render(
      <MemoryRouter>
        <ReviewLogin isOpen={false} onClose={mockOnClose} hostId="1" />
      </MemoryRouter>
    );

    expect(container.firstChild).toBeNull();
  });


  it('handles review input change', () => {
    render(
      <MemoryRouter>
        <ReviewLogin isOpen={true} onClose={mockOnClose} hostId="1" />
      </MemoryRouter>
    );

    const textarea = screen.getByPlaceholderText('Review');
    fireEvent.change(textarea, { target: { value: 'This is a test review.' } });

    // 確認輸入框的值更新
    expect(textarea).toHaveValue('This is a test review.');
  });


});
