import type { CSSProperties, FC, PropsWithChildren } from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import type { VideoProps } from '../config';
import type { SceneTiming } from '../timing';

export type Theme = VideoProps['theme'];
export const CLAMP = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

export const Reveal: FC<
  PropsWithChildren<{ from?: number; style?: CSSProperties; zoom?: boolean }>
> = ({ children, from = 0, style, zoom = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const value = spring({
    frame: frame - from,
    fps,
    config: { damping: zoom ? 14 : 23, stiffness: zoom ? 150 : 110, mass: 0.8 },
  });
  return (
    <div
      style={{
        ...style,
        opacity: Math.max(0, Math.min(1, value)),
        transform: zoom ? `scale(${0.88 + 0.12 * value})` : `translateY(${(1 - value) * 32}px)`,
        transformOrigin: 'center',
      }}
    >
      {children}
    </div>
  );
};

export const Headline: FC<PropsWithChildren<{ size?: number }>> = ({ children, size = 74 }) => (
  <h1
    style={{
      fontSize: size,
      fontWeight: 800,
      lineHeight: 1.22,
      letterSpacing: -3,
      margin: '0 0 34px',
      whiteSpace: 'pre-line',
    }}
  >
    {children}
  </h1>
);

export const Card: FC<PropsWithChildren<{ theme: Theme; style?: CSSProperties }>> = ({
  children,
  theme,
  style,
}) => (
  <div
    style={{
      padding: 32,
      border: `1px solid ${theme.border}`,
      borderRadius: 30,
      background: theme.panel,
      boxShadow: `0 14px 40px ${theme.shadow}`,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Stat: FC<{
  theme: Theme;
  label: string;
  value: string;
  unit: string;
  color?: string;
  size?: number;
  style?: CSSProperties;
}> = ({ theme, label, value, unit, color, size = 112, style }) => (
  <Card theme={theme} style={style}>
    <div
      style={{
        fontSize: 22,
        fontWeight: 700,
        letterSpacing: 1.5,
        color: theme.muted,
        lineHeight: 1.5,
      }}
    >
      {label}
    </div>
    <div
      style={{
        fontSize: size,
        fontWeight: 800,
        letterSpacing: -5,
        lineHeight: 1.3,
        color: color ?? theme.primary,
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {value}
    </div>
    <div style={{ fontSize: 23, fontWeight: 600, letterSpacing: 3, color: theme.muted }}>
      {unit}
    </div>
  </Card>
);

export const Icon: FC<{
  kind: 'diamond' | 'cash' | 'report' | 'arrow' | 'check';
  color: string;
  size?: number;
}> = ({ kind, color, size = 64 }) => {
  const paths = {
    diamond: (
      <>
        <path d="M8 23 20 9h24l12 14-24 33ZM8 23h48M20 9l-3 14 15 33 15-33-3-14M17 23l15-14 15 14" />
      </>
    ),
    cash: (
      <>
        <rect x="6" y="17" width="52" height="34" rx="6" />
        <circle cx="32" cy="34" r="9" />
        <path d="M13 29v-5h6M45 44h6v-5M14 12h37" />
      </>
    ),
    report: (
      <>
        <path d="M16 7h23l10 10v40H16ZM39 7v12h10M24 29h17M24 37h17M24 45h10" />
      </>
    ),
    arrow: (
      <>
        <path d="M32 8v46M17 39l15 15 15-15" />
      </>
    ),
    check: (
      <>
        <circle cx="32" cy="32" r="24" />
        <path d="m20 32 8 8 17-18" />
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
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[kind]}
    </svg>
  );
};

export const SceneShell: FC<
  PropsWithChildren<{ scene: SceneTiming; label: string; index: number; theme: Theme }>
> = ({ children, scene, label, index, theme }) => {
  const frame = useCurrentFrame();
  const opacity =
    index === 5
      ? interpolate(frame, [0, 8], [0, 1], CLAMP)
      : interpolate(
          frame,
          [0, 8, scene.durationInFrames - 9, scene.durationInFrames - 1],
          [0, 1, 1, 0],
          CLAMP,
        );
  return (
    <AbsoluteFill style={{ opacity }}>
      <div
        style={{
          position: 'absolute',
          top: 235,
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
            marginBottom: 32,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 2.5,
            color: theme.primary,
          }}
        >
          <span
            style={{
              padding: '9px 14px',
              background: theme.primary,
              color: theme.onPrimary,
              borderRadius: 12,
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          {label}
          <div style={{ flex: 1, height: 1, background: theme.border }} />
          <span style={{ fontSize: 19, color: theme.muted }}>
            {String(index + 1).padStart(2, '0')} / 06
          </span>
        </div>
        {children}
      </div>
    </AbsoluteFill>
  );
};
