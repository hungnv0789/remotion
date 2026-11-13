import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { Title, Panel, Pill } from '../components/UI';
import { Beats } from '../components/ProductionUI';
import { DownChart, Icon } from '../components/AiGraphics';
export const LessonScene:FC<SceneProps>=({theme,copy,production})=>{
 const c=copy.lesson;
 return <Beats seconds={production.shotSeconds}>{[
  <div key="price"><Title size={65}>{c.title}</Title><Panel theme={theme}><div style={{fontSize:38,fontWeight:800,color:theme.accent,textAlign:'center'}}>{c.price}</div></Panel><div style={{display:'flex',gap:22,marginTop:25}}>{[c.fundamentals,c.expectations].map((list,i)=><Panel key={i} theme={theme} style={{flex:1}}>{list.map(text=><div key={text} style={{fontSize:32,lineHeight:1.7,fontWeight:700,color:i?theme.teal:theme.text}}>{text}</div>)}</Panel>)}</div></div>,
  <div key="future"><Title size={84}>{c.future}</Title><Icon name="chart" color={theme.accent} size={220}/><div style={{marginTop:45}}><Pill theme={theme}>{c.tag}</Pill></div></div>,
  <div key="risk"><Title size={66}>{c.statement}</Title><DownChart theme={theme}/><div style={{fontSize:18,color:theme.muted,marginTop:20}}>{copy.chartNote}</div></div>,
 ]}</Beats>;
};
