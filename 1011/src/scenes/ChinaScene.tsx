import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { Title, Pill, Phase, Metric } from '../components/UI';
import { Cityscape } from '../components/Illustrations';
export const ChinaScene: FC<SceneProps> = ({ theme, copy, scene }) => {
  const c = copy.china;
  const change = at(scene, 'Sau 30 năm');
  return <><Pill theme={theme}>{c.tag}</Pill><div style={{ height: 28 }} /><Title>{c.title}</Title><Cityscape theme={theme} infrastructure /><div style={{ marginTop: 35 }}><Phase from={0} to={change}><Metric theme={theme} value={c.value} label={c.label} from={at(scene, '10%')} /><div style={{ fontSize: 30, fontWeight: 800, marginTop: 28, color: theme.teal }}>{c.period}</div></Phase><Phase from={change}><Metric theme={theme} value={c.rank} label={c.rankLabel} /></Phase></div></>;
};
