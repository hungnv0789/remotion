import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { Title, Phase, Item, Pill } from '../components/UI';
import { Beats } from '../components/ProductionUI';
import { Chip, Icon } from '../components/AiGraphics';
export const ClosingScene:FC<SceneProps>=({theme,copy,production,scene})=>{
 const c=copy.closing;const checks=at(scene,'Hãy nhìn cả');const cta=at(scene,'Bạn nghĩ');
 return <><Phase from={0} to={checks}><Title>{c.title}</Title><Icon name="shield" color={theme.accent} size={220}/></Phase><Phase from={checks} to={cta}><Beats seconds={production.shotSeconds} from={checks}>{[
  <div key="checks"><Title>{c.final}</Title>{c.checks.map((title,i)=><Item key={title} theme={theme} number={`0${i+1}`} title={title}/>)}</div>,
  <div key="future"><Title>{c.final}</Title><Icon name="network" color={theme.teal} size={210}/><div style={{display:'flex',gap:15,flexWrap:'wrap',marginTop:45}}>{c.checks.map(label=><Pill key={label} theme={theme}>{label}</Pill>)}</div></div>,
 ]}</Beats></Phase><Phase from={cta}><Beats seconds={production.shotSeconds} from={cta}>{[
  <div key="cta"><Pill theme={theme}>{c.tag}</Pill><div style={{height:35}}/><Title size={70}>{c.question}</Title><Chip theme={theme} label="AI"/><div style={{fontSize:27,fontWeight:800,color:theme.accent,marginTop:35}}>{c.cta}</div></div>,
  <div key="end"><Title size={83}>{c.final}</Title><Icon name="chip" color={theme.accent} size={215}/><div style={{fontSize:38,fontWeight:700,lineHeight:1.5,whiteSpace:'pre-line',marginTop:35}}>{c.question}</div><div style={{fontSize:27,fontWeight:800,color:theme.accent,marginTop:40}}>{c.cta}</div></div>,
 ]}</Beats></Phase></>;
};
