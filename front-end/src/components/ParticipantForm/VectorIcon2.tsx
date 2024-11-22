import { memo, SVGProps } from 'react';

const VectorIcon2 = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M27.3333 17.3333H17.3333V27.3333H10.6667V17.3333H0.666667V10.6667H10.6667V0.666667H17.3333V10.6667H27.3333V17.3333Z'
      fill='#5F5F5F'
    />
  </svg>
);

const Memo = memo(VectorIcon2);
export { Memo as VectorIcon2 };
