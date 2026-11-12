import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { Title, Phase, Panel, Reveal } from '../components/UI';
import { Flow, Icon } from '../components/StockIllustrations';
export const DividendsScene: FC<SceneProps> = ({theme,copy,scene}) => {
  const c=copy.dividends; const forms=at(scene,'Cổ tức thường');
  return <><Phase from={0} to={forms}><Title size={64}>{c.title}</Title><div style={{height:25}} /><Flow theme={theme} active={1} items={c.stages.map((label,i)=>({label,icon:(['company','coin','shares'] as const)[i]}))} /></Phase><Phase from={forms}><Title>{c.formsTitle}</Title><div style={{display:'flex',gap:24,marginTop:35}}>{[c.cash,c.stocks].map((label,i)=><Panel key={label} theme={theme} style={{flex:1,textAlign:'center'}}><Icon name={i?'shares':'coin'} color={i?theme.teal:theme.accent} size={145} /><div style={{fontSize:30,fontWeight:800,marginTop:30,lineHeight:1.5}}>{label}</div></Panel>)}</div><Reveal from={at(scene,'ngay cả khi')} style={{fontSize:40,lineHeight:1.4,fontWeight:700,whiteSpace:'pre-line',marginTop:40}}>{c.note}</Reveal></Phase></>;
};
