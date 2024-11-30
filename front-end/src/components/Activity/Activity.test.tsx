import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Activity, { ActivityProps } from './Activity';

jest.mock('../../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Activity Component', () => {
  const mockAuth = {
    token: 'fake-token',
    username: 'Test User',
    userId: 1,
    isLoggedIn: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue(mockAuth);
  });

  const activityProps: ActivityProps = {
    id: 1,
    host_id: 2,
    hoster_name: 'Test Host',
    contactInformation: 'http://example.com',
    transferInformation: 'Bank Transfer',
    image: 'http://example.com/image.png',
    storeName: 'Test Store',
    title: 'Test Activity',
    description: 'This is a test activity.',
    feedbackPoint: 4.2,
    deadline: new Date(),
    participants_num: 10,
  };

  it('renders the Activity component correctly', () => {
    render(
      <MemoryRouter>
        <Activity {...activityProps} />
      </MemoryRouter>
    );

    // 確保標題和商店名稱存在
    expect(screen.getByText(/Test Activity \(Test Store\)/)).toBeInTheDocument();

    // 確保 Join 按鈕存在
    expect(screen.getByText('Join')).toBeInTheDocument();

    // 確保圖片存在
    const image = screen.getByAltText('Test Store');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'http://example.com/image.png');
  });

  it('opens and closes the modal when the info button is clicked', () => {
    render(
      <MemoryRouter>
        <Activity {...activityProps} />
      </MemoryRouter>
    );

    // 點擊 Info 按鈕
    const infoButton = screen.getByText('i');
    fireEvent.click(infoButton);

    // 確保 Modal 出現
    expect(screen.getByText(/This is a test activity\./)).toBeInTheDocument();

    // 點擊關閉按鈕
    const closeButton = screen.getByAltText('Close');
    fireEvent.click(closeButton);

    // 確保 Modal 關閉
    expect(screen.queryByText(/This is a test activity\./)).not.toBeInTheDocument();
  });

  it('navigates to the order-item page when Join is clicked', () => {
    render(
      <MemoryRouter>
        <Activity {...activityProps} />
      </MemoryRouter>
    );

    // 點擊 Join 按鈕
    const joinButton = screen.getByText('Join');
    fireEvent.click(joinButton);

    // 確保導航行為發生
    expect(mockNavigate).toHaveBeenCalledWith(`/order-item/2/1`);
  });

  it('shows alert if user is not logged in and clicks Join', () => {
    (useAuth as jest.Mock).mockReturnValue({
      ...mockAuth,
      isLoggedIn: false,
    });

    render(
      <MemoryRouter>
        <Activity {...activityProps} />
      </MemoryRouter>
    );

    // 模擬警告
    window.alert = jest.fn();

    // 點擊 Join 按鈕
    const joinButton = screen.getByText('Join');
    fireEvent.click(joinButton);

    // 確保警告出現
    expect(window.alert).toHaveBeenCalledWith('請先點右下角頭像進行快速登入');
  });
});
