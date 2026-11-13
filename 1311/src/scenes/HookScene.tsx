import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { Title, Pill } from '../components/UI';
import { Beats } from '../components/ProductionUI';
import { Chip, DownChart, Icon } from '../components/AiGraphics';
export const HookScene:FC<SceneProps>=({theme,copy,production})=>{
 const c=copy.hook;
 return <Beats seconds={production.shotSeconds}>{[
  <div key="headline"><Pill theme={theme}>{c.label}</Pill><div style={{height:35}}/><Title size={70}>{c.title}</Title><div style={{marginTop:40}}><Icon name="people" color={theme.accent} size={205}/></div></div>,
  <div key="question"><Title size={80}>{c.question}</Title><DownChart theme={theme}/><div style={{fontSize:17,color:theme.muted,marginTop:20}}>{copy.chartNote}</div></div>,
  <div key="nvidia"><Title size={102}>{c.company}</Title><Chip theme={theme} label="AI"/><div style={{marginTop:35}}><Pill theme={theme}>{c.ai}</Pill></div></div>,
  <div key="trust"><Title size={84}>{c.market}</Title><DownChart theme={theme}/><Pill theme={theme}>{c.label}</Pill></div>,
 ]}</Beats>;
};
