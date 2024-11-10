import { memo, SVGProps } from 'react';

const VectorIcon3 = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M8 12.8591L12.944 16.0001L11.632 10.0801L16 6.09696L10.248 5.57486L8 0.00012207L5.752 5.57486L0 6.09696L4.36 10.0801L3.056 16.0001L8 12.8591Z'
      fill='#FFCD29'
    />
  </svg>
);

const Memo = memo(VectorIcon3);
export { Memo as VectorIcon3 };
