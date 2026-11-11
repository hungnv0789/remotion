import type { FC } from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { CLAMP, type Theme } from './UI';
export type SymbolName = 'bank' | 'files' | 'chip' | 'bolt' | 'people' | 'search';
export const SymbolIcon: FC<{ name: SymbolName; color: string; size?: number }> = ({ name, color, size = 100 }) => <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
  {name === 'bank' && <><path d="M10 35L50 12 90 35ZM15 85h70M12 92h76M22 43v34M41 43v34M59 43v34M78 43v34" /></>}
  {name === 'files' && <><rect x="16" y="15" width="57" height="72" rx="9" fill={`${color}08`} /><path d="M73 26h11v60c0 7-5 8-11 8H28M29 32h30M29 45h30M29 58h22M29 71h16" /></>}
  {name === 'chip' && <><rect x="25" y="25" width="50" height="50" rx="8" /><path d="M38 38h24v24H38z" />{[35,50,65].map(n=><path key={n} d={`M${n} 10v15M${n} 75v15M10 ${n}h15M75 ${n}h15`} />)}</>}
  {name === 'bolt' && <path d="M58 8L20 55h27l-6 37 39-51H53Z" fill={`${color}15`} />}
  {name === 'people' && <><circle cx="50" cy="28" r="13" /><circle cx="20" cy="39" r="9" /><circle cx="80" cy="39" r="9" /><path d="M28 88V66c0-27 44-27 44 0v22M7 83V67c0-17 15-20 23-12M93 83V67c0-17-15-20-23-12" /></>}
  {name === 'search' && <><circle cx="43" cy="43" r="28" /><path d="M63 64l25 25M31 38h24M31 49h17" /></>}
</svg>;
export const Capitol: FC<{ theme: Theme }> = ({ theme }) => <svg viewBox="0 0 880 310" style={{ width:'100%', height:310 }}>
  <circle cx="440" cy="140" r="130" fill={`${theme.accent}08`} /><path d="M440 20v40M440 20h50v24h-50" fill={theme.accent} stroke={theme.accent} strokeWidth="4" />
  <path d="M360 135c0-100 160-100 160 0Z" fill="#D2B6EF" /><path d="M335 138h210v30H335zM180 170h520v110H180z" fill="#E4D4F4" />
  <path d="M300 170l140-65 140 65Z" fill={theme.accent} />
  {Array.from({length:8},(_,i)=><rect key={i} x={209+i*61} y="192" width="25" height="78" rx="4" fill={i%2?theme.accent:'#B78AE7'} />)}
  <path d="M155 281h570M135 299h610" stroke={theme.accent} strokeWidth="8" strokeLinecap="round" />
</svg>;
/** Qualitative market movement, deliberately without a date or price scale. */
export const MarketChart: FC<{ theme: Theme; from?: number; height?: number }> = ({ theme, from=0, height=300 }) => {
  const frame=useCurrentFrame(); const p=interpolate(frame-from,[0,65],[0,1],CLAMP);
  return <svg viewBox="0 0 880 310" style={{ width:'100%', height }}>
    {[55,115,175,235,295].map(y=><path key={y} d={`M15 ${y}H860`} stroke={theme.border} strokeWidth="2" />)}
    {Array.from({length:15},(_,i)=><rect key={i} x={30+i*56} y={70+(i%4)*15+i*9} width="17" height={30+(i%3)*13} rx="3" fill={`${theme.accent}22`} />)}
    <path d="M20 60L125 42 190 98 270 82 350 154 430 132 515 208 590 183 680 244 755 228 845 285" fill="none" stroke={theme.danger} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1-p} />
  </svg>;
};
export const ServerRacks: FC<{ theme: Theme }> = ({ theme }) => {
  const frame=useCurrentFrame();
  return <svg viewBox="0 0 880 370" style={{width:'100%',height:370}}>
    <ellipse cx="440" cy="340" rx="340" ry="22" fill={`${theme.accent}0A`} />
    {[0,1,2,3].map(i=><g key={i} transform={`translate(${98+i*174},32)`}><rect width="146" height="290" rx="18" fill={i%2?'#DCC9F1':'#C6A1EB'} stroke={theme.accent} strokeWidth="3" />{[0,1,2,3,4].map(j=><g key={j} transform={`translate(15,${20+j*51})`}><rect width="116" height="37" rx="7" fill="white" /><path d="M12 13h53M12 24h53" stroke={theme.border} strokeWidth="4" /><circle cx="95" cy="18" r="5" fill={(Math.floor(frame/15)+i+j)%3?theme.accent:theme.teal} /></g>)}</g>)}
  </svg>;
};
export const Flow: FC<{ items: { icon: SymbolName; label: string }[]; theme: Theme; active?: number }> = ({items,theme,active=0}) => <div style={{display:'flex',flexDirection:'column',gap:12}}>{items.map((item,i)=><div key={item.label}><div style={{display:'flex',alignItems:'center',gap:25,padding:'21px 27px',borderRadius:23,border:`2px solid ${i===active?theme.accent:theme.border}`,background:i===active?`${theme.accent}0C`:theme.panel}}><SymbolIcon name={item.icon} color={i===active?theme.accent:theme.muted} size={70} /><span style={{fontSize:33,fontWeight:700,lineHeight:1.4}}>{item.label}</span></div>{i<items.length-1&&<div style={{height:35,textAlign:'center',fontSize:30,color:theme.accent}}>↓</div>}</div>)}</div>;
