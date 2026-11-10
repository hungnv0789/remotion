import type { FC } from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import type { Theme } from './UI';
import { CLAMP } from './UI';
export type IconName = 'city' | 'bank' | 'rail' | 'factory' | 'coin' | 'people' | 'chip' | 'port' | 'plane';
/** Original, deterministic concept illustrations; no remote assets. */
export const Icon: FC<{ name: IconName; color: string; size?: number }> = ({ name, color, size = 90 }) => <svg viewBox="0 0 100 100" width={size} height={size} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
  {name === 'plane' && <><path d="M47 12h6l7 31 29 17v8L58 58l-2 24 12 8H32l12-8-2-24-31 10v-8l29-17Z" /></>}
  {name === 'city' && <><path d="M10 88h80M18 85V36h25v49M48 85V17h30v68" />{[30,45,60,75].map(y => <path key={y} d={`M56 ${y}h14M25 ${y+10}h10`} />)}</>}
  {name === 'bank' && <><path d="M10 35L50 12 90 35ZM15 85h70M12 92h76M22 43v34M41 43v34M59 43v34M78 43v34" /></>}
  {name === 'rail' && <><rect x="22" y="12" width="56" height="65" rx="15" /><path d="M30 27h40v24H30zM27 93l14-16M73 93L59 77M27 86h46" /><circle cx="36" cy="64" r="3" /><circle cx="64" cy="64" r="3" /></>}
  {name === 'factory' && <><path d="M12 86V45l23 12V38l24 15V29h26v57ZM66 29V12h12v17M22 73h8M43 73h8M66 73h8" /></>}
  {name === 'coin' && <><circle cx="50" cy="50" r="35" /><circle cx="50" cy="50" r="25" /><path d="M61 38c-18-12-29 10-9 13s8 23-13 11M50 28v44" /></>}
  {name === 'people' && <><circle cx="50" cy="28" r="13" /><circle cx="20" cy="39" r="9" /><circle cx="80" cy="39" r="9" /><path d="M28 88V66c0-27 44-27 44 0v22M7 83V67c0-17 15-20 23-12M93 83V67c0-17-15-20-23-12" /></>}
  {name === 'chip' && <><rect x="25" y="25" width="50" height="50" rx="8" /><path d="M38 38h24v24H38z" />{[35,50,65].map(n=><path key={n} d={`M${n} 10v15M${n} 75v15M10 ${n}h15M75 ${n}h15`} />)}</>}
  {name === 'port' && <><path d="M10 83h80M15 72V20h62M23 20l39 28H23M70 20v25M65 45h10v9M10 93q10-8 20 0t20 0t20 0t20 0M38 60h22v20H38zM64 60h22v20H64z" /></>}
</svg>;
export const Cityscape: FC<{ theme: Theme; infrastructure?: boolean }> = ({ theme, infrastructure = false }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [0, 40], [0, 1], CLAMP);
  return <svg viewBox="0 0 880 350" style={{ width: '100%', height: 350 }}>
    <circle cx="685" cy="80" r="65" fill={`${theme.accent}0B`} />
    {Array.from({ length: 10 }, (_, i) => { const h = [110,170,145,240,200,275,150,225,120,180][i]; return <g key={i} transform={`translate(${i*82+20},${300-h*p})`}><rect width="65" height={h*p} rx="8" fill={i%3===0?theme.accent:i%3===1?'#C9A6F0':'#E1CEF5'} />{p>.8 && Array.from({length: Math.floor(h/35)},(_,n)=><path key={n} d={`M16 ${22+n*30}h9M40 ${22+n*30}h9`} stroke="#FFFFFFAA" strokeWidth="8" />)}</g>; })}
    <path d="M0 305H880" stroke={theme.accent} strokeWidth="4" />
    {infrastructure && <><path d="M0 320H880M0 342H880" stroke={theme.border} strokeWidth="4" /><g transform={`translate(${(frame*2.5)%1150-230},308)`}><rect width="210" height="27" rx="12" fill={theme.teal} />{[20,50,80,110,140,170].map(x=><rect key={x} x={x} y="5" width="18" height="11" rx="2" fill="white" />)}</g></>}
  </svg>;
};
export const Flow: FC<{ items: { icon: IconName; label: string }[]; theme: Theme; active?: number }> = ({ items, theme, active = 0 }) => <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>{items.map((item,i)=><div key={item.label}><div style={{ display:'flex', alignItems:'center', gap:26, padding:'22px 28px', borderRadius:22, border:`2px solid ${i===active?theme.accent:theme.border}`, background:i===active?`${theme.accent}0C`:theme.panel }}><Icon name={item.icon} color={i===active?theme.accent:theme.muted} size={70} /><span style={{ fontSize:34, fontWeight:700 }}>{item.label}</span></div>{i<items.length-1&&<div style={{ textAlign:'center', color:theme.accent, fontSize:30, height:35 }}>↓</div>}</div>)}</div>;
