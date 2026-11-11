import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { Title, Panel, Reveal, Pill } from '../components/UI';
import { SymbolIcon } from '../components/MarketIllustrations';
export const CommonScene: FC<SceneProps> = ({theme,copy,scene}) => {
  const c=copy.common;
  return <><Title>{c.title}</Title><div style={{display:'flex',gap:23,marginTop:30}}>{[c.banks,c.tech].map((label,i)=><Panel key={label} theme={theme} style={{flex:1,textAlign:'center'}}><SymbolIcon name={i?'chip':'bank'} color={i?theme.teal:theme.accent} size={130} /><div style={{fontSize:31,fontWeight:700,lineHeight:1.4,marginTop:23}}>{label}</div></Panel>)}</div><Reveal from={at(scene,'Thế nhưng')} style={{marginTop:38}}><Pill theme={theme}>{c.center}</Pill><div style={{fontSize:44,lineHeight:1.4,fontWeight:800,whiteSpace:'pre-line',marginTop:28}}>{c.message}</div></Reveal></>;
};
