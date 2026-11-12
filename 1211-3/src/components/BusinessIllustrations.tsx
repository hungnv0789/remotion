import type { FC } from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { CLAMP, type Theme } from './UI';
export type IconName = 'hotel' | 'mall' | 'people' | 'car';
export const Icon: FC<{name:IconName;color:string;size?:number}> = ({name,color,size=100}) => <svg viewBox="0 0 100 100" width={size} height={size} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
  {name==='hotel'&&<><path d="M15 90V20h70v70M10 90h80M40 90V68h20v22M29 33h10M60 33h10M29 49h10M60 49h10" /></>}
  {name==='mall'&&<><path d="M12 89V35h76v54M7 35L24 17h52l17 18M31 89V57h38v32M11 47h78M50 57v32" /></>}
  {name==='people'&&<><circle cx="50" cy="28" r="13" /><circle cx="20" cy="39" r="9" /><circle cx="80" cy="39" r="9" /><path d="M28 88V66c0-27 44-27 44 0v22M7 83V67c0-17 15-20 23-12M93 83V67c0-17-15-20-23-12" /></>}
  {name==='car'&&<><path d="M12 68V45l12-25h52l12 25v23ZM17 45h66M18 68v13h14V68M68 68v13h14V68M25 56h8M67 56h8" /></>}
</svg>;
export const Building: FC<{theme:Theme;kind:'hotel'|'mall'}> = ({theme,kind}) => {
  const frame=useCurrentFrame();const p=interpolate(frame,[0,40],[0,1],CLAMP);
  return <svg viewBox="0 0 880 300" style={{width:'100%',height:300}}><circle cx="710" cy="70" r="55" fill={`${theme.accent}0A`} /><path d="M80 276H810" stroke={theme.border} strokeWidth="5" />
    <g opacity={p} transform={`translate(0 ${(1-p)*35})`}>{kind==='hotel'?<><rect x="215" y="35" width="450" height="240" rx="16" fill="#D7BCEF" /><path d="M198 45l45-28h394l44 28" stroke={theme.accent} fill={theme.accent} strokeWidth="4" />{[0,1,2].map(row=>[0,1,2,3,4,5].map(col=><rect key={`${row}-${col}`} x={245+col*65} y={65+row*55} width="36" height="35" rx="5" fill="white" />))}<rect x="398" y="214" width="84" height="61" rx="6" fill={theme.accent} /><path d="M135 276V130M135 145l-50-40M135 145l50-40M135 145l-38-68M135 145l42-68" stroke={theme.teal} strokeWidth="10" strokeLinecap="round" /></>:<><path d="M120 77l60-40h520l60 40Z" fill={theme.accent} /><rect x="135" y="77" width="610" height="198" rx="12" fill="#D7BCEF" />{[0,1].map(row=>[0,1,2,3,4,5,6,7].map(col=><rect key={`${row}-${col}`} x={160+col*72} y={102+row*68} width="49" height="43" rx="5" fill="white" />))}<rect x="385" y="224" width="110" height="51" rx="5" fill={theme.teal} /></>}</g>
  </svg>;
};
