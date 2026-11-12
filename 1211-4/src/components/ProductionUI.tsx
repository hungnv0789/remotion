import type { FC, ReactNode } from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import type { SceneTiming } from '../timing';
import type { Theme } from './UI';
import { CLAMP } from './UI';
import { numberVi } from '../finance';
export const shotIndex = (frame:number, fps:number, seconds:number, from=0) => Math.max(0,Math.floor((frame-from)/(fps*seconds)));
export const Beats: FC<{children:ReactNode[];seconds:number;from?:number}> = ({children,seconds,from=0}) => {
 const f=useCurrentFrame();const {fps}=useVideoConfig();const n=shotIndex(f,fps,seconds,from);const local=(f-from)%(fps*seconds);
 return <div style={{opacity:interpolate(local,[0,4],[.6,1],CLAMP),transform:`translateY(${interpolate(local,[0,7],[9,0],CLAMP)}px)`}}>{children[n%children.length]}</div>;
};
export const Counter: FC<{value:number;label:string;theme:Theme;from?:number;size?:number}> = ({value,label,theme,from=0,size=148}) => {
 const frame=useCurrentFrame();const {fps}=useVideoConfig();const t=interpolate(frame-from,[0,Math.round(fps*.9)],[0,1],CLAMP);const scale=spring({frame:frame-from,fps,config:{damping:18}});
 return <div><div style={{fontSize:size,fontWeight:800,color:theme.accent,letterSpacing:-7,lineHeight:1.13,transform:`scale(${.94+.06*scale})`,transformOrigin:'left'}}>{numberVi(Math.round(value*t))}</div><div style={{fontSize:26,fontWeight:700,color:theme.muted,marginTop:18,lineHeight:1.5}}>{label}</div></div>;
};
export const phaseAt = (frame:number,anchors:number[]) => Math.max(0,anchors.map(x=>frame>=x).lastIndexOf(true));
export const localBeat = (scene:SceneTiming,frame:number,fps:number,seconds:number) => shotIndex(frame,fps,seconds);
