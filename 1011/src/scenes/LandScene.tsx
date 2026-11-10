import type { FC } from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { Title, Metric, Panel, Phase, Pill, CLAMP } from '../components/UI';
import { Icon } from '../components/Illustrations';
export const LandScene: FC<SceneProps> = ({ theme, copy, scene }) => {
  const frame = useCurrentFrame(); const c = copy.land;
  const change = at(scene, 'ngân sách thu từ đất');
  const progress = interpolate(frame - change, [0, 70], [0, 1], CLAMP);
  return <><Title>{c.title}</Title><Phase from={0} to={change}><Icon name="bank" color={theme.accent} size={140} /><div style={{ height: 35 }} /><Metric theme={theme} value={c.year} label={c.yearLabel} from={at(scene, '1994')} /><Panel theme={theme} style={{ marginTop: 40 }}><div style={{ fontSize: 34, fontWeight: 700 }}>{c.first}</div><div style={{ color: theme.muted, fontSize: 27, marginTop: 20 }}>{c.arrow}</div></Panel></Phase><Phase from={change}><Pill theme={theme}>{c.graphTitle}</Pill><svg viewBox="0 0 880 450" style={{ width: '100%', height: 450, marginTop: 25 }}><path d="M55 30v360h760" fill="none" stroke={theme.border} strokeWidth="4" />{[100,190,280].map(y=><path key={y} d={`M55 ${y}h760`} stroke={theme.border} strokeWidth="2" />)}<path d="M80 350L250 310 420 245 600 180 790 70" stroke={theme.accent} fill="none" strokeWidth="14" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1-progress} /><circle cx={80+710*progress} cy={350-280*progress} r="11" fill={theme.teal} /></svg><div style={{ color: theme.muted, fontSize: 23 }}>{c.graphNote}</div><div style={{ fontSize: 45, fontWeight: 800, whiteSpace: 'pre-line', lineHeight: 1.4, marginTop: 36 }}>{c.takeaway}</div></Phase></>;
};
