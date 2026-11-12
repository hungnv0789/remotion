import type { FC } from 'react';
import { Img, useCurrentFrame, useVideoConfig } from 'remotion';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { Title, Pill, Panel, Phase, mediaSource } from '../components/UI';
import { Beats, Counter } from '../components/ProductionUI';
import { Exchange, Icon } from '../components/FinanceGraphics';
export const NewsScene:FC<SceneProps>=({theme,copy,scenario,photo,production,scene})=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const c=copy.news;
 const rate=at(scene,'với tỷ giá');const schedule=at(scene,'Hoạt động');const eligible=at(scene,'dành cho');
 const picture=<div style={{borderRadius:25,overflow:'hidden',background:'white'}}><Img src={mediaSource(photo.src)} style={{width:'100%',height:440,objectFit:'cover',objectPosition:'center 20%',display:'block'}}/><div style={{fontSize:17,color:theme.muted,padding:'15px 18px'}}>{photo.credit}</div></div>;
 return <><Phase from={0} to={rate}><Beats seconds={production.shotSeconds}>{[
  <div key="photo"><Title size={65}>{c.title}</Title>{picture}</div>,
  <div key="date"><Pill theme={theme}>{c.dateLabel}</Pill><div style={{fontSize:83,fontWeight:800,color:theme.accent,margin:'30px 0 40px'}}>{c.date}</div>{picture}</div>,
 ]}</Beats></Phase><Phase from={rate} to={schedule}><Title size={64}>{c.institution}</Title><Counter value={scenario.rate} label={copy.currency.rateUnit} theme={theme} from={rate}/><Exchange theme={theme} usd={copy.currency.usd} vnd={copy.currency.vnd}/><div style={{fontSize:29,color:theme.teal,fontWeight:700}}>{c.exchange}</div></Phase><Phase from={schedule} to={eligible}><Title>{c.calendar}</Title><div style={{display:'flex',gap:25,marginTop:45}}>{c.days.map((day,i)=><Panel key={day} theme={theme} style={{flex:1,borderColor:Math.floor((f-schedule)/(fps*.9))%2===i?theme.accent:theme.border,textAlign:'center'}}><div style={{fontSize:47,fontWeight:800,color:theme.accent}}>{day}</div></Panel>)}</div><Exchange theme={theme} usd={copy.currency.usd} vnd={copy.currency.vnd}/></Phase><Phase from={eligible}><Pill theme={theme}>{c.rule}</Pill><div style={{height:35}}/><Title size={60}>{c.condition}</Title><Icon name="bank" color={theme.teal} size={185}/><div style={{marginTop:35}}><Pill theme={theme}>{c.calendar}: {c.days.join(' · ')}</Pill></div></Phase></>;
};
