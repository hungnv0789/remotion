import type { FC } from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { CLAMP, Panel, Title, Reveal } from '../components/UI';
export const NetworkScene: FC<SceneProps> = ({ theme, copy, scene }) => {
  const frame = useCurrentFrame(); const c = copy.network;
  const p = interpolate(frame, [0, 60], [0, 1], CLAMP);
  return <><Title>{c.title}</Title><svg viewBox="0 0 880 295" style={{ width: '100%', height: 295 }}>
    {['M30 250L240 40H500L820 250', 'M50 60H300L550 260H820', 'M150 290V180L420 60H850', 'M50 160H650L790 30'].map((d, i) => <path key={d} d={d} fill="none" stroke={[theme.accent, theme.teal, '#C194EB', '#B5C7D7'][i]} strokeWidth="12" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - p} />)}
    {[[240, 40], [300, 60], [150, 180], [550, 260], [650, 160], [500, 40]].map(([x,y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="12" fill="white" stroke={theme.accent} strokeWidth="5" />)}
  </svg><div style={{ fontSize: 15, color: theme.muted, marginBottom: 26 }}>{c.schematic}</div><Panel theme={theme}><div style={{ display: 'flex', gap: 60 }}>{[[c.routes,c.routesLabel],[c.length,c.lengthLabel]].map(([n,l]) => <div key={n}><div style={{ fontSize: 106, color: theme.accent, fontWeight: 800, letterSpacing: -5 }}>{n}</div><div style={{ fontSize: 22, fontWeight: 700 }}>{l}</div></div>)}</div><div style={{ fontSize: 25, lineHeight: 1.5, color: theme.muted, whiteSpace: 'pre-line', marginTop: 25 }}>{c.note}</div></Panel><Reveal from={at(scene, 'Vinhomes')} style={{ fontSize: 28, marginTop: 30, color: theme.teal, fontWeight: 700 }}>{c.contractor}</Reveal></>;
};
