import type { CSSProperties, FC, PropsWithChildren } from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import type { VideoProps } from '../config';
export type Theme = VideoProps['theme'];
export const CLAMP = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
export const mediaSource = (src: string) => /^https?:\/\//i.test(src) ? src : staticFile(src);
export const Reveal: FC<PropsWithChildren<{ from?: number; style?: CSSProperties }>> = ({ children, from = 0, style }) => {
  const frame = useCurrentFrame(); const { fps } = useVideoConfig();
  const p = spring({ frame: frame - from, fps, config: { damping: 23, stiffness: 120 } });
  return <div style={{ ...style, opacity: Math.min(1, Math.max(0, p)), transform: `translateY(${(1 - p) * 30}px)` }}>{children}</div>;
};
export const Title: FC<PropsWithChildren> = ({ children }) => <h1 style={{ fontSize: 72, lineHeight: 1.2, letterSpacing: -2.7, whiteSpace: 'pre-line', margin: '0 0 34px', fontWeight: 800 }}>{children}</h1>;
export const Panel: FC<PropsWithChildren<{ theme: Theme; style?: CSSProperties }>> = ({ children, theme, style }) => <div style={{ padding: 30, borderRadius: 28, background: theme.panel, border: `2px solid ${theme.border}`, ...style }}>{children}</div>;
export const Pill: FC<PropsWithChildren<{ theme: Theme }>> = ({ children, theme }) => <div style={{ alignSelf: 'flex-start', display: 'inline-block', fontSize: 24, fontWeight: 700, padding: '13px 20px', borderRadius: 100, background: `${theme.accent}12`, color: theme.accent }}>{children}</div>;
export const Photo: FC<{ src: string; caption: string }> = ({ src, caption }) => <div style={{ borderRadius: 25, overflow: 'hidden', background: '#fff' }}><Img src={mediaSource(src)} style={{ width: '100%', height: 495, objectFit: 'cover', objectPosition: 'center 72%', display: 'block' }} /><div style={{ padding: '16px 20px', fontSize: 18, color: '#756982' }}>{caption}</div></div>;
/** Concept illustration only; five cars, no representation of an approved industrial design. */
export const Train: FC<{ theme: Theme; from?: number }> = ({ theme, from = 0 }) => {
  const frame = useCurrentFrame();
  const x = interpolate(frame - from, [0, 35], [-150, 0], CLAMP);
  return <svg viewBox="0 0 880 250" style={{ width: '100%', height: 250, overflow: 'visible' }}>
    <path d="M0 201H880M0 215H880" stroke={theme.border} strokeWidth="5" />
    {Array.from({ length: 30 }, (_, i) => <path key={i} d={`M${i * 31} 198v22`} stroke={theme.border} strokeWidth="3" />)}
    <g transform={`translate(${x},0)`}>{Array.from({ length: 5 }, (_, i) => <g key={i} transform={`translate(${i * 169 + 12}, 35)`}>
      <rect x="0" y="16" width="160" height="135" rx={i === 0 ? 30 : 12} fill={theme.accent} />
      <rect x="8" y="112" width="144" height="23" rx="6" fill="#E7D6F9" />
      {[0, 1, 2].map((n) => <rect key={n} x={15 + n * 47} y="39" width="35" height="48" rx="6" fill="#211735" />)}
      <circle cx="35" cy="153" r="15" fill="#332843" /><circle cx="126" cy="153" r="15" fill="#332843" />
      {i < 4 && <path d="M160 110h9" stroke="#756982" strokeWidth="9" />}
    </g>)}</g>
  </svg>;
};
