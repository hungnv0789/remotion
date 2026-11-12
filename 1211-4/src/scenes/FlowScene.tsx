import type { FC } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { Title, Phase, Pill, Panel, Item } from '../components/UI';
import { Counter, Beats, shotIndex } from '../components/ProductionUI';
import { FlowDiagram, Icon } from '../components/FinanceGraphics';
import { vndFromUsdBillions, numberVi } from '../finance';
export const FlowScene:FC<SceneProps>=({theme,copy,scenario,production,scene})=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const c=copy.flow;const support=at(scene,'Lượng tiền này');const condition=at(scene,'Nếu dòng tiền');const amount=vndFromUsdBillions(scenario.assumedUsdBillions,scenario.rate).vndBillions;
 const labels={central:c.centralBank,banks:c.commercialBanks,branches:c.branches};
 return <><Phase from={0} to={support}><Beats seconds={production.shotSeconds}>{[
  <div key="amount"><Pill theme={theme}>{c.assumption}</Pill><div style={{height:35}}/><Title>{c.title}</Title><Counter value={amount} label={copy.currency.vndUnit} theme={theme} from={at(scene,'khi NHNN')}/><div style={{fontSize:26,color:theme.muted,marginTop:30}}>{c.valueLabel}</div></div>,
  <div key="conversion"><Pill theme={theme}>{c.assumption}</Pill><div style={{height:35}}/><Counter value={amount} label={copy.currency.vndUnit} theme={theme} from={at(scene,'khi NHNN')}/><Panel theme={theme} style={{marginTop:45}}><div style={{fontSize:42,fontWeight:800}}>{scenario.assumedUsdBillions} {copy.currency.usdUnit} × {numberVi(scenario.rate)}</div><div style={{fontSize:29,color:theme.muted,marginTop:25}}>{c.commercialBanks}</div></Panel></div>,
 ]}</Beats></Phase><Phase from={support} to={condition}><Beats seconds={production.shotSeconds} from={support}>{[
  <div key="diagram"><Title size={59}>{c.supportTitle}</Title><FlowDiagram theme={theme} labels={labels} amount={`${numberVi(amount)} ${copy.currency.vndUnit}`} focus={1+shotIndex(f,fps,production.shotSeconds,support)%4} note={c.diagramNote} assumption={c.assumption}/></div>,
  <div key="support"><Title>{c.supportTitle}</Title>{c.effects.map((title,i)=><Item key={title} theme={theme} title={title} number={`0${i+1}`} />)}<div style={{fontSize:21,lineHeight:1.5,color:theme.muted,whiteSpace:'pre-line',marginTop:30}}>{c.diagramNote}</div></div>,
 ]}</Beats></Phase><Phase from={condition}><Beats seconds={production.shotSeconds} from={condition}>{[
  <div key="condition"><Pill theme={theme}>{c.conditional.replace('\n',' ')}</Pill><div style={{height:35}}/><Title>{c.conditionalTitle}</Title><div style={{display:'flex',gap:30,marginTop:45}}>{['bank','factory','wallet'].map(icon=><Icon key={icon} name={icon as 'bank'|'factory'|'wallet'} color={theme.teal} size={170}/>)}</div></div>,
  <div key="diagram2"><Title size={60}>{c.conditionalTitle}</Title><FlowDiagram theme={theme} labels={labels} amount={`${numberVi(amount)} ${copy.currency.vndUnit}`} focus={2+shotIndex(f,fps,production.shotSeconds,condition)%3} note={c.diagramNote} assumption={c.assumption}/></div>,
 ]}</Beats></Phase></>;
};
