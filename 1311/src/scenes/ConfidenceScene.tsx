import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { Title, Pill, Panel, Item } from '../components/UI';
import { Beats } from '../components/ProductionUI';
import { Chip, Icon } from '../components/AiGraphics';
export const ConfidenceScene:FC<SceneProps>=({theme,copy,production})=>{
 const c=copy.confidence;
 return <Beats seconds={production.shotSeconds}>{[
  <div key="question"><Title size={70}>{c.question}</Title><div style={{marginTop:45}}><Icon name="people" color={theme.accent} size={210}/></div></div>,
  <div key="roles"><Pill theme={theme}>{c.name}</Pill><div style={{height:30}}/><Title>{c.title}</Title>{c.roles.map((title,i)=><Item key={title} theme={theme} title={title} number={`0${i+1}`}/>)}</div>,
  <div key="chip"><Title>{c.ai}</Title><Chip theme={theme} label="AI"/><Panel theme={theme} style={{fontSize:37,fontWeight:700,lineHeight:1.4}}>{c.roles[1]}</Panel></div>,
  <div key="chain"><Title size={62}>{c.tag}</Title>{c.chain.map((label,i)=><div key={label}><Panel theme={theme} style={{padding:22,fontSize:32,fontWeight:700,color:i===2?theme.teal:theme.text}}>{label}</Panel>{i<3&&<div style={{height:30,fontSize:27,textAlign:'center',color:theme.accent}}>↓</div>}</div>)}</div>,
 ]}</Beats>;
};
