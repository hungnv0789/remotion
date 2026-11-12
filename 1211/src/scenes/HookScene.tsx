import type { FC } from 'react';
import { useCurrentFrame } from 'remotion';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { numberVi } from '../finance';
import { Title, Panel, Pill } from '../components/UI';
import { Icon } from '../components/SavingsIllustrations';
export const HookScene: FC<SceneProps> = ({theme,copy,finance,scene}) => {
  const frame=useCurrentFrame(); const c=copy.hook;
  const late=frame>=at(scene,'Có 1 tỷ trong tay');
  return <><Title>{late?c.question:c.title}</Title><div style={{display:'flex',gap:24,marginTop:30}}>{[finance.largeBankRate,finance.smallBankRate].map((rate,i)=><Panel key={i} theme={theme} style={{flex:1,padding:26,borderColor:i?theme.teal:theme.accent}}><Icon name="bank" color={i?theme.teal:theme.accent} size={105} /><div style={{fontSize:23,fontWeight:700,lineHeight:1.4,marginTop:24}}>{i?c.second:c.first}</div><div style={{fontSize:91,fontWeight:800,color:i?theme.teal:theme.accent,letterSpacing:-4,marginTop:24}}>{numberVi(rate)}%</div><div style={{fontSize:22,color:theme.muted,marginTop:8}}>{copy.units.annual.replace('% / ','/ ')}</div></Panel>)}</div><div style={{marginTop:38}}><Pill theme={theme}>{c.gift}</Pill></div></>;
};
