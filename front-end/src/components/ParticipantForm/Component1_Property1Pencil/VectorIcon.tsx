import { memo, SVGProps } from 'react';

const VectorIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M17.71 4.04C18.1 3.65 18.1 3 17.71 2.63L15.37 0.29C15 -0.1 14.35 -0.1 13.96 0.29L12.12 2.12L15.87 5.87M0 14.25V18H3.75L14.81 6.93L11.06 3.18L0 14.25Z'
      fill='black'
    />
  </svg>
);

const Memo = memo(VectorIcon);
export { Memo as VectorIcon };
