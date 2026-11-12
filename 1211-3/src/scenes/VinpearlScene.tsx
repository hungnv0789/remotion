import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { Title, Metric, Pill, Reveal } from '../components/UI';
import { Building } from '../components/BusinessIllustrations';
export const VinpearlScene: FC<SceneProps> = ({theme,copy,scene}) => {
  const c=copy.vinpearl;
  return <><Title>{c.title}</Title><Building theme={theme} kind="hotel" /><div style={{marginTop:25}}><Pill theme={theme}>{c.period}</Pill></div><div style={{marginTop:25}}><Metric theme={theme} value={c.profit} label={c.profitUnit} from={at(scene,'hơn 2.800')} /></div><Reveal from={at(scene,'6,6')} style={{display:'flex',gap:20,alignItems:'center',marginTop:32}}><Pill theme={theme}>↑ {c.growth}</Pill><span style={{fontSize:22,color:theme.muted}}>{c.growthLabel}</span></Reveal><div style={{fontSize:26,color:theme.teal,marginTop:28,fontWeight:700}}>{c.note}</div></>;
};
