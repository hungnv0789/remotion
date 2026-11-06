import type { CSSProperties, FC, PropsWithChildren } from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import type { AssetKind, VideoProps } from '../config';

export const CLAMP = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
export type Theme = VideoProps['theme'];

export const Reveal: FC<
  PropsWithChildren<{ delay?: number; delayFrames?: number; style?: CSSProperties }>
> = ({ children, delay = 0, delayFrames, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame: frame - (delayFrames ?? delay * fps),
    fps,
    config: { damping: 22, stiffness: 115, mass: 0.8 },
  });
  return (
    <div
      style={{
        ...style,
        opacity: Math.min(1, progress),
        transform: `translateY(${(1 - progress) * 36}px)`,
      }}
    >
      {children}
    </div>
  );
};

export const Title: FC<PropsWithChildren<{ size?: number }>> = ({ children, size = 76 }) => (
  <h1
    style={{
      margin: '0 0 34px',
      fontSize: size,
      fontWeight: 800,
      lineHeight: 1.2,
      letterSpacing: -3,
      whiteSpace: 'pre-line',
    }}
  >
    {children}
  </h1>
);

export const Panel: FC<PropsWithChildren<{ theme: Theme; style?: CSSProperties }>> = ({
  children,
  theme,
  style,
}) => (
  <div
    style={{
      background: theme.panel,
      border: '1px solid #ffffff18',
      borderRadius: 28,
      padding: 30,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Icon: FC<{ kind: AssetKind | 'wallet' | 'arrow'; color: string; size?: number }> = ({
  kind,
  color,
  size = 60,
}) => {
  const paths = {
    home: (
      <>
        <path d="M8 28 32 8l24 20M15 24v31h34V24" />
        <path d="M26 55V36h12v19" />
      </>
    ),
    gold: (
      <>
        <path d="m15 18-8 29h50l-8-29ZM15 18h34M12 33h40" />
        <path d="m26 18-3 29M38 18l3 29" />
      </>
    ),
    stock: (
      <>
        <path d="M9 9v46h47" />
        <path d="m16 22 13 11 10-8 15 19M44 44h10V34" />
      </>
    ),
    wallet: (
      <>
        <rect x="8" y="16" width="48" height="37" rx="7" />
        <path d="m12 16 32-8v8M56 29H39v12h17" />
        <circle cx="44" cy="35" r="1" />
      </>
    ),
    arrow: (
      <>
        <path d="M32 10v44M15 37l17 17 17-17" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[kind]}
    </svg>
  );
};

export const SceneShell: FC<
  PropsWithChildren<{
    durationInFrames: number;
    index: number;
    label: string;
    theme: Theme;
  }>
> = ({ children, durationInFrames, index, label, theme }) => {
  const frame = useCurrentFrame();
  // Thời điểm chuyển cảnh lấy từ bản thu; fade qua nền chung trong 8 frame.
  const opacity = interpolate(
    frame,
    [0, 8, durationInFrames - 9, durationInFrames - 1],
    [0, 1, 1, 0],
    CLAMP,
  );
  return (
    <AbsoluteFill style={{ opacity }}>
      <div
        style={{
          position: 'absolute',
          top: 222,
          bottom: 500,
          left: 76,
          right: 124,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 18,
            alignItems: 'center',
            marginBottom: 36,
            color: theme.highlight,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 3,
          }}
        >
          <span
            style={{ padding: '7px 11px', border: `1px solid ${theme.accent}55`, borderRadius: 8 }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          {label}
        </div>
        {children}
      </div>
    </AbsoluteFill>
  );
};
