import type { FC } from 'react';
import { interpolate } from 'remotion';
import type { GraphicKind, VideoProps } from '../config';
import { CLAMP } from './UI';

export const IPOGraphics: FC<{ kind: GraphicKind; props: VideoProps; color: string; frame: number; beat: number }> = ({ kind, props, color, frame: f, beat }) => {
  const { theme, copy, data } = props;
  const p = interpolate(f,[0,36],[0,1],CLAMP);
  const cycle=(f%90)/90;
  const dark=theme.background==='#120A1C';
  const text=(s:string,x:number,y:number,size=22,fill=theme.text)=><text x={x} y={y} textAnchor="middle" fontSize={size} fontWeight="700" fill={fill} style={{filter:dark && s===copy.company[0] ? 'drop-shadow(0 0 8px #8229e3)' : undefined}}>{s}</text>;
  const line={stroke:color,strokeWidth:5,fill:'none',strokeLinecap:'round' as const,strokeLinejoin:'round' as const};
  const paper=theme.panel;
  const format=(n:number,digits=2)=>n.toLocaleString('en-US',{minimumFractionDigits:digits,maximumFractionDigits:digits});
  const comparison=(one:number,two:number,max:number,labels:string[],suffix:string,sub?:string,animate=true)=> <>
    {[[one,color,copy.company[0],labels[0]],[two,theme.gold,copy.company[1],labels[1]]].map(([value,ink,name,label],i)=><g key={i} transform={`translate(42 ${53+i*116})`}>
      <text x="0" y="19" fill={String(ink)} fontSize="21" fontWeight="800">{name}</text>
      <rect x="0" y="38" width="554" height="37" rx="9" fill={theme.border} opacity=".55"/>
      <rect x="0" y="38" width={554*Number(value)/max*(animate?p:1)} height="37" rx="9" fill={String(ink)}/>
      {text(String(label),687,66,33,String(ink))}
    </g>)}
    {text(sub||suffix,440,320,18,theme.muted)}
  </>;
  return <div style={{position:'relative',height:350,borderRadius:25,overflow:'hidden',border:`1px solid ${theme.border}`,background:dark?'linear-gradient(135deg,#100918,#2F1645)':`linear-gradient(135deg,white,${color}0D)`}}>
    <svg viewBox="0 0 880 350" style={{width:'100%',height:350,display:'block'}}>
      <defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" stroke={color} opacity=".05" fill="none"/></pattern><filter id="glow"><feGaussianBlur stdDeviation="4"/></filter></defs><rect width="880" height="350" fill="url(#grid)"/>
      {kind==='price'&&<>{text(copy.company[0],440,60,38,color)}{text(copy.price[0],440,105,20,theme.muted)}<text x="440" y="243" textAnchor="middle" fontSize="133" fontWeight="800" fill={color}>${Math.round(data.price*p)}</text>{text(copy.price[1],440,282,20,theme.muted)}{[0,1,2].map(i=><g key={i} transform={`translate(${73+i*283} 305)`}><rect width="170" height="30" rx="15" fill={i===2?color:theme.border} opacity={i===2?1:.6}/>{text(copy.price[3+i],85,23,21,i===2?paper:theme.text)}</g>)}</>}
      {kind==='versus'&&<><g transform={`translate(${interpolate(f,[0,14],[-150,0],CLAMP)} 0)`}><rect x="38" y="79" width="340" height="178" rx="24" fill={paper} stroke={color} strokeWidth="3"/>{text(copy.company[0],208,157,31,color)}{text(copy.price[2],208,209,17,theme.muted)}</g><g transform={`translate(${interpolate(f,[0,14],[150,0],CLAMP)} 0)`}><rect x="503" y="79" width="340" height="178" rx="24" fill={paper} stroke={theme.gold} strokeWidth="3"/>{text(copy.company[1],673,170,53,theme.gold)}</g>{text('VS',440,185,36,color)}</>}
      {kind==='demand'&&<>{[0,1].map(i=><g key={i} transform={`translate(${46+i*405} 57)`}><rect width="382" height="223" rx="23" fill={paper} stroke={color} strokeWidth="3"/>{text(copy.demand[i],191,52,20,theme.muted)}{text(i===0?`~$${Math.round(data.demandBillion*p)}B`:copy.demand[3],191,140,i?50:62,color)}{text(i===0?copy.demand[4]:copy.demand[1],191,192,23,theme.muted)}</g>)}{[0,1,2].map(i=><circle key={i} cx={180+((cycle+i/3)%1)*510} cy="310" r="6" fill={color}/>)}<path d="M173 310H714" {...line} strokeWidth="2" opacity=".2"/></>}
      {kind==='valuation'&&comparison(data.anthropicValuationBillion,data.spacexValuationBillion,data.spacexValuationBillion,copy.valuation.slice(3,5),'',copy.valuation[6])}
      {kind==='ipoInitial'&&comparison(data.baseIpoBillion,data.spacexInitialBillion,data.expandedIpoBillion,[copy.ipo[3],copy.ipo[4]],'',copy.ipo[6])}
      {kind==='ipoTotal'&&comparison(data.baseIpoBillion,data.spacexTotalBillion,data.expandedIpoBillion,[copy.ipo[3],copy.ipo[5]],'',copy.ipo[7]+' • '+copy.ipo[8])}
      {kind==='shares'&&<>{Array.from({length:7},(_,i)=><g key={i} transform={`translate(${77+i*98} ${116+Math.sin(f/22+i)*12}) rotate(${(i-3)*4} 51 54)`}><rect width="99" height="116" rx="12" fill={paper} stroke={color} strokeWidth="3"/><path d="M23 31h53M23 52h53M23 73h31" stroke={color} strokeWidth="4" opacity=".35"/><circle cx="73" cy="91" r="10" fill={color} opacity=".25"/></g>)}{text(copy.option[0],440,52,22,color)}{text(copy.option[1],440,303,29,color)}</>}
      {kind==='option'&&<>{text(copy.option[2],440,35,19,color)}{comparison(data.baseIpoBillion+(data.expandedIpoBillion-data.baseIpoBillion)*p,data.spacexTotalBillion,data.expandedIpoBillion,[`$${format(data.baseIpoBillion+(data.expandedIpoBillion-data.baseIpoBillion)*p)}B`,copy.ipo[5]],'',copy.option[1],false)}</>}
      {kind==='private'&&<>{[0,1].map(i=><g key={i} transform={`translate(${40+i*414} 49)`}><rect width="385" height="194" rx="22" fill={paper} stroke={i?theme.teal:color} strokeWidth="3"/>{text(copy.private[i],192,48,22,theme.muted)}{text(copy.private[2+i],192,128,63,i?theme.teal:color)}<path d="M53 160H332" stroke={theme.border} strokeWidth="3"/></g>)}{copy.private.slice(4,7).map((s,i)=><g key={s} transform={`translate(${52+i*270} 264)`}><rect width="245" height="37" rx="18" fill={theme.border} opacity=".6"/>{text(s,122,26,s.length>14?15:19,theme.text)}</g>)}{text(copy.private[7],440,332,15,theme.muted)}</>}
      {kind==='scenarios'&&<><rect x="49" y="24" width="152" height="43" rx="12" fill={color}/>{text(copy.scenarios[1],125,56,28,paper)}{text(copy.scenarios[0],302,54,24,theme.muted)}{text(copy.scenarios[2],660,54,23,color)}<path d="M73 88V277H802" {...line} opacity=".13" strokeWidth="3"/><path d="M95 189H785" stroke={theme.border} strokeWidth="2" strokeDasharray="6 9"/><path d="M95 189L212 162L311 177L413 123L521 136L636 92L761 83" stroke={theme.teal} strokeWidth="5" fill="none" strokeDasharray="800" strokeDashoffset={800*(1-p)}/><path d="M95 189L212 203L311 191L413 233L521 219L636 255L761 267" stroke={theme.danger} strokeWidth="5" fill="none" strokeDasharray="800" strokeDashoffset={800*(1-p)}/>{text(copy.scenarios[3],708,111,19,theme.teal)}{text(copy.scenarios[4],700,294,19,theme.danger)}{text(copy.scenarios[5],440,332,15,theme.muted)}</>}
      {kind==='summary'&&<>{[0,1,2].map(i=><g key={i} transform={`translate(${36+i*280} 66)`} opacity={interpolate(f-i*12,[0,10],[.25,1],CLAMP)}><rect width="248" height="217" rx="23" fill={paper} stroke={color} strokeWidth="3"/>{text(copy.summary[i],124,51,21,theme.muted)}{text(copy.summary[i+3],124,132,i===1?15:18,color)}<rect x="55" y="171" width="138" height="5" rx="3" fill={color} opacity=".2"/></g>)}</>}
    </svg><div style={{position:'absolute',right:15,bottom:8,fontSize:11,color:theme.muted,opacity:.75}}>{copy.illustration}</div>
  </div>;
};
