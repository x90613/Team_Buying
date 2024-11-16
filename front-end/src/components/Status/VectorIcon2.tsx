import { memo, SVGProps } from 'react';

const VectorIcon2 = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 27 27' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M13.5 0.5C15.2239 0.5 16.8772 1.18482 18.0962 2.40381C19.3152 3.62279 20 5.27609 20 7C20 8.72391 19.3152 10.3772 18.0962 11.5962C16.8772 12.8152 15.2239 13.5 13.5 13.5C11.7761 13.5 10.1228 12.8152 8.90381 11.5962C7.68482 10.3772 7 8.72391 7 7C7 5.27609 7.68482 3.62279 8.90381 2.40381C10.1228 1.18482 11.7761 0.5 13.5 0.5ZM13.5 16.75C20.6825 16.75 26.5 19.6587 26.5 23.25V26.5H0.5V23.25C0.5 19.6587 6.3175 16.75 13.5 16.75Z'
      fill='#1D4666'
    />
  </svg>
);

const Memo = memo(VectorIcon2);
export { Memo as VectorIcon2 };
