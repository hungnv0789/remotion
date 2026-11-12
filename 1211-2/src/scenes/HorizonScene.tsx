import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { Title, Panel, Reveal } from '../components/UI';
export const HorizonScene: FC<SceneProps> = ({theme,copy}) => {
  const c=copy.horizon;
  return <><Title>{c.title}</Title><div style={{display:'flex',gap:20,marginTop:45}}>{c.milestones.map((value,i)=><Reveal key={value} from={i*15} style={{flex:1}}><Panel theme={theme} style={{padding:'35px 18px',textAlign:'center'}}><div style={{fontSize:i===2?64:92,fontWeight:800,color:theme.accent,letterSpacing:-4}}>{value}</div><div style={{fontSize:25,color:theme.muted,marginTop:18}}>{c.unit}</div></Panel></Reveal>)}</div><div style={{fontSize:27,fontWeight:700,color:theme.teal,marginTop:50,lineHeight:1.5}}>{c.note}</div></>;
};
