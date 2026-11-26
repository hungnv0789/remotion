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
      {values.map((v,i)=>{const step=700/values.length;const x=95+i*step;const h=v/max*230*progress;return <g key={i}><rect x={x} y={340-h} width={step-50} height={h} rx={12} fill={i===beat%values.length?color:'url(#column)'}/><Label x={x+(step-50)/2} y={Math.max(70,322-h)} text={shot.metrics[i]||''} size={(shot.metrics[i]?.length||0)>9?24:32} fill={color}/><Label x={x+(step-50)/2} y={390} text={labels[i]||''} size={23}/></g>;})}
    </g>}
    {shot.graphic === 'line' && <g>
      {[0,1,2,3].map(i=><path key={i} d={`M75 ${100+i*75}H805`} stroke={theme.border}/>)}
      <polyline points={values.map((v,i)=>`${80+i*720/Math.max(1,values.length-1)},${340-v/max*220}`).join(' ')} fill="none" stroke={color} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1-progress}/>
      {values.map((v,i)=><circle key={i} cx={80+i*720/Math.max(1,values.length-1)} cy={340-v/max*220} r={i===beat%values.length?13:7} fill={color} opacity={progress}/>)}
      <Label x={440} y={70} text={labels[0]||''} size={28}/><Label x={440} y={405} text={labels[1]||''} size={23} fill={theme.muted}/>
    </g>}
    {shot.graphic === 'cards' && <g>
      {labels.slice(0,4).map((text,i)=>{const x=65+(i%2)*390;const y=60+Math.floor(i/2)*175;const active=beat%labels.length===i;return <g key={i} opacity={interpolate(frame,[i*4,i*4+12],[.3,1],CLAMP)}><rect x={x} y={y} width={360} height={145} rx={24} fill={active?`${color}14`:theme.panel} stroke={active?color:theme.border} strokeWidth={2}/><circle cx={x+42} cy={y+40} r={20} fill={color}/><Label x={x+42} y={y+47} text={String(i+1).padStart(2,'0')} size={18} fill="#FFFFFF"/><Label x={x+180} y={y+97} text={text} size={26}/></g>;})}
    </g>}
    {shot.graphic === 'comparison' && <g>
      {labels.slice(0,2).map((text,i)=><g key={i}><rect x={65+i*395} y={70} width={355} height={300} rx={25} fill={i===0?`${color}12`:theme.panel} stroke={color} strokeWidth={2}/><Label x={242+i*395} y={135} text={text} size={26}/><Label x={242+i*395} y={260} text={shot.metrics[i]||''} size={(shot.metrics[i]?.length||0)>9?40:(shot.metrics[i]?.length||0)>7?46:54} fill={i===0?color:theme.teal}/><path d={`M${130+i*395} 300H${355+i*395}`} stroke={i===0?color:theme.teal} strokeWidth={7}/></g>)}
    </g>}

    {shot.graphic === 'chip' && <g>
      <g transform={`translate(440 215) rotate(${Math.sin(frame/50)*2})`}>
        <rect x={-125} y={-125} width={250} height={250} rx={28} fill={color} opacity={.12}/>
        <rect x={-90} y={-90} width={180} height={180} rx={16} fill={color}/>
        {Array.from({length:7},(_,i)=><g key={i}><path d={`M${-66+i*22} -115V-145M${-66+i*22} 115V145M-115 ${-66+i*22}H-145M115 ${-66+i*22}H145`} stroke={color} strokeWidth={8}/></g>)}
        <rect x={-62} y={-62} width={124} height={124} rx={9} fill="none" stroke="white" strokeWidth={3}/>
        <Label x={0} y={10} text={shot.metrics[0]||''} size={shot.metrics[0]?.length>6?23:27} fill="#FFFFFF"/>
      </g>
      {labels.slice(0,4).map((text,i)=>{const x=i%2===0?142:738;const y=i<2?120:300;return <g key={i}><path d={`M${x} ${y}L440 215`} stroke={color} strokeOpacity={.18} strokeWidth={3}/><rect x={x-112} y={y-29} width={224} height={58} rx={16} fill={theme.panel} stroke={theme.border}/><Label x={x} y={y+8} text={text} size={22}/></g>;})}
    </g>}
    {shot.graphic === 'globe' && <g>
      <g transform={`translate(440 216) rotate(${Math.sin(frame/80)*3})`}>
        <circle r={147} fill={`${color}09`} stroke={color} strokeWidth={3}/>
        <ellipse rx={70} ry={147} fill="none" stroke={color} opacity={.3} strokeWidth={2}/>
        <ellipse rx={120} ry={147} fill="none" stroke={color} opacity={.2} strokeWidth={2}/>
        {[-75,0,75].map(y=><path key={y} d={`M${-Math.sqrt(147**2-y**2)} ${y}H${Math.sqrt(147**2-y**2)}`} stroke={color} strokeWidth={2} opacity={.22}/>)}
        <ellipse rx={188} ry={47} fill="none" stroke={color} strokeWidth={4} transform={`rotate(${frame/3})`} opacity={.5}/>
      </g>
      {labels.slice(0,4).map((text,i)=>{const x=i%2===0?150:730;const y=i<2?100:325;return <Box key={i} x={x-105} y={y-38} w={210} h={76} text={text} active={i===beat%4}/>;})}
    </g>}
    {shot.graphic === 'factory' && <g>
      <path d="M205 350V190L330 135V190L455 135V190L580 135V350Z" fill={`${color}18`} stroke={color} strokeWidth={4}/>
      <rect x={615} y={100} width={65} height={250} rx={8} fill={color} opacity={.7}/>
      {[0,1,2].map(i=><g key={i}><rect x={245+i*120} y={255} width={60} height={60} rx={5} fill={color}/><circle cx={647+i*22} cy={70-((frame+i*20)%60)} r={15+i*5} fill={color} opacity={.1}/></g>)}
      <Label x={440} y={405} text={labels[0]||''} size={26}/>
      <Label x={440} y={70} text={labels[1]||''} size={27}/>
    </g>}
    {shot.graphic === 'timeline' && <g>
      <path d="M100 200H780" stroke={color} strokeWidth={6} opacity={.3}/>
      {labels.slice(0,4).map((text,i)=>{const x=110+i*660/Math.max(1,labels.slice(0,4).length-1);return <g key={i}><circle cx={x} cy={200} r={i===beat%labels.length?17:11} fill={color}/><Label x={x} y={154} text={shot.metrics[i]||''} size={(shot.metrics[i]?.length||0)>9?24:32} fill={color}/><Label x={x} y={260} text={text} size={22}/></g>;})}
      
    </g>}

    {shot.graphic === 'donut' && <g>
      <circle cx={285} cy={220} r={130} stroke={theme.border} strokeWidth={42} fill="none"/>
      <circle cx={285} cy={220} r={130} stroke={color} strokeWidth={42} fill="none" strokeDasharray={`${Math.min(1,Math.max(0,(values[0]||0)/100))*817*progress} 817`} transform="rotate(-90 285 220)"/>
      <Label x={285} y={235} text={shot.metrics[0]||''} size={60} fill={color}/>
      {labels.slice(0,3).map((text,i)=><g key={i}><circle cx={505} cy={145+i*78} r={7} fill={color}/><text x={530} y={153+i*78} fill={theme.text} fontSize={24} fontWeight={700}>{text}</text></g>)}
    </g>}

    {shot.graphic === 'quotes' && <g>
      <text x={75} y={58} fill={theme.muted} fontSize={22} fontWeight={700}>{shot.headers?.[0]||''}</text>
      <text x={795} y={58} textAnchor="end" fill={theme.muted} fontSize={22} fontWeight={700}>{shot.headers?.[1]||''}</text>
      {labels.slice(0,4).map((text,i)=><g key={i} opacity={interpolate(frame,[i*4,i*4+12],[.3,1],CLAMP)}>
        <rect x={48} y={80+i*80} width={784} height={67} rx={15} fill={i===0?`${color}14`:theme.panel} stroke={i===0?color:theme.border}/>
        <text x={80} y={124+i*80} fill={i===0?color:theme.text} fontSize={30} fontWeight={800}>{text}</text>
        <text x={795} y={124+i*80} textAnchor="end" fill={i===0?color:theme.text} fontSize={38} fontWeight={800}>{shot.metrics[i]||''}</text>
      </g>)}
    </g>}
    {shot.graphic === 'gold' && <g>
      <defs><linearGradient id="gold-metal" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#A16B11"/><stop offset=".28" stopColor="#FBE1A0"/><stop offset=".52" stopColor="#D6A139"/><stop offset=".8" stopColor="#FFEDB6"/><stop offset="1" stopColor="#B57A19"/></linearGradient></defs>
      <g transform={`translate(265 218) rotate(${-24+Math.sin(frame/45)*3})`}>
        <ellipse cy={19} rx={151} ry={100} fill="none" stroke="#A8721D" strokeWidth={39}/>
        <ellipse rx={151} ry={100} fill="none" stroke="url(#gold-metal)" strokeWidth={39}/>
        <ellipse rx={130} ry={79} fill="none" stroke="#FFEDBC" strokeWidth={3}/>
        <path d="M-148 -28A151 100 0 0 1 100 -78" stroke="#FFF8E2" strokeWidth={5} fill="none" strokeLinecap="round"/>
      </g>
      {labels.slice(0,3).map((text,i)=><Box key={i} x={490} y={85+i*95} w={330} h={72} text={text} active={i===beat%3}/>)}
      <path d="M135 65V105M115 85H155M385 328V358M370 343H400" stroke="#D5A041" strokeWidth={4} opacity={.55+.35*Math.sin(frame/9)}/>
    </g>}
    <rect x={27} y={421} width={55} height={4} fill={color}/><text x={96} y={429} fill={theme.muted} fontSize={13} letterSpacing={2}>{shot.note}</text>
  </svg>;
};
