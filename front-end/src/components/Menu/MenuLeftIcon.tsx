import { memo, SVGProps } from 'react';

const MenuLeftIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 160 160' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path d='M93.3333 46.6667L60 80L93.3333 113.333V46.6667Z' fill='#1D4666' />
  </svg>
);

const Memo = memo(MenuLeftIcon);
export { Memo as MenuLeftIcon };
