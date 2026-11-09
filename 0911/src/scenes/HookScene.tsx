import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { Title, Train, Reveal, Pill } from '../components/UI';
export const HookScene: FC<SceneProps> = ({ theme, copy, scene }) => {
  const frame = useCurrentFrame(); const { fps } = useVideoConfig();
  const p = spring({ frame: frame - at(scene, '200'), fps, config: { damping: 16 } });
  const c = copy.hook;
  return <><Reveal><Title>{c.title}</Title></Reveal><div style={{ color: theme.accent, fontSize: 240, fontWeight: 800, lineHeight: 1.1, letterSpacing: -15, transform: `scale(${0.85 + p * .15})`, transformOrigin: 'left' }}>{c.number}</div><div style={{ fontSize: 30, fontWeight: 800, letterSpacing: 3 }}>{c.unit}</div><Train theme={theme} /><Pill theme={theme}>{c.tag}</Pill><Reveal from={at(scene, '117')} style={{ marginTop: 25, fontSize: 33, color: theme.teal, fontWeight: 700 }}>{c.local}</Reveal></>;
};
