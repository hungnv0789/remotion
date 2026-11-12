import type { FC } from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { CLAMP, type Theme } from './UI';
export type IconName = 'chart' | 'coin' | 'shares' | 'company' | 'shield';
export const Icon: FC<{ name: IconName; color: string; size?: number }> = ({name,color,size=100}) => <svg viewBox="0 0 100 100" width={size} height={size} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
  {name==='chart'&&<><path d="M15 12v74h74M27 66l18-19 15 9 25-30M69 26h16v16" /></>}
  {name==='coin'&&<><circle cx="50" cy="50" r="35" /><circle cx="50" cy="50" r="25" /><path d="M61 38c-18-12-29 10-9 13s8 23-13 11M50 28v44" /></>}
  {name==='shares'&&<><rect x="15" y="12" width="58" height="75" rx="9" /><path d="M73 25h12v61c0 6-6 7-12 7H30M28 30h30M28 43h30M28 56h17" /><circle cx="46" cy="73" r="6" /></>}
  {name==='company'&&<><path d="M13 89V39h31v50M47 89V13h38v76M8 89h84" />{[28,44,60,76].map(y=><path key={y} d={`M58 ${y}h15M23 ${y+18}h11`} />)}</>}
  {name==='shield'&&<><path d="M50 10L84 24v26c0 21-16 35-34 43-18-8-34-22-34-43V24Z" fill={`${color}0C`} /><path d="M50 31v25M50 69v2" /></>}
</svg>;
/** An illustrative path, with no invented dates or market prices. */
export const PriceChart: FC<{ theme: Theme; rising?: boolean; from?: number }> = ({theme,rising=true,from=0}) => {
  const frame=useCurrentFrame(); const p=interpolate(frame-from,[0,55],[0,1],CLAMP);
  return <svg viewBox="0 0 880 300" style={{width:'100%',height:300}}>
    {[45,105,165,225,285].map(y=><path key={y} d={`M20 ${y}H860`} stroke={theme.border} strokeWidth="2" />)}
    <g transform={rising?'translate(0 300) scale(1 -1)':undefined}><path d="M25 50L130 70 205 46 280 102 370 88 460 155 545 131 640 207 730 188 850 264" fill="none" stroke={rising?theme.teal:theme.danger} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1-p} /></g>
  </svg>;
};
export const Flow: FC<{ items: { icon: IconName; label: string }[]; theme: Theme; active?: number }> = ({items,theme,active=0}) => <div style={{display:'flex',flexDirection:'column',gap:12}}>{items.map((item,i)=><div key={item.label}><div style={{display:'flex',alignItems:'center',gap:25,padding:'21px 27px',borderRadius:23,border:`2px solid ${i===active?theme.accent:theme.border}`,background:i===active?`${theme.accent}0C`:theme.panel}}><Icon name={item.icon} color={i===active?theme.accent:theme.muted} size={70} /><span style={{fontSize:33,fontWeight:700,lineHeight:1.4}}>{item.label}</span></div>{i<items.length-1&&<div style={{height:35,textAlign:'center',fontSize:30,color:theme.accent}}>↓</div>}</div>)}</div>;
