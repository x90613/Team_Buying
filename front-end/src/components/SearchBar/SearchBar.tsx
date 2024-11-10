import { FC, useState } from 'react';
import styles from './SearchBar.module.css';
import Toggle from '/assets/Toggle.png';
interface SearchBarProps {
  onSearch: (query: string) => void; // 接收搜尋字串的回調函數
}

const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery); // 每次輸入變更時即時呼叫 onSearch 回調
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={handleInputChange}
        className={styles.input}
      />
      <img src={Toggle} alt="Toggle Icon" className={styles.icon} />
    </div>
  );
};

export default SearchBar;