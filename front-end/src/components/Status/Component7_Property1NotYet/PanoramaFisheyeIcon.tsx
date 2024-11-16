import { memo, SVGProps } from 'react';

const PanoramaFisheyeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M10 21C5.59 21 2 17.41 2 13C2 8.59 5.59 5 10 5C14.41 5 18 8.59 18 13C18 17.41 14.41 21 10 21ZM10 3C4.47 3 0 7.47 0 13C0 18.53 4.47 23 10 23C15.53 23 20 18.53 20 13C20 7.47 15.53 3 10 3Z'
      fill='#626262'
    />
  </svg>
);

const Memo = memo(PanoramaFisheyeIcon);
export { Memo as PanoramaFisheyeIcon };
