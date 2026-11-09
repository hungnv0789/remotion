import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { Panel, Title, Reveal } from '../components/UI';
export const TransferScene: FC<SceneProps> = ({ theme, copy, scene }) => {
  const c = copy.transfer;
  return <><Title>{c.title}</Title>{[[c.first, c.france, c.location, 0], [c.second, c.vietnam, c.note, at(scene, '117')]].map(([number, label, note, from]) => <Reveal key={String(number)} from={Number(from)} style={{ marginBottom: 24 }}><Panel theme={theme}><div style={{ fontSize: 24, fontWeight: 700, color: theme.muted }}>{label}</div><div style={{ display: 'flex', alignItems: 'baseline', gap: 25 }}><strong style={{ fontSize: 135, letterSpacing: -6, color: theme.accent }}>{number}</strong><span style={{ fontSize: 24, fontWeight: 700 }}>{c.label}</span></div><div style={{ fontSize: 24 }}>{note}</div></Panel></Reveal>)}<Reveal from={at(scene, 'Việt Nam')} style={{ fontSize: 30, color: theme.teal, fontWeight: 700, marginTop: 12 }}>{c.share}</Reveal></>;
};
