import { memo, SVGProps } from 'react';

const VectorIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 18 12' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path d='M0 0H18V2H0V0ZM0 5H18V7H0V5ZM0 10H18V12H0V10Z' fill='black' />
  </svg>
);

const Memo = memo(VectorIcon);
export { Memo as VectorIcon };
