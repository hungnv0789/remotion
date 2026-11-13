import type { FC } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { Title, Pill, Panel } from '../components/UI';
import { shotIndex } from '../components/ProductionUI';
import { Icon, type IconName } from '../components/AiGraphics';
export const QuestionsScene:FC<SceneProps>=({theme,copy,production,scene})=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const c=copy.questions;const starts=['Thứ nhất','Thứ hai','Và thứ ba'].map(s=>at(scene,s));const active=Math.max(0,starts.map(s=>f>=s).lastIndexOf(true));const item=c.cards[active];const beat=shotIndex(f,fps,production.shotSeconds,starts[active])%2;
 return <><div style={{display:'flex',gap:15,marginBottom:35}}>{c.cards.map((_,i)=><div key={i} style={{height:6,flex:1,borderRadius:8,background:i===active?theme.accent:theme.border}}/>)}</div>{f<starts[0]?<><Title>{c.title}</Title>{c.cards.map((q,i)=><Panel key={q.title} theme={theme} style={{fontSize:29,fontWeight:700,marginTop:20}}>0{i+1}. {q.title}</Panel>)}</>:beat===0?<><Pill theme={theme}>0{active+1} / 03</Pill><div style={{height:35}}/><Title size={81}>{item.title}</Title><Icon name={item.icon as IconName} color={theme.accent} size={215}/><div style={{fontSize:34,fontWeight:700,lineHeight:1.5,marginTop:35}}>{item.detail}</div></>:<><Pill theme={theme}>{c.tag}</Pill><div style={{height:35}}/><Title size={74}>{item.title}</Title><Panel theme={theme} style={{borderColor:theme.teal}}><Icon name={item.icon as IconName} color={theme.teal} size={145}/><div style={{fontSize:37,lineHeight:1.45,fontWeight:700,marginTop:30}}>{item.detail}</div></Panel></>}</>;
};
