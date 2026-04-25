import { useId, type ReactNode } from 'react';
import './BlobMask.css';

export type BlobShape = 'heritage' | 'market' | 'nature';

const SHAPES: Record<BlobShape, string> = {
  heritage:
    'M127.5 0C150.972 0 170 19.0279 170 42.5V127.5C170 150.972 150.972 170 127.5 170C104.028 170 85 150.972 85 127.5C85 150.972 65.9721 170 42.5 170C19.0279 170 0 150.972 0 127.5V42.5C0 19.0279 19.0279 0 42.5 0C65.9721 0 85 19.0279 85 42.5C85 19.0279 104.028 0 127.5 0Z',
  market:
    'M127.5 0C150.972 6.4426e-07 170 19.0279 170 42.5V141.667C170 157.315 157.315 170 141.667 170C126.019 170 113.333 157.315 113.333 141.667C113.333 157.315 100.648 170 85 170C69.352 170 56.6672 157.315 56.667 141.667C56.6668 157.315 43.981 170 28.333 170C12.6852 170 0.000172283 157.315 0 141.667V42.5C0 19.0279 19.0279 0 42.5 0C65.9721 6.4426e-07 85 19.0279 85 42.5L85.0137 41.4033C85.5953 18.4381 104.395 0 127.5 0Z',
  nature:
    'M44.9209 0C61.141 1.41801e-06 75.1064 9.65447 81.3838 23.5303C89.1902 9.49643 104.168 1.9672e-05 121.366 0H127.461C150.955 0.000126455 170 19.0454 170 42.5391C170 66.0328 150.955 85.079 127.461 85.0791H127.539C150.989 85.0791 170 104.089 170 127.539C170 150.989 150.989 170 127.539 170H121.366C104.168 170 89.1901 160.503 81.3838 146.469C75.1065 160.345 61.1413 170 44.9209 170H40C17.9086 170 2.16207e-06 152.091 0 130V40C1.93129e-06 17.9086 17.9086 -1.93129e-06 40 0H44.9209Z',
};

export interface BlobMaskProps {
  shape: BlobShape;
  src?: string;
  alt: string;
  className?: string;
  overlay?: ReactNode;
}

export function BlobMask({
  shape,
  src,
  alt,
  className = '',
  overlay,
}: BlobMaskProps) {
  const reactId = useId();
  const clipId = `clip-${shape}-${reactId.replace(/:/g, '')}`;

  return (
    <div className={`blob-mask blob-mask--${shape} ${className}`.trim()}>
      <svg
        viewBox="0 0 170 170"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={alt}
      >
        <defs>
          <clipPath id={clipId}>
            <path d={SHAPES[shape]} />
          </clipPath>
        </defs>
        <rect
          width="170"
          height="170"
          clipPath={`url(#${clipId})`}
          className="blob-mask__placeholder"
        />
        {src && (
          <image
            href={src}
            width="170"
            height="170"
            preserveAspectRatio="xMidYMid slice"
            clipPath={`url(#${clipId})`}
          />
        )}
      </svg>
      {overlay && <div className="blob-mask__overlay">{overlay}</div>}
    </div>
  );
}
