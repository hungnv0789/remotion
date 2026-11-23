import type { FC } from 'react';
import { interpolate } from 'remotion';
import type { Shot } from '../config';
import type { Theme } from './UI';
import { CLAMP } from './UI';

export const NewsGraphics: FC<{ shot: Shot; theme: Theme; color: string; frame: number; beat: number }> = ({ shot, theme, color, frame, beat }) => {
  const progress = interpolate(frame, [0, 38], [0, 1], CLAMP);
  const labels = shot.nodes;
  const values = shot.values;
  const max = Math.max(1, ...values);
  const Label = ({ x, y, text, size = 25, fill = theme.text }: { x: number; y: number; text: string; size?: number; fill?: string }) => <text x={x} y={y} fill={fill} fontSize={size} textAnchor="middle" fontWeight={700}>{text}</text>;
  const Box = ({ x, y, w, h, text, active = false }: { x: number; y: number; w: number; h: number; text: string; active?: boolean }) => <g><rect x={x} y={y} width={w} height={h} rx={20} fill={active ? color : theme.panel} stroke={color} strokeWidth={active ? 0 : 2} /><Label x={x+w/2} y={y+h/2+8} text={text} fill={active ? '#FFFFFF' : theme.text} size={24} /></g>;
  return <svg viewBox="0 0 880 450" style={{ width: '100%', height: 440, display: 'block' }} role="img" aria-label={labels.join(' — ')}>
    <defs><linearGradient id="panel" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#FFFFFF"/><stop offset="1" stopColor="#EFE3FC"/></linearGradient><linearGradient id="column" x1="0" y1="1" x2="0" y2="0"><stop stopColor={color} stopOpacity=".45"/><stop offset="1" stopColor={color}/></linearGradient></defs>
    <rect x={2} y={2} width={876} height={446} rx={30} fill="url(#panel)" stroke={theme.border} strokeWidth={2}/>
    {Array.from({length:9},(_,i)=><path key={i} d={`M${i*110} 20V430`} stroke={theme.accent} opacity={.035}/>)}
    {shot.graphic === 'flow' && <g>
      <path d="M235 150H640M440 150V300M215 300H665" stroke={color} strokeOpacity={.2} strokeWidth={7} fill="none"/>
      {[0,1,2,3,4].map(i=><circle key={i} cx={235+((frame*3+i*85)%405)} cy={150} r={8} fill={color} opacity={.7}/>)}
      <Box x={70} y={95} w={210} h={110} text={labels[0]||''} active/>
      <Box x={600} y={95} w={210} h={110} text={labels[1]||''}/>
      {labels.slice(2,5).map((text,i)=><Box key={text} x={75+i*270} y={280} w={190} h={88} text={text} active={beat%3===i}/>)}
      <path d="m562 138 20 12-20 12" stroke={color} strokeWidth={5} fill="none"/>
    </g>}
    {shot.graphic === 'bars' && <g>
      {[0,1,2,3].map(i=><line key={i} x1={80} x2={800} y1={90+i*80} y2={90+i*80} stroke={theme.border}/>)}
      {values.map((v,i)=>{const step=700/values.length;const x=95+i*step;const h=v/max*230*progress;return <g key={i}><rect x={x} y={340-h} width={step-50} height={h} rx={12} fill={i===beat%values.length?color:'url(#column)'}/><Label x={x+(step-50)/2} y={Math.max(70,322-h)} text={shot.metrics[i]||''} size={32} fill={color}/><Label x={x+(step-50)/2} y={390} text={labels[i]||''} size={23}/></g>;})}
    </g>}
    {shot.graphic === 'line' && <g>
      {[0,1,2,3].map(i=><path key={i} d={`M75 ${100+i*75}H805`} stroke={theme.border}/>)}
      <polyline points={values.map((v,i)=>`${80+i*720/Math.max(1,values.length-1)},${340-v/max*220}`).join(' ')} fill="none" stroke={color} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1-progress}/>
      {values.map((v,i)=><circle key={i} cx={80+i*720/Math.max(1,values.length-1)} cy={340-v/max*220} r={i===beat%values.length?13:7} fill={color} opacity={progress}/>)}
      <Label x={440} y={70} text={labels[0]||''} size={28}/><Label x={440} y={405} text={labels[1]||''} size={23} fill={theme.muted}/>
    </g>}
    {(shot.graphic === 'cards' || shot.graphic === 'timeline') && <g>
      {labels.slice(0,4).map((text,i)=>{const x=65+(i%2)*390;const y=60+Math.floor(i/2)*175;const active=beat%labels.length===i;return <g key={i} opacity={interpolate(frame,[i*4,i*4+12],[.3,1],CLAMP)}><rect x={x} y={y} width={360} height={145} rx={24} fill={active?`${color}14`:theme.panel} stroke={active?color:theme.border} strokeWidth={2}/><circle cx={x+42} cy={y+40} r={20} fill={color}/><Label x={x+42} y={y+47} text={String(i+1).padStart(2,'0')} size={18} fill="#FFFFFF"/><Label x={x+180} y={y+97} text={text} size={26}/></g>;})}
    </g>}
    {shot.graphic === 'comparison' && <g>
      {labels.slice(0,2).map((text,i)=><g key={i}><rect x={65+i*395} y={70} width={355} height={300} rx={25} fill={i===0?`${color}12`:theme.panel} stroke={color} strokeWidth={2}/><Label x={242+i*395} y={135} text={text} size={26}/><Label x={242+i*395} y={260} text={shot.metrics[i]||''} size={54} fill={i===0?color:theme.teal}/><path d={`M${130+i*395} 300H${355+i*395}`} stroke={i===0?color:theme.teal} strokeWidth={7}/></g>)}
    </g>}
    <rect x={27} y={421} width={55} height={4} fill={color}/><text x={96} y={429} fill={theme.muted} fontSize={13} letterSpacing={2}>{shot.note}</text>
  </svg>;
};
