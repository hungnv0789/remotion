import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { Phase, Pill, Title } from '../components/UI';
import { Cityscape, Flow } from '../components/Illustrations';
export const HookScene: FC<SceneProps> = ({ theme, copy, scene }) => {
  const c = copy.hook;
  const change = at(scene, 'Vì sao');
  return <><Phase from={0} to={change}><Pill theme={theme}>{c.tag}</Pill><div style={{ height: 30 }} /><Title>{c.title}</Title><div style={{ height: 45 }} /><Flow theme={theme} items={c.flow.map((label, i) => ({ label, icon: (['city', 'coin', 'rail'] as const)[i] }))} /></Phase><Phase from={change}><Title size={80}>{c.question}</Title><Cityscape theme={theme} infrastructure /><div style={{ marginTop: 50 }}><Pill theme={theme}>{c.tag}</Pill></div></Phase></>;
};
