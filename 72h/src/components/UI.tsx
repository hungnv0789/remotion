import type { CSSProperties, FC, PropsWithChildren } from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import type { VideoProps } from '../config';

export type Theme = VideoProps['theme'];
export const CLAMP = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
export const mediaSource = (src: string) => (/^https?:\/\//i.test(src) ? src : staticFile(src));

export const Reveal: FC<PropsWithChildren<{ from?: number; style?: CSSProperties }>> = ({
  children,
  from = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const value = spring({ frame: frame - from, fps, config: { damping: 23, stiffness: 125 } });
  return (
    <div
      style={{
        ...style,
        opacity: Math.max(0, Math.min(1, value)),
        transform: `translateY(${(1 - value) * 30}px)`,
      }}
    >
      {children}
    </div>
  );
};

export const Photo: FC<{
  src: string;
  duration: number;
  from?: number;
  position?: string;
  style?: CSSProperties;
}> = ({ src, duration, from = 0, position = '50% 50%', style }) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame - from, [0, Math.max(1, duration)], [1, 1.055], CLAMP);
  return (
    <AbsoluteFill style={{ overflow: 'hidden', ...style }}>
      <Img
        src={mediaSource(src)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: position,
          transform: `scale(${scale})`,
        }}
      />
    </AbsoluteFill>
  );
};

export const PhotoMontage: FC<{
  images: string[];
  duration: number;
  cutEvery?: number;
  dim?: number;
}> = ({ images, duration, cutEvery = 2.4, dim = 0.25 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cut = Math.max(1, Math.round(cutEvery * fps));
  return (
    <AbsoluteFill>
      {images.map((src, index) => {
        const start = index * cut;
        const opacity = index === 0 ? 1 : interpolate(frame, [start, start + 6], [0, 1], CLAMP);
        return (
          <AbsoluteFill key={src} style={{ opacity }}>
            <Photo src={src} from={start} duration={duration} />
          </AbsoluteFill>
        );
      })}
      <AbsoluteFill style={{ background: `rgba(3, 13, 26, ${dim})` }} />
    </AbsoluteFill>
  );
};

export const Icon: FC<{ kind: 'check' | 'share' | 'shield'; color: string; size?: number }> = ({
  kind,
  color,
  size = 48,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    stroke={color}
    strokeWidth="3.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {kind === 'check' ? (
      <path d="m14 32 12 12 25-26" />
    ) : kind === 'share' ? (
      <>
        <path d="M33 17v26M22 27l11-11 11 11M16 39v16h34V39" />
      </>
    ) : (
      <>
        <path d="m32 6 21 9v16c0 13-11 22-21 27-10-5-21-14-21-27V15Z" />
        <path d="m22 32 7 7 14-16" />
      </>
    )}
  </svg>
);

export const SceneLabel: FC<{ text: string; index: number; theme: Theme }> = ({
  text,
  index,
  theme,
}) => (
  <div
    style={{
      position: 'absolute',
      top: 221,
      left: 76,
      right: 124,
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      color: theme.accent,
      fontSize: 23,
      fontWeight: 700,
      letterSpacing: 2,
    }}
  >
    <span style={{ padding: '8px 12px', border: `1px solid ${theme.accent}66`, borderRadius: 8 }}>
      {String(index + 1).padStart(2, '0')}
    </span>
    {text}
  </div>
);
