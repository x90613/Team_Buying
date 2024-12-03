import React from 'react';
import { render, screen, fireEvent, waitFor  } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import HostForm from './HostForm';

jest.mock('../../contexts/AuthContext', () => ({
  __esModule: true,
  useAuth: jest.fn(() => ({
    token: 'fake-token',
    username: 'TestUser',
    userId: 1,
    isLoggedIn: true,
    login: jest.fn(),
    logout: jest.fn(),
  })),
}));

jest.mock('../../hooks/useGetMenu', () => ({
  __esModule: true,
  default: () => ({
    menus: [
      { id: 1, name: 'Store 1' },
      { id: 2, name: 'Store 2' },
    ],
    loading: false,
    error: null,
  }),
}));

describe('HostForm Component', () => {
  const mockOnClose = jest.fn();

  it('renders the form and handles input changes correctly', () => {
    render(
      <MemoryRouter>
    <HostForm isOpen={true} onClose={mockOnClose} />
      </MemoryRouter>);

    // 測試標題輸入框是否存在
    const titleInput = screen.getByPlaceholderText('Title');
    expect(titleInput).toBeInTheDocument();

    // 模擬輸入並檢查輸入值是否更新
    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    expect(titleInput).toHaveValue('Test Title');
  });

  it('renders the select dropdown when "others" is false', () => {
    render(
      <MemoryRouter>
        <HostForm isOpen={true} onClose={mockOnClose} />
      </MemoryRouter>
    );

    // 確認下拉選單存在
    const menuSelect = screen.getByRole('combobox', { name: 'menuId' });
    expect(menuSelect).toBeInTheDocument();

    // 模擬選擇菜單項目
    const menuValue = JSON.stringify({ "id": 1, "name": "Store 1" });
    fireEvent.change(menuSelect, { target: { value: menuValue } });
    expect(menuSelect).toHaveValue(menuValue);
  });

  it('renders the input field when "others" is true', () => {
    // 渲染組件並設置 "others" 為 true
    render(
      <MemoryRouter>
        <HostForm isOpen={true} onClose={mockOnClose} />
      </MemoryRouter>
    );

    // 切換 "others" 為 true
    const othersCheckbox = screen.getByRole('checkbox', { name: "Others" });
    fireEvent.click(othersCheckbox);

    // 確認輸入框存在
    const storeNameInput = screen.getByPlaceholderText('Store Name');
    expect(storeNameInput).toBeInTheDocument();

    // 模擬輸入行為
    fireEvent.change(storeNameInput, { target: { value: 'Test Store' } });
    expect(storeNameInput).toHaveValue('Test Store');
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <MemoryRouter>
    <HostForm isOpen={true} onClose={mockOnClose} />
    </MemoryRouter>);

    const closeButton = screen.getByAltText('Close');
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

});
