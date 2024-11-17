import { memo, SVGProps } from 'react';

const VectorIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M8.59 11.41C9 11.8 9 12.44 8.59 12.83C8.2 13.22 7.56 13.22 7.17 12.83C5.22 10.88 5.22 7.71 7.17 5.76L10.71 2.22C12.66 0.27 15.83 0.27 17.78 2.22C19.73 4.17 19.73 7.34 17.78 9.29L16.29 10.78C16.3 9.96 16.17 9.14 15.89 8.36L16.36 7.88C17.54 6.71 17.54 4.81 16.36 3.64C15.19 2.46 13.29 2.46 12.12 3.64L8.59 7.17C7.41 8.34 7.41 10.24 8.59 11.41ZM11.41 7.17C11.8 6.78 12.44 6.78 12.83 7.17C14.78 9.12 14.78 12.29 12.83 14.24L9.29 17.78C7.34 19.73 4.17 19.73 2.22 17.78C0.27 15.83 0.27 12.66 2.22 10.71L3.71 9.22C3.7 10.04 3.83 10.86 4.11 11.65L3.64 12.12C2.46 13.29 2.46 15.19 3.64 16.36C4.81 17.54 6.71 17.54 7.88 16.36L11.41 12.83C12.59 11.66 12.59 9.76 11.41 8.59C11 8.2 11 7.56 11.41 7.17Z'
      fill='#0D99FF'
    />
  </svg>
);

const Memo = memo(VectorIcon);
export { Memo as VectorIcon };
