import { memo, SVGProps } from 'react';

const MenuRightIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 160 160' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path d='M66.6666 113.333L100 79.9997L66.6666 46.6664V113.333Z' fill='#1D4666' />
  </svg>
);

const Memo = memo(MenuRightIcon);
export { Memo as MenuRightIcon };
