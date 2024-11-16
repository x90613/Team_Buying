import { memo, SVGProps } from 'react';

const VectorIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path d='M16 10H10V16H6V10H0V6H6V0H10V6H16V10Z' fill='#5F5F5F' />
  </svg>
);

const Memo = memo(VectorIcon);
export { Memo as VectorIcon };
