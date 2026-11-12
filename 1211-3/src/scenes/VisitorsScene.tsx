import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { Title, Phase, Metric, Panel, Reveal } from '../components/UI';
import { Icon } from '../components/BusinessIllustrations';
export const VisitorsScene: FC<SceneProps> = ({theme,copy,scene}) => {
  const c=copy.visitors;const daily=at(scene,'trung bình');
  return <><Phase from={0} to={daily}><Title>{c.title}</Title><Icon name="people" color={theme.accent} size={135} /><div style={{marginTop:35}}><Metric theme={theme} value={c.clients} label={c.clientsUnit} from={at(scene,'171,1')} /></div><Reveal from={at(scene,'cộng thêm')} style={{marginTop:35}}><Panel theme={theme} style={{display:'flex',gap:25,alignItems:'center'}}><Icon name="car" color={theme.teal} size={100} /><div><div style={{fontSize:65,fontWeight:800,color:theme.teal}}>{c.vehicles}</div><div style={{fontSize:23,color:theme.muted,marginTop:12}}>{c.vehiclesUnit}</div></div></Panel></Reveal></Phase><Phase from={daily}><Title>{c.dailyTitle}</Title><Icon name="people" color={theme.teal} size={150} /><div style={{marginTop:40}}><Metric theme={theme} value={c.daily} label={c.dailyUnit} /></div></Phase></>;
};
