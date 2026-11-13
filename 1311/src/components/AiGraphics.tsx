import type { FC } from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { CLAMP, type Theme } from './UI';
export type IconName='chip'|'people'|'chart'|'network'|'shield';
export const Icon:FC<{name:IconName;color:string;size?:number}>=({name,color,size=100})=><svg viewBox="0 0 100 100" width={size} height={size} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
{name==='chip'&&<><rect x="25" y="25" width="50" height="50" rx="8"/><path d="M38 38h24v24H38z"/>{[35,50,65].map(n=><path key={n} d={`M${n} 10v15M${n} 75v15M10 ${n}h15M75 ${n}h15`}/>)}</>}
{name==='people'&&<><circle cx="50" cy="28" r="13"/><circle cx="20" cy="39" r="9"/><circle cx="80" cy="39" r="9"/><path d="M28 88V66c0-27 44-27 44 0v22M7 83V67c0-17 15-20 23-12M93 83V67c0-17-15-20-23-12"/></>}
{name==='chart'&&<><path d="M15 12v74h74M25 29l20 20 15-10 25 31M68 70h17V53"/></>}
{name==='network'&&<><path d="M50 21v25M22 78V46h56v32M50 46v32"/><rect x="37" y="8" width="26" height="21" rx="5"/>{[10,38,66].map(x=><rect key={x} x={x} y="76" width="24" height="17" rx="4"/>)}</>}
{name==='shield'&&<><path d="M50 10L84 24v26c0 21-16 35-34 43-18-8-34-22-34-43V24Z" fill={`${color}0A`}/><path d="M50 31v25M50 69v2"/></>}
</svg>;
export const Chip:FC<{theme:Theme;label:string}>=({theme,label})=>{
 const frame=useCurrentFrame();return <svg viewBox="0 0 880 350" style={{width:'100%',height:350}}>{Array.from({length:6},(_,i)=><g key={i}><path d={`M${280+i*58} 72V18M${280+i*58} 278v54M265 ${95+i*32}H80M615 ${95+i*32}H800`} stroke={theme.border} strokeWidth="5"/>{i<5&&<circle cx={90+(frame*3+i*90)%165} cy={95+i*32} r="6" fill={theme.teal}/>}</g>)}<rect x="250" y="65" width="380" height="220" rx="28" fill="#E6D5F7" stroke={theme.accent} strokeWidth="6"/><rect x="278" y="92" width="324" height="166" rx="18" fill={theme.panel}/><text x="440" y="185" textAnchor="middle" fill={theme.accent} fontSize="52" fontWeight="800">{label}</text></svg>;
};
export const DownChart:FC<{theme:Theme;from?:number}>=({theme,from=0})=>{
 const frame=useCurrentFrame();const p=interpolate(frame-from,[0,45],[0,1],CLAMP);
 return <svg viewBox="0 0 880 300" style={{width:'100%',height:300}}>{[45,105,165,225,285].map(y=><path key={y} d={`M15 ${y}H865`} stroke={theme.border} strokeWidth="2"/>)}<path d="M25 45L120 65 195 43 280 110 360 86 450 163 535 137 630 210 720 195 850 278" fill="none" stroke={theme.danger} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1-p}/></svg>;
};
