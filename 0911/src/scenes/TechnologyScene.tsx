import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { Panel, Train, Reveal, Title, Pill } from '../components/UI';
export const TechnologyScene: FC<SceneProps> = ({ theme, copy, scene }) => {
  const c = copy.technology;
  return <><Title>{c.title}</Title><Pill theme={theme}>{c.cars}</Pill><Train theme={theme} /><div style={{ color: theme.muted, fontSize: 15, marginBottom: 28 }}>{c.illustration}</div><Reveal from={at(scene, 'GoA4')}><Panel theme={theme}><div style={{ fontSize: 23, color: theme.muted }}>{c.automationLabel}</div><div style={{ fontSize: 112, fontWeight: 800, color: theme.accent, lineHeight: 1.25 }}>{c.automation}</div><div style={{ fontSize: 29 }}>{c.aluminium}</div></Panel></Reveal><Reveal from={at(scene, 'phanh')} style={{ marginTop: 25, borderLeft: `5px solid ${theme.teal}`, paddingLeft: 24 }}><div style={{ fontSize: 36, color: theme.teal, fontWeight: 800 }}>{c.brake}</div><div style={{ fontSize: 27, marginTop: 10 }}>{c.energy}</div></Reveal></>;
};
