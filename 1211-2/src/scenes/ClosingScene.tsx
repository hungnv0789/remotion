import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { Title, Phase } from '../components/UI';
import { Accumulation } from '../components/BehaviorIllustrations';
export const ClosingScene: FC<SceneProps> = ({theme,copy,scene}) => {
  const c=copy.closing; const change=at(scene,'Vì vậy');
  return <><Phase from={0} to={change}><Title>{c.title}</Title></Phase><Phase from={change}><Title size={82}>{c.final}</Title></Phase><Accumulation theme={theme} /><div style={{fontSize:26,fontWeight:700,color:theme.teal,marginTop:40,lineHeight:1.5}}>{c.note}</div></>;
};
