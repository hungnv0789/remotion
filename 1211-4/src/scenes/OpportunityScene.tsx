import type { FC } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { Title, Pill, Panel } from '../components/UI';
import { shotIndex } from '../components/ProductionUI';
import { Icon, type IconName } from '../components/FinanceGraphics';
export const OpportunityScene:FC<SceneProps>=({theme,copy,production,scene})=>{
 const frame=useCurrentFrame();const {fps}=useVideoConfig();const c=copy.opportunity;
 const starts=['Đầu tiên','Thứ hai','Thứ ba','Cuối cùng'].map(phrase=>at(scene,phrase));
 const active=Math.max(0,starts.map(start=>frame>=start).lastIndexOf(true));const sector=c.sectors[active];const beat=shotIndex(frame,fps,production.shotSeconds,starts[active])%3;
 const tickerOffset=(frame*2)%1600;
 return <><div style={{display:'flex',gap:13,marginBottom:30}}>{c.sectors.map((s,i)=><div key={s.name} style={{height:6,flex:1,borderRadius:6,background:i===active?theme.accent:theme.border}}/>)}</div>{frame<starts[0]?<><Title>{c.title}</Title><div style={{display:'flex',gap:25,marginTop:40}}>{c.sectors.map(s=><Icon key={s.name} name={s.icon as IconName} color={theme.teal} size={145}/>)}</div></>:beat===0?<><Pill theme={theme}>0{active+1} / {sector.tag}</Pill><div style={{height:35}}/><Title size={active>=2?72:85}>{sector.name}</Title><div style={{margin:'40px 0'}}><Icon name={sector.icon as IconName} color={theme.accent} size={220}/></div><div style={{fontSize:35,fontWeight:700,color:theme.teal,lineHeight:1.4}}>{sector.factor}</div></>:beat===1?<><Pill theme={theme}>{sector.name.replace('\n',' ')}</Pill><div style={{height:35}}/><Title size={67}>{sector.factor}</Title><Panel theme={theme} style={{borderColor:theme.teal,boxShadow:`0 0 40px ${theme.teal}15`,padding:35}}><Icon name={sector.icon as IconName} color={theme.teal} size={135}/><div style={{fontSize:35,fontWeight:700,lineHeight:1.45,marginTop:28}}>{sector.condition}</div></Panel></>:<><Title size={72}>{sector.name}</Title><Panel theme={theme} style={{borderLeft:`7px solid ${theme.teal}`}}><div style={{fontSize:34,lineHeight:1.5,fontWeight:700}}>{sector.condition}</div></Panel><div style={{marginTop:40}}><Pill theme={theme}>{sector.tag}</Pill></div><div style={{marginTop:35}}><Icon name={sector.icon as IconName} color={theme.teal} size={150}/></div></>}
 <div style={{overflow:'hidden',marginTop:40,padding:'17px 0',borderTop:`2px solid ${theme.border}`,borderBottom:`2px solid ${theme.border}`,fontSize:22,fontWeight:800,color:theme.accent,whiteSpace:'nowrap'}}><div style={{transform:`translateX(${-tickerOffset}px)`,width:4800}}>{c.ticker.repeat(4)}</div></div></>;
};
