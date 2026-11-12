import type { FC } from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { CLAMP, type Theme } from './UI';
export type IconName = 'bank' | 'shield' | 'calendar' | 'wallet' | 'moon' | 'gift';
export const Icon: FC<{ name: IconName; color: string; size?: number }> = ({ name, color, size = 100 }) => <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
  {name === 'bank' && <><path d="M10 35L50 12 90 35ZM15 85h70M12 92h76M22 43v34M41 43v34M59 43v34M78 43v34" /></>}
  {name === 'shield' && <><path d="M50 10L84 24v26c0 21-16 35-34 43-18-8-34-22-34-43V24Z" fill={`${color}0D`} /><path d="M33 50l12 12 24-27" /></>}
  {name === 'calendar' && <><rect x="14" y="21" width="72" height="67" rx="10" /><path d="M14 40h72M31 12v19M69 12v19M29 54h12M58 54h12M29 70h12M58 70h12" /></>}
  {name === 'wallet' && <><rect x="12" y="27" width="76" height="57" rx="11" /><path d="M15 28l53-16v16M88 45H64v23h24" /><circle cx="74" cy="56" r="3" /></>}
  {name === 'moon' && <><path d="M74 70a35 35 0 0 1-46-46 35 35 0 1 0 46 46Z" fill={`${color}0C`} /><path d="M71 13v18M62 22h18M84 41v12M78 47h12" /></>}
  {name === 'gift' && <><path d="M12 40h76v17H12zM20 57v31h60V57M50 40v48" /><path d="M50 40C5 40 20 2 40 22ZM50 40C95 40 80 2 60 22Z" /></>}
</svg>;
export const BankVault: FC<{ theme: Theme }> = ({ theme }) => {
  const frame = useCurrentFrame(); const p = interpolate(frame, [0, 40], [0, 1], CLAMP);
  return <svg viewBox="0 0 880 320" style={{width:'100%',height:320}}><ellipse cx="440" cy="290" rx="310" ry="20" fill={`${theme.accent}0A`} /><rect x="175" y="35" width="530" height="245" rx="32" fill="#E4D4F5" stroke={theme.accent} strokeWidth="4" /><rect x="205" y="65" width="470" height="185" rx="22" fill="white" /><circle cx="440" cy="157" r="66" fill="#F2E9FC" stroke={theme.accent} strokeWidth="5" /><g transform={`rotate(${p*75} 440 157)`}>{[0,1,2,3].map(i=><path key={i} d="M440 157v-42" stroke={theme.accent} strokeWidth="9" strokeLinecap="round" transform={`rotate(${i*90} 440 157)`} />)}</g><circle cx="440" cy="157" r="17" fill={theme.accent} /><path d="M231 100v110M650 100v110" stroke="#C6A2E9" strokeWidth="12" strokeLinecap="round" /></svg>;
};
/** Split lines convey scheduling only; widths do not imply allocation advice. */
export const SplitMoney: FC<{ theme: Theme }> = ({ theme }) => {
  const frame=useCurrentFrame(); const p=interpolate(frame,[0,45],[0,1],CLAMP);
  return <svg viewBox="0 0 880 310" style={{width:'100%',height:310}}><circle cx="440" cy="65" r="49" fill={theme.accent} /><path d="M423 67l12 12 25-29" fill="none" stroke="white" strokeWidth="7" strokeLinecap="round" /><g stroke={theme.accent} strokeWidth="5" fill="none" pathLength="1"><path d="M440 115V158M150 212v-54h580v54M440 158v54" opacity={p} /></g>{[150,440,730].map((x,i)=><g key={x} opacity={p} transform={`translate(${x-83},212)`}><rect width="166" height="72" rx="17" fill={i===1?theme.teal:'#C39BEA'} /><rect x="55" y="18" width="56" height="36" rx="18" fill="white" /><path d="M68 36h30" stroke={i===1?theme.teal:theme.accent} strokeWidth="5" /></g>)}</svg>;
};
