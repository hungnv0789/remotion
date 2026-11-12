import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { Title, Phase, Panel, Metric } from '../components/UI';
import { Icon } from '../components/BusinessIllustrations';
export const HookScene: FC<SceneProps> = ({theme,copy,scene}) => {
  const c=copy.hook;const period=at(scene,'Nhóm Vin');const wider=at(scene,'Và nếu nghĩ');
  return <><Phase from={0} to={period}><Title>{c.title}</Title>{[[c.pearl,c.growth,c.growthUnit],[c.retail,c.profit,c.profitUnit]].map(([label,value,unit],i)=><Panel key={label} theme={theme} style={{marginTop:24}}><div style={{fontSize:25,fontWeight:800,color:i?theme.teal:theme.accent}}>{label}</div><div style={{display:'flex',gap:25,alignItems:'baseline',marginTop:18}}><strong style={{fontSize:105,letterSpacing:-5}}>{value}</strong><span style={{fontSize:24,color:theme.muted}}>{unit}</span></div></Panel>)}</Phase><Phase from={period} to={wider}><Title>{c.title}</Title><Metric theme={theme} value={c.period} label={c.periodUnit} /></Phase><Phase from={wider}><Title size={65}>{c.wideTitle}</Title><div style={{display:'flex',gap:24,marginTop:35}}>{c.sectors.map((label,i)=><Panel key={label} theme={theme} style={{flex:1,textAlign:'center'}}><Icon name={i?'mall':'hotel'} color={i?theme.teal:theme.accent} size={130} /><div style={{fontSize:32,fontWeight:700,lineHeight:1.4,marginTop:25}}>{label}</div></Panel>)}</div></Phase></>;
};
