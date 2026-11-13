import type { FC } from 'react';
import { useCurrentFrame } from 'remotion';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { Title, Pill, Panel, Phase } from '../components/UI';
import { Beats, Photo } from '../components/ProductionUI';
import { Icon } from '../components/AiGraphics';
export const LeadershipScene:FC<SceneProps>=({theme,copy,assets,photo,production,scene})=>{
 const c=copy.leadership;const interim=at(scene,'Người thay thế');const frame=useCurrentFrame();
 return <><Phase from={0} to={interim}><Beats seconds={production.shotSeconds}>{[
  <div key="portrait"><Pill theme={theme}>{c.dateLabel}: {c.date}</Pill><div style={{height:28}}/><Title size={68}>{c.title}</Title><Photo assets={assets} id={photo.jensen} credit={photo.jensenCredit} height={450} theme={theme}/><div style={{fontSize:38,fontWeight:800,marginTop:25}}>{c.founder}</div></div>,
  <div key="leadership"><Title>{c.founder}</Title><Photo assets={assets} id={photo.jensen} credit={photo.jensenCredit} height={500} theme={theme}/><div style={{marginTop:30}}><Pill theme={theme}>{c.founderRole}</Pill></div></div>,
  <div key="date"><Pill theme={theme}>{c.founderRole}</Pill><div style={{fontSize:125,fontWeight:800,color:theme.accent,margin:'35px 0'}}>{c.date}</div><Title size={80}>{c.event}</Title><Panel theme={theme}><div style={{fontSize:40,fontWeight:700}}>{c.founder}</div></Panel></div>,
 ]}</Beats></Phase><Phase from={interim}><Beats seconds={production.shotSeconds} from={interim}>{[
  <div key="interim"><Title>{c.interimTitle}</Title><Icon name="people" color={theme.teal} size={180}/><Panel theme={theme} style={{marginTop:35}}><div style={{fontSize:62,fontWeight:800,color:theme.accent}}>{c.interim}</div><div style={{fontSize:24,color:theme.muted,marginTop:20}}>{c.interimRole}</div></Panel><div style={{marginTop:32}}><Pill theme={theme}>{c.transition}</Pill></div></div>,
  <div key="transition"><Pill theme={theme}>{c.focus}</Pill><div style={{height:35}}/><Title size={78}>{c.interim}</Title><div style={{fontSize:42,fontWeight:700,color:theme.teal,marginTop:35}}>{c.transition}</div><div style={{marginTop:45}}><Icon name="people" color={theme.accent} size={200}/></div></div>,
 ]}</Beats></Phase></>;
};
