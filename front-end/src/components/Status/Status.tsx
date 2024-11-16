import { memo } from 'react';
import type { FC } from 'react';

import resets from '../_resets.module.css';
import { ArrowRightDropCircleIcon2 } from './ArrowRightDropCircleIcon2.js';
import { ArrowRightDropCircleIcon } from './ArrowRightDropCircleIcon.js';
import { Component1_Property1Account } from './Component1_Property1Account/Component1_Property1Account.js';
import { Component1_Property1LinkVarian } from './Component1_Property1LinkVarian/Component1_Property1LinkVarian.js';
import { Component5_Property1Create } from './Component5_Property1Create/Component5_Property1Create.js';
import { Component7_Property1Done } from './Component7_Property1Done/Component7_Property1Done.js';
import classes from './Status.module.css';
import { VectorIcon2 } from './VectorIcon2.js';
import { VectorIcon } from './VectorIcon.js';
import { Component7_Property1Fail } from './Component7_Property1Fail/Component7_Property1Fail.js';
import { Component7_Property1NotYet } from './Component7_Property1NotYet/Component7_Property1NotYet.js';

interface Props {
  className?: string;
}

interface OrderDetail {
  name: string;
  items: { itemName: string; number: string; price: number }[];
  total: number;
}

interface OrderStatus {
  status: 'done' | 'fail' | 'notYet';
  updatedAt: string;
}

const orderDetails: OrderDetail[] = [
  {
    name: 'Tom',
    items: [
      { itemName: 'Chocolate Cake', number: 'x 1', price: 160 },
      { itemName: 'Black Tea', number: 'x 1', price: 30 },
      { itemName: 'Black Tea', number: 'x 1', price: 30 },
       { itemName: 'Black Tea', number: 'x 1', price: 30 },
      
      
    ],
    total: 190,
  }
];

// 模擬 API 返回的 JSON 數據
const mockApiResponse: OrderStatus = {
  status: 'notYet',
  updatedAt: '2024-01-20T10:00:00Z'
};

/* @figmaId 21:1462 */
export const Unnamed: FC<Props> = memo(function Unnamed(props = {}) {
  // 使用 API 返回的狀態
  const paymentStatus = mockApiResponse.status;

  const renderPaymentStatus = () => {
    switch (paymentStatus) {
      case 'done':
        return <Component7_Property1Done className={classes.component7} />;
      case 'fail':
        return <Component7_Property1Fail className={classes.component7} />;
      case 'notYet':
        return <Component7_Property1NotYet className={classes.component7} />;
      default:
        return <Component7_Property1NotYet className={classes.component7} />;
    }
  };

  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.unsplashQJ0zGkrE1Zg}></div>
      <div className={classes.frame29}></div>
      <div className={classes.logo}>
        <div className={classes.logo21}></div>
        <div className={classes.logo31}></div>
      </div>
      <div className={classes.foodAndDrink}>Food and Drink</div>
      <div className={classes.seeMore}>See More</div>
      <div className={classes.arrowRightDropCircle}>
        <ArrowRightDropCircleIcon className={classes.icon3} />
      </div>
      <div className={classes.foodAndDrink2}>Food and Drink</div>
      <div className={classes.seeMore2}>See More</div>
      <div className={classes.arrowRightDropCircle2}>
        <ArrowRightDropCircleIcon2 className={classes.icon4} />
      </div>
      <div className={classes._666156156015666}>(666) 0156156-0015666</div>
      <div className={classes.taoHuaSTeamBuying}>TaoHua ‘s TeamBuying</div>
      <div className={classes._2024112220}>2024/11/2 22:00</div>
      <div className={classes.line1}></div>/
      
      {orderDetails.map((order, index) => (
        <div key={index} className={classes.orderDetails}>
          <div className={classes.header}>
            <Component1_Property1Account
              className={classes.component6}
              swap={{
                vector: <VectorIcon2 className={classes.icon2} />,
              }}
            />
            <div className={classes.name}>{order.name}</div>
          </div>
          <div className={classes.itemList}>
            {order.items.map((item, idx) => (
              <div key={idx} className={classes.item}>
                <div className={classes.itemName}>{item.itemName}</div>
                <div className={classes.number}>{item.number}</div>
                <div className={classes.price}>${item.price}</div>
              </div>
            ))}
            <div className={classes.line3}></div>
            <div className={classes.item}>
              <div className={classes.itemName}>Total</div>
              <div className={classes.number}></div>
              <div className={classes.price}>${order.total}</div>
            </div>
          </div>
        </div>
      ))}
      
      <div className={classes.line2}></div>
      <div className={classes.transferInformation}>Transfer information</div>
      <div className={classes.paymentStatus}>Payment Status</div>
      <div className={classes.hosterContactInformation}>Hoster Contact Information</div>
      <div className={classes.link}>link</div>
      <Component1_Property1LinkVarian
        className={classes.component2}
        swap={{
          vector: <VectorIcon className={classes.icon} />,
        }}
      />
      
      {renderPaymentStatus()}
      
      <Component5_Property1Create
        className={classes.component10}
        text={{
          create: <div className={classes.create}>Review</div>,
        }}
      />
    </div>
  );
});
