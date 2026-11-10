import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { Title, Panel, Reveal, Metric } from '../components/UI';
export const DebateScene: FC<SceneProps> = ({ theme, copy, scene }) => {
  const c = copy.debate;
  return <><Title>{c.title}</Title><Panel theme={theme}><div style={{ fontSize: 28, fontWeight: 800, color: theme.muted }}>{c.risk}</div><div style={{ fontSize: 28, lineHeight: 1.4, marginTop: 15 }}>{c.riskDetail}</div></Panel><Reveal from={at(scene,'lựa chọn')} style={{ marginTop: 25 }}><Panel theme={theme} style={{ borderColor: theme.accent }}><div style={{ fontSize: 28, fontWeight: 800, color: theme.accent }}>{c.growth}</div><div style={{ fontSize: 28, lineHeight: 1.4, marginTop: 15 }}>{c.growthDetail}</div></Panel></Reveal><div style={{ marginTop: 35 }}><Metric theme={theme} value={c.year} label={c.yearLabel} from={at(scene,'2045')} /></div></>;
};
