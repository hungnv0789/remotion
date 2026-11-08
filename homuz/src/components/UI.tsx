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
import type { PhotoAsset, VideoProps } from '../config';

export type Theme = VideoProps['theme'];
export const CLAMP = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
export const mediaSource = (src: string) => (/^https?:\/\//i.test(src) ? src : staticFile(src));
export const photoById = (assets: PhotoAsset[], id: string) => {
  const photo = assets.find((asset) => asset.id === id);
  if (!photo) throw new Error(`Thiếu ảnh minh họa: ${id}`);
  return photo;
};

export const Reveal: FC<
  PropsWithChildren<{ from?: number; style?: CSSProperties; zoom?: boolean }>
> = ({ children, from = 0, style, zoom = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame: frame - from,
    fps,
    config: { damping: zoom ? 15 : 23, stiffness: 125 },
  });
  return (
    <div
      style={{
        ...style,
        opacity: Math.max(0, Math.min(1, progress)),
        transform: zoom ? `scale(${0.9 + progress * 0.1})` : `translateY(${(1 - progress) * 28}px)`,
      }}
    >
      {children}
    </div>
  );
};

export const Phase: FC<PropsWithChildren<{ from: number; to?: number }>> = ({
  children,
  from,
  to = Infinity,
}) => {
  const frame = useCurrentFrame();
  if (frame < from || frame >= to) return null;
  return (
    <div style={{ opacity: interpolate(frame - from, [0, 6], [0, 1], CLAMP) }}>{children}</div>
  );
};

export const Headline: FC<PropsWithChildren<{ size?: number }>> = ({ children, size = 74 }) => (
  <h1
    style={{
      margin: '0 0 30px',
      fontSize: size,
      fontWeight: 800,
      lineHeight: 1.2,
      letterSpacing: -2.5,
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
      padding: 30,
      background: theme.panel,
      border: `1px solid ${theme.border}`,
      borderRadius: 24,
      ...style,
    }}
  >
    {children}
  </div>
);
export const Tag: FC<PropsWithChildren<{ theme: Theme; color?: string }>> = ({
  children,
  theme,
  color,
}) => (
  <div
    style={{
      fontSize: 20,
      lineHeight: 1.5,
      fontWeight: 700,
      letterSpacing: 1.4,
      color: color ?? theme.accent,
      marginBottom: 21,
    }}
  >
    {children}
  </div>
);

export const PhotoCard: FC<{
  photo: PhotoAsset;
  theme: Theme;
  height?: number;
  position?: string;
  from?: number;
}> = ({ photo, theme, height = 420, position = '50% 50%', from = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = interpolate(frame - from, [0, 15 * fps], [1, 1.055], CLAMP);
  return (
    <div
      style={{
        height,
        position: 'relative',
        borderRadius: 24,
        overflow: 'hidden',
        border: `1px solid ${theme.border}`,
        marginBottom: 27,
      }}
    >
      <Img
        src={mediaSource(photo.src)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: position,
          transform: `scale(${scale})`,
        }}
      />
      <AbsoluteFill
        style={{ background: 'linear-gradient(180deg, transparent 55%, #031120ED 100%)' }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 19,
          left: 23,
          right: 23,
          color: '#FFFFFF',
          fontSize: 18,
          fontWeight: 600,
          lineHeight: 1.4,
        }}
      >
        TƯ LIỆU · {photo.credit}
      </div>
    </div>
  );
};

export const Metric: FC<{
  theme: Theme;
  label: string;
  value: string;
  unit?: string;
  color?: string;
  size?: number;
}> = ({ theme, label, value, unit, color, size = 122 }) => (
  <Card theme={theme}>
    <div
      style={{
        fontSize: 22,
        fontWeight: 700,
        lineHeight: 1.5,
        letterSpacing: 1,
        color: theme.muted,
        whiteSpace: 'pre-line',
      }}
    >
      {label}
    </div>
    <div
      style={{
        fontSize: size,
        fontWeight: 800,
        letterSpacing: -5,
        color: color ?? theme.accent,
        lineHeight: 1.28,
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {value}
    </div>
    {unit ? (
      <div style={{ fontSize: 23, color: theme.muted, letterSpacing: 2, fontWeight: 600 }}>
        {unit}
      </div>
    ) : null}
  </Card>
);

export const ItemRow: FC<{
  theme: Theme;
  title: string;
  detail: string;
  index: number;
  active?: boolean;
}> = ({ theme, title, detail, index, active = false }) => (
  <Card
    theme={theme}
    style={{
      display: 'flex',
      gap: 23,
      alignItems: 'flex-start',
      borderColor: active ? theme.accent : theme.border,
      padding: '25px 28px',
    }}
  >
    <div
      style={{
        width: 56,
        height: 56,
        borderRadius: 14,
        display: 'grid',
        placeItems: 'center',
        flexShrink: 0,
        color: active ? theme.background : theme.accent,
        background: active ? theme.accent : `${theme.accent}12`,
        fontSize: 28,
        fontWeight: 800,
      }}
    >
      {String(index + 1).padStart(2, '0')}
    </div>
    <div>
      <div style={{ fontSize: 33, fontWeight: 700, lineHeight: 1.3 }}>{title}</div>
      <div style={{ fontSize: 26, color: theme.muted, lineHeight: 1.45, marginTop: 10 }}>
        {detail}
      </div>
    </div>
  </Card>
);
