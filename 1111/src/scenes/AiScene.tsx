import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { Title, Pill, Phase, Panel, Reveal } from '../components/UI';
import { ServerRacks, SymbolIcon } from '../components/MarketIllustrations';
export const AiScene: FC<SceneProps> = ({theme,copy,scene}) => {
  const c=copy.ai; const change=at(scene,'Và người dân');
  return <><Phase from={0} to={change}><Pill theme={theme}>{c.tag}</Pill><div style={{height:30}} /><Title>{c.title}</Title><ServerRacks theme={theme} /><div style={{fontSize:24,color:theme.muted,marginTop:15}}>{c.label}</div><Reveal from={at(scene,'ngốn điện')} style={{marginTop:35}}><Panel theme={theme} style={{display:'flex',gap:25,alignItems:'center'}}><SymbolIcon name="bolt" color={theme.teal} size={90} /><div style={{fontSize:37,fontWeight:800,color:theme.teal}}>{c.demand}</div></Panel></Reveal></Phase><Phase from={change}><Title>{c.concern}</Title><div style={{display:'flex',gap:25,marginTop:45}}>{[c.people,c.technology].map((label,i)=><Panel key={label} theme={theme} style={{flex:1,textAlign:'center'}}><SymbolIcon name={i?'chip':'people'} color={i?theme.accent:theme.teal} size={120} /><div style={{fontSize:31,lineHeight:1.5,fontWeight:700,marginTop:25}}>{label}</div></Panel>)}</div><div style={{fontSize:19,color:theme.muted,marginTop:40}}>{c.note}</div></Phase></>;
};
