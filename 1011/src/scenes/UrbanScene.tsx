import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { Title, Metric, Pill, Phase } from '../components/UI';
import { Icon, Flow } from '../components/Illustrations';
export const UrbanScene: FC<SceneProps> = ({ theme, copy, scene }) => {
  const c = copy.urban; const change = at(scene, 'Bốn,');
  return <><Phase from={0} to={change}><Pill theme={theme}>{c.tag}</Pill><div style={{ height: 28 }} /><Title>{c.title}</Title><Icon name="people" color={theme.teal} size={115} /><div style={{ height: 25 }} /><Metric theme={theme} value={c.rate} label={c.rateLabel} from={at(scene,'50%')} /><div style={{ height: 35 }} /><Metric theme={theme} value={c.population} label={c.populationLabel} from={at(scene,'215')} /></Phase><Phase from={change}><Pill theme={theme}>{c.fdiTag}</Pill><div style={{ height: 28 }} /><Title>{c.fdiTitle}</Title><Metric theme={theme} value={c.fdi} label={c.fdiLabel} /><div style={{ height: 35 }} /><Flow theme={theme} active={2} items={c.channels.map((label,i)=>({ label, icon: (['rail','people','factory'] as const)[i] }))} /></Phase></>;
};
