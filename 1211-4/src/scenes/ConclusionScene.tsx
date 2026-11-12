import type { FC } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { Title, Phase, Pill, Panel } from '../components/UI';
import { Beats, shotIndex } from '../components/ProductionUI';
import { Icon } from '../components/FinanceGraphics';
export const ConclusionScene:FC<SceneProps>=({theme,copy,production,scene})=>{
 const frame=useCurrentFrame();const {fps}=useVideoConfig();const c=copy.conclusion;const watch=at(scene,'Hãy theo dõi');const positive=at(scene,'Đây có thể');const cta=at(scene,'Bạn nghĩ');
 const focus=shotIndex(frame,fps,production.shotSeconds,watch)%c.indicators.length;
 return <><Phase from={0} to={watch}><Title size={70}>{c.warning}</Title><div style={{marginTop:45}}><Icon name="chart" color={theme.danger} size={220}/></div></Phase><Phase from={watch} to={positive}><Beats seconds={Math.max(2,Math.min(production.shotSeconds,(positive-watch)/fps/4))} from={watch}>{c.indicators.map((label,i)=><div key={label}><Pill theme={theme}>0{i+1} / {c.end}</Pill><div style={{height:35}}/><Title size={72}>{label}</Title><Icon name={(['bank','chart','factory','wallet'] as const)[i]} color={theme.teal} size={185}/><div style={{marginTop:40,display:'flex',flexDirection:'column',gap:15}}>{c.indicators.map((text,n)=><div key={text} style={{fontSize:24,color:n===focus?theme.accent:theme.muted,fontWeight:n===focus?800:500}}>{n+1}. {text}</div>)}</div></div>)}</Beats></Phase><Phase from={positive} to={cta}><Beats seconds={production.shotSeconds} from={positive}>{[
 <div key="positive"><Title size={68}>{c.positive}</Title><div style={{marginTop:45}}><Icon name="bank" color={theme.teal} size={220}/></div></div>,
 <div key="flow"><Title size={90}>{c.question}</Title><div style={{display:'flex',gap:30,marginTop:50}}><Icon name="bank" color={theme.accent} size={175}/><Icon name="wallet" color={theme.teal} size={175}/><Icon name="chart" color={theme.accent} size={175}/></div></div>,
 ]}</Beats></Phase><Phase from={cta}><Beats seconds={production.shotSeconds} from={cta}>{[
 <div key="question"><Title size={64}>{c.ctaQuestion}</Title><div style={{display:'flex',flexWrap:'wrap',gap:16,marginTop:40}}>{c.options.map(label=><Pill key={label} theme={theme}>{label}</Pill>)}</div><div style={{fontSize:28,fontWeight:800,color:theme.accent,marginTop:55}}>{c.cta}</div></div>,
 <div key="end"><Title size={89}>{c.question}</Title><Panel theme={theme}><div style={{fontSize:37,fontWeight:700,lineHeight:1.4}}>{c.ctaQuestion.replace('\n',' ')}</div></Panel><div style={{fontSize:28,fontWeight:800,color:theme.accent,marginTop:45}}>{c.cta}</div></div>,
 ]}</Beats></Phase></>;
};
