import { memo, SVGProps } from 'react';

const VectorIcon2 = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 24 16' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path d='M0 0H24V2.66667H0V0ZM0 6.66667H24V9.33333H0V6.66667ZM0 13.3333H24V16H0V13.3333Z' fill='#1D4666' />
  </svg>
);

const Memo = memo(VectorIcon2);
export { Memo as VectorIcon2 };
