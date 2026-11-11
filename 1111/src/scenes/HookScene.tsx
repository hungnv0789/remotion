import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { Phase, Pill, Title, Metric } from '../components/UI';
import { MarketChart, Capitol } from '../components/MarketIllustrations';
export const HookScene: FC<SceneProps> = ({ theme, copy, scene }) => {
  const c=copy.hook; const change=at(scene,'Rốt cuộc');
  return <><Phase from={0} to={change}><Title>{c.title}</Title><Metric theme={theme} value={c.value} label={c.unit} /><MarketChart theme={theme} /><div style={{fontSize:17,color:theme.muted,marginTop:15}}>{copy.illustration}</div><div style={{marginTop:28}}><Pill theme={theme}>{c.tag}</Pill></div></Phase><Phase from={change}><Title size={80}>{c.question}</Title><Capitol theme={theme} /><div style={{fontSize:32,color:theme.accent,fontWeight:800,marginTop:40}}>{c.link}</div></Phase></>;
};
