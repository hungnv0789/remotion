import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { Title, Metric, Pill, Phase } from '../components/UI';
import { Flow, Cityscape } from '../components/Illustrations';
export const VietnamScene: FC<SceneProps> = ({ theme, copy, scene }) => {
  const c = copy.vietnam; const policy = at(scene,'Sau khi'); const build = at(scene,'Cải cách thuế');
  return <><Phase from={0} to={policy}><Title>{c.title}</Title><Cityscape theme={theme} infrastructure /><div style={{ marginTop: 40 }}><Metric theme={theme} value={c.year} label={c.yearLabel} from={at(scene,'2025')} /></div></Phase><Phase from={policy} to={build}><Title>{c.policyTitle}</Title><Flow theme={theme} active={2} items={c.policies.map((label,i)=>({ label, icon: (['city','bank','rail'] as const)[i] }))} /><div style={{ marginTop: 36 }}><Pill theme={theme}>{c.corridor}</Pill></div></Phase><Phase from={build}><Title>{c.buildTitle}</Title><Flow theme={theme} active={2} items={c.projects.map((label,i)=>({ label, icon: (['plane','port','factory'] as const)[i] }))} /><div style={{ marginTop: 36 }}><Pill theme={theme}>{c.corridor}</Pill></div></Phase></>;
};
