import type { FC } from 'react';
import { spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import type { SceneProps } from '../timing';
import { Title, Pill, CLAMP } from '../components/UI';
import { Exchange, Icon, Note } from '../components/FinanceGraphics';
export const HookScene:FC<SceneProps>=({theme,copy})=>{
 const frame=useCurrentFrame();const {fps}=useVideoConfig();const c=copy.hook;const seconds=frame/fps;
 const zoom=spring({frame:frame-3*fps,fps,config:{damping:17,stiffness:160}});
 if(seconds<1)return <><Pill theme={theme}>{c.label}</Pill><div style={{height:40}}/><Title size={104}>{c.title}</Title><Icon name="bank" color={theme.accent} size={210}/></>;
 if(seconds<3)return <><Title size={82}>{c.news}</Title><Exchange theme={theme} usd={copy.currency.usd} vnd={copy.currency.vnd} from={fps}/><Pill theme={theme}>{c.tag}</Pill></>;
 if(seconds<5)return <div style={{transform:`scale(${.78+.22*zoom})`,transformOrigin:'center'}}><Pill theme={theme}>{c.label}</Pill><div style={{height:45}}/><Title size={110}>{c.title}</Title><div style={{marginTop:40}}><Icon name="bank" color={theme.accent} size={220}/></div></div>;
 if(seconds<7)return <><Title size={82}>{c.news}</Title><div style={{textAlign:'center',margin:'30px 0 60px'}}><Icon name="bank" color={theme.accent} size={150}/></div><div style={{height:180,position:'relative'}}>{[-1,0,1].map(i=><div key={i} style={{position:'absolute',left:300,top:i===0?35:0,transform:`translateX(${i*interpolate(frame,[5*fps,7*fps],[0,280],CLAMP)}px)`}}><Note theme={theme} label={copy.currency.vnd} width={260}/></div>)}</div></>;
 return <><Title size={84}>{c.question}</Title><div style={{display:'flex',gap:30,marginTop:50}}>{['bank','wallet','chart'].map(name=><Icon key={name} name={name as 'bank'|'wallet'|'chart'} color={theme.teal} size={170}/>)}</div><div style={{marginTop:50}}><Pill theme={theme}>{c.tag}</Pill></div></>;
};
