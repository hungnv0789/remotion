import type { CSSProperties, FC, PropsWithChildren } from 'react';
import { interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import type { VideoProps } from '../config';
export type Theme = VideoProps['theme'];
export const CLAMP = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
export const mediaSource = (src: string) => /^https?:\/\//i.test(src) ? src : staticFile(src);
export const Reveal: FC<PropsWithChildren<{ from?: number; style?: CSSProperties }>> = ({ children, from = 0, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - from, fps, config: { damping: 24, stiffness: 130 } });
  return <div style={{ ...style, opacity: Math.min(1, Math.max(0, p)), transform: `translateY(${(1 - p) * 25}px)` }}>{children}</div>;
};
export const Phase: FC<PropsWithChildren<{ from: number; to?: number }>> = ({ children, from, to = Infinity }) => {
  const frame = useCurrentFrame();
  return frame >= from && frame < to ? <div>{children}</div> : null;
};
export const Title: FC<PropsWithChildren<{ size?: number }>> = ({ children, size = 72 }) => <h1 style={{ fontSize: size, lineHeight: 1.22, letterSpacing: -2.8, whiteSpace: 'pre-line', margin: '0 0 32px', fontWeight: 800 }}>{children}</h1>;
export const Panel: FC<PropsWithChildren<{ theme: Theme; style?: CSSProperties }>> = ({ children, theme, style }) => <div style={{ padding: 30, borderRadius: 26, background: theme.panel, border: `2px solid ${theme.border}`, ...style }}>{children}</div>;
export const Pill: FC<PropsWithChildren<{ theme: Theme }>> = ({ children, theme }) => <div style={{ display: 'inline-block', alignSelf: 'flex-start', fontSize: 24, fontWeight: 700, padding: '13px 20px', borderRadius: 100, background: `${theme.accent}12`, color: theme.accent }}>{children}</div>;
export const Metric: FC<{ value: string; label: string; theme: Theme; from?: number }> = ({ value, label, theme, from = 0 }) => <Reveal from={from}><div style={{ fontSize: 148, fontWeight: 800, color: theme.accent, letterSpacing: -8, lineHeight: 1.12 }}>{value}</div><div style={{ fontSize: 26, fontWeight: 700, color: theme.muted, marginTop: 18, whiteSpace: 'pre-line', lineHeight: 1.5 }}>{label}</div></Reveal>;
export const Item: FC<{ number: string; title: string; detail?: string; theme: Theme; from?: number }> = ({ number, title, detail, theme, from = 0 }) => <Reveal from={from} style={{ marginTop: 22 }}><Panel theme={theme} style={{ display: 'flex', gap: 26, alignItems: 'flex-start' }}><div style={{ fontSize: 40, color: theme.accent, fontWeight: 800, lineHeight: 1.4 }}>{number}</div><div><div style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.4 }}>{title}</div>{detail && <div style={{ fontSize: 25, marginTop: 12, lineHeight: 1.5, color: theme.muted }}>{detail}</div>}</div></Panel></Reveal>;
