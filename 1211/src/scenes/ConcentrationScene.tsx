import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { million } from '../finance';
import { Title, Pill, Phase, Metric, Panel } from '../components/UI';
import { Icon, BankVault } from '../components/SavingsIllustrations';
export const ConcentrationScene: FC<SceneProps> = ({theme,copy,finance,scene}) => {
  const c=copy.concentration; const change=at(scene,'Việc dồn');
  return <><Pill theme={theme}>{c.tag}</Pill><div style={{height:28}} /><Phase from={0} to={change}><Title>{c.title}</Title><div style={{display:'flex',gap:35,alignItems:'center'}}><Icon name="shield" color={theme.accent} size={140} /><div style={{fontSize:25,color:theme.muted,fontWeight:700}}>{c.date}</div></div><div style={{marginTop:35}}><Metric theme={theme} value={million(finance.insuranceLimit)} label={copy.units.million} /></div><Panel theme={theme} style={{marginTop:30}}><div style={{fontSize:22,color:theme.muted}}>{c.limitLabel}</div><div style={{fontSize:29,fontWeight:700,marginTop:16}}>{c.scope}</div><div style={{fontSize:25,color:theme.muted,marginTop:15}}>{c.includes}</div></Panel></Phase><Phase from={change}><Title>{c.question}</Title><BankVault theme={theme} /><Panel theme={theme} style={{marginTop:28}}><div style={{fontSize:35,fontWeight:700}}>{c.oneBank}</div><div style={{fontSize:27,color:theme.muted,marginTop:20}}>{c.takeaway}</div></Panel></Phase></>;
};
