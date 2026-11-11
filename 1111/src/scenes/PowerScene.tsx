import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { Title, Phase, Pill } from '../components/UI';
import { Flow, Capitol } from '../components/MarketIllustrations';
export const PowerScene: FC<SceneProps> = ({theme,copy,scene}) => {
  const c=copy.power; const change=at(scene,'thì quá trình');
  return <><Phase from={0} to={change}><Title>{c.title}</Title><Capitol theme={theme} /><Flow theme={theme} active={1} items={c.steps.map((label,i)=>({label,icon:(['people','search','chip'] as const)[i]}))} /></Phase><Phase from={change}><Title>{c.impactTitle}</Title><div style={{height:35}} /><Flow theme={theme} active={2} items={c.impactSteps.map((label,i)=>({label,icon:(['chip','bolt','bank'] as const)[i]}))} /><div style={{marginTop:36}}><Pill theme={theme}>{c.tag}</Pill></div></Phase></>;
};
