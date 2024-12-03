import { memo, useState, useEffect, useRef } from 'react';
import type { FC } from 'react';

import resets from '../../_resets.module.css';
import { Component1_Property1ArrowDownD } from '../Component1_Property1ArrowDownD/Component1_Property1ArrowDownD';
import classes from './Component3_Property1Frame18.module.css';
import { VectorIcon } from './VectorIcon';

interface Props {
  className?: string;
  classes?: {
    root?: string;
  };
  hide?: {
    frame21?: boolean;
  };
  value?: string;
  onChange?: (value: string) => void;
  onPriceChange?: (price: number) => void;
}

interface MenuItem {
  product: string;
  price: number;
}

export const Component3_Property1Frame18: FC<Props> = memo(function Component3_Property1Frame18(props = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get menu data from localStorage
    const menuData = localStorage.getItem('menuData');
    if (menuData) {
      const { products } = JSON.parse(menuData);
      setMenuItems(products);
    }

    // Add click outside listener
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (item: MenuItem) => {
    props.onChange?.(item.product);
    props.onPriceChange?.(item.price);
    setIsOpen(false);
  };

  return (
    <div
      className={`${resets.clapyResets} ${props.classes?.root || ''} ${props.className || ''} ${classes.root}`}
      ref={dropdownRef}
    >
      {!props.hide?.frame21 && (
        <div className={classes.frame21}>
          <div className={classes.frame22}></div>
        </div>
      )}
      <Component1_Property1ArrowDownD
        className={classes.component1}
        swap={{
          vector: <VectorIcon className={classes.icon} />,
        }}
        onClick={() => setIsOpen(!isOpen)}
      />
      <input
        type="text"
        className={classes.component3Input}
        placeholder="選擇商品"
        value={props.value || ''}
        onChange={(e) => props.onChange?.(e.target.value)}
        readOnly
      />

      {isOpen && (
        <div className={classes.dropdown}>
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={classes.dropdownItem}
              onClick={() => handleSelect(item)}
            >
              {item.product}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
