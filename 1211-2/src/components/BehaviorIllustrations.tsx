import type { FC } from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { CLAMP, type Theme } from './UI';
export type IconName = 'home' | 'bag' | 'coin' | 'cup' | 'car' | 'clock';
export const Icon: FC<{name:IconName;color:string;size?:number}> = ({name,color,size=100}) => <svg viewBox="0 0 100 100" width={size} height={size} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
  {name==='home'&&<><path d="M10 47L50 12 90 47M22 40v48h56V40M41 88V60h18v28" /></>}
  {name==='bag'&&<><path d="M19 32h62l7 56H12ZM35 35V23c0-20 30-20 30 0v12" /></>}
  {name==='coin'&&<><circle cx="50" cy="50" r="35" /><path d="M61 38c-18-12-29 10-9 13s8 23-13 11M50 28v44" /></>}
  {name==='cup'&&<><path d="M18 31h58v27c0 36-58 36-58 0ZM76 37h9c18 0 11 26-9 26M15 89h65M30 12v9M47 8v13M64 12v9" /></>}
  {name==='car'&&<><path d="M12 68V45l12-25h52l12 25v23ZM17 45h66M18 68v13h14V68M68 68v13h14V68M25 56h8M67 56h8" /></>}
  {name==='clock'&&<><circle cx="50" cy="50" r="36" /><path d="M50 26v26l18 12" /></>}
</svg>;
export const Accumulation: FC<{theme:Theme}> = ({theme}) => {
  const frame=useCurrentFrame(); const p=interpolate(frame,[0,65],[0,1],CLAMP);
  return <svg viewBox="0 0 880 300" style={{width:'100%',height:300}}><path d="M15 277H865" stroke={theme.border} strokeWidth="4" />{Array.from({length:10},(_,i)=><g key={i} transform={`translate(${35+i*82},${270-(40+i*20)*p})`}><rect width="53" height={(40+i*20)*p} rx="8" fill={i%3===0?theme.accent:i%3===1?'#C5A0EB':theme.teal} /></g>)}</svg>;
};
export const Flow: FC<{items:string[];theme:Theme;active?:number}> = ({items,theme,active=0}) => <div>{items.map((label,i)=><div key={label}><div style={{display:'flex',alignItems:'center',gap:25,padding:'22px 28px',border:`2px solid ${i===active?theme.accent:theme.border}`,borderRadius:23,background:i===active?`${theme.accent}0C`:theme.panel}}><Icon name={(['coin','bag','coin','clock'] as const)[i%4]} color={i===active?theme.accent:theme.muted} size={70} /><span style={{fontSize:34,fontWeight:700}}>{label}</span></div>{i<items.length-1&&<div style={{fontSize:28,height:35,textAlign:'center',color:theme.accent}}>↓</div>}</div>)}</div>;
