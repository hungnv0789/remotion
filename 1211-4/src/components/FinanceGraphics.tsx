import type { FC } from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { CLAMP, type Theme } from './UI';
export type IconName='bank'|'chart'|'home'|'factory'|'wallet'|'people';
export const Icon:FC<{name:IconName;color:string;size?:number}>=({name,color,size=100})=><svg viewBox="0 0 100 100" width={size} height={size} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
{name==='bank'&&<><path d="M10 35L50 12 90 35ZM15 85h70M12 92h76M22 43v34M41 43v34M59 43v34M78 43v34" /></>}
{name==='chart'&&<><path d="M15 12v74h74M27 66l18-19 15 9 25-30M69 26h16v16" /></>}
{name==='home'&&<><path d="M10 47L50 12 90 47M22 40v48h56V40M41 88V60h18v28" /></>}
{name==='factory'&&<><path d="M12 86V45l23 12V38l24 15V29h26v57ZM66 29V12h12v17M22 73h8M43 73h8M66 73h8" /></>}
{name==='wallet'&&<><rect x="12" y="27" width="76" height="57" rx="11" /><path d="M15 28l53-16v16M88 45H64v23h24" /><circle cx="74" cy="56" r="3" /></>}
{name==='people'&&<><circle cx="50" cy="28" r="13" /><circle cx="20" cy="39" r="9" /><circle cx="80" cy="39" r="9" /><path d="M28 88V66c0-27 44-27 44 0v22M7 83V67c0-17 15-20 23-12M93 83V67c0-17-15-20-23-12" /></>}
</svg>;
export const Note:FC<{label:string;theme:Theme;variant?:'usd'|'vnd';width?:number}>=({label,theme,variant='vnd',width=340})=><div style={{width,height:160,borderRadius:20,border:`3px solid ${variant==='usd'?theme.teal:theme.accent}`,background:variant==='usd'?'#E6F6F2':'#EBDDFA',display:'flex',alignItems:'center',justifyContent:'center',fontSize:50,fontWeight:800,letterSpacing:5,color:variant==='usd'?theme.teal:theme.accent,boxShadow:'0 18px 35px #28143F0A'}}>{label}</div>;
export const Exchange:FC<{theme:Theme;usd:string;vnd:string;from?:number}>=({theme,usd,vnd,from=0})=>{
const frame=useCurrentFrame();const slide=interpolate(frame-from,[0,22],[120,0],CLAMP);
return <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:20,margin:'35px 0'}}><div style={{transform:`translateX(${-slide}px)`}}><Note label={usd} theme={theme} variant="usd" width={340} /></div><span style={{fontSize:50,color:theme.muted}}>⇄</span><div style={{transform:`translateX(${slide}px)`}}><Note label={vnd} theme={theme} width={340} /></div></div>;
};
export const FlowDiagram:FC<{theme:Theme;labels:{central:string;banks:string;branches:string[]};amount:string;focus:number;note:string;assumption:string}>=({theme,labels,amount,focus,note,assumption})=>{
const frame=useCurrentFrame();const dot=(frame%48)/48;
return <div style={{position:'relative',height:800}}><svg viewBox="0 0 880 650" style={{position:'absolute',inset:0,width:880,height:650}}>
<defs><marker id="moneyArrow" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto"><path d="M0 0L6 3 0 6" fill="none" stroke={theme.accent} strokeWidth="1.5" /></marker></defs>
<path d="M100 310V130M780 130V310M440 435v65M145 555v-55h590v55M440 500v55" fill="none" stroke={theme.accent} strokeWidth="6" markerEnd="url(#moneyArrow)" />
<path d="M780 145v160" stroke={theme.teal} strokeWidth="10" strokeDasharray="16 25" strokeDashoffset={-frame*2} />
<circle cx="780" cy={145+dot*160} r="11" fill={theme.teal} /><circle cx="100" cy={305-dot*160} r="10" fill={theme.accent}/><text x="120" y="166" fill={theme.teal} fontSize="25">USD ↑</text><text x="655" y="166" fill={theme.accent} fontSize="25">VND ↓</text>
</svg>
{[[labels.central,0,100],[labels.banks,320,110]].map(([label,top,height],i)=><div key={String(label)} style={{position:'absolute',left:75,right:75,top:Number(top),height:Number(height),borderRadius:22,background:focus===i?`${theme.accent}12`:theme.panel,border:`2px solid ${focus===i?theme.accent:theme.border}`,display:'flex',alignItems:'center',justifyContent:'center',gap:20,fontSize:27,fontWeight:800}}><Icon name="bank" color={theme.accent} size={63} />{label}</div>)}
<div style={{position:'absolute',top:182,left:170,right:170,textAlign:'center',fontSize:19,fontWeight:700,color:theme.muted}}>{assumption}</div>
<div style={{position:'absolute',top:205,left:140,right:140,textAlign:'center',background:theme.background,padding:'12px 0',fontSize:46,fontWeight:800,color:theme.accent}}>{amount}</div>
<div style={{position:'absolute',top:555,left:0,right:0,display:'flex',gap:20}}>{labels.branches.map((label,i)=><div key={label} style={{flex:1,border:`2px solid ${focus===i+2?theme.teal:theme.border}`,borderRadius:20,padding:'20px 10px',textAlign:'center',background:theme.panel,fontSize:24,fontWeight:700}}><Icon name={(['factory','chart','wallet'] as const)[i]} color={theme.teal} size={66} /><div style={{marginTop:12}}>{label}</div></div>)}</div>
<div style={{position:'absolute',top:728,left:20,right:20,textAlign:'center',fontSize:24,lineHeight:1.45,color:theme.muted,whiteSpace:'pre-line'}}>{note}</div></div>;
};
