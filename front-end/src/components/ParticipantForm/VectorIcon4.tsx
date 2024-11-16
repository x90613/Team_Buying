import { memo, SVGProps } from 'react';

const VectorIcon4 = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 20 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M19.3333 1.33333H14.6667L13.3333 0H6.66667L5.33333 1.33333H0.666667V4H19.3333M2 21.3333C2 22.0406 2.28095 22.7189 2.78105 23.219C3.28115 23.719 3.95942 24 4.66667 24H15.3333C16.0406 24 16.7189 23.719 17.219 23.219C17.719 22.7189 18 22.0406 18 21.3333V5.33333H2V21.3333Z'
      fill='#A5A5A5'
    />
  </svg>
);

const Memo = memo(VectorIcon4);
export { Memo as VectorIcon4 };
