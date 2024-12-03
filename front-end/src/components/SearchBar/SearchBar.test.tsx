import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar Component', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the SearchBar component', () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    // 確認搜尋輸入框和圖標渲染
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    expect(screen.getByAltText('Toggle Icon')).toBeInTheDocument();
  });

  it('calls onSearch callback on input change', () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText('Search');

    // 模擬輸入文字
    fireEvent.change(inputElement, { target: { value: 'Test Query' } });

    // 確認 onSearch 回調被正確調用
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith('Test Query');
  });

  it('updates the input value on user input', () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText('Search');

    // 模擬輸入文字
    fireEvent.change(inputElement, { target: { value: 'Another Test' } });

    // 確認輸入框顯示的值更新
    expect(inputElement).toHaveValue('Another Test');
  });
});
