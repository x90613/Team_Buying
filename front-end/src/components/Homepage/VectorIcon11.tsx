import { memo, SVGProps } from 'react';

const VectorIcon11 = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M8 12.859L12.944 16L11.632 10.08L16 6.09687L10.248 5.57477L8 3.05176e-05L5.752 5.57477L0 6.09687L4.36 10.08L3.056 16L8 12.859Z'
      fill='#FFCD29'
    />
  </svg>
);

const Memo = memo(VectorIcon11);
export { Memo as VectorIcon11 };
