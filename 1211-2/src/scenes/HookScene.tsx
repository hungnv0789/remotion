import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { Title, Phase, Panel, Metric, Pill } from '../components/UI';
import { Icon } from '../components/BehaviorIllustrations';
export const HookScene: FC<SceneProps> = ({theme,copy,scene}) => {
  const c=copy.hook; const money=at(scene,'Có 5 triệu'); const compare=at(scene,'họ đã nhìn');
  return <><Phase from={0} to={money}><Title>{c.title}</Title><div style={{display:'flex',gap:25,marginTop:40}}>{c.labels.map((label,i)=><Panel key={label} theme={theme} style={{flex:1,textAlign:'center'}}><Icon name={i?'bag':'home'} color={i?theme.teal:theme.accent} size={140} /><div style={{fontSize:32,fontWeight:700,lineHeight:1.5,marginTop:25}}>{label}</div></Panel>)}</div></Phase><Phase from={money} to={compare}><Title>{c.patience}</Title><Metric theme={theme} value={c.amount} label={c.unit} /><div style={{marginTop:45}}><Icon name="coin" color={theme.teal} size={160} /></div></Phase><Phase from={compare}><Title>{c.comparison}</Title><Icon name="clock" color={theme.accent} size={210} /><div style={{marginTop:40}}><Pill theme={theme}>{c.note}</Pill></div></Phase></>;
};
