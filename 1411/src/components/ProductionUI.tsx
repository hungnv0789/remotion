import type { FC, ReactNode } from 'react';
import { Img, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { CLAMP, mediaSource, type Theme } from './UI';
import type { VideoProps } from '../config';
export const shotIndex=(frame:number,fps:number,seconds:number,from=0)=>Math.max(0,Math.floor((frame-from)/(fps*seconds)));
export const Beats:FC<{children:ReactNode[];seconds:number;from?:number}>=({children,seconds,from=0})=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const n=shotIndex(f,fps,seconds,from);const local=(f-from)%(fps*seconds);
 return <div style={{opacity:interpolate(local,[0,4],[.7,1],CLAMP),transform:`translateY(${interpolate(local,[0,6],[8,0],CLAMP)}px)`}}>{children[n%children.length]}</div>;
};
export const Photo:FC<{assets:VideoProps['assets'];id:string;credit:string;height?:number;theme:Theme}>=({assets,id,credit,height=440,theme})=>{
 const photo=assets.find(a=>a.id===id);if(!photo)throw new Error('Thiếu ảnh '+id);
 return <div style={{borderRadius:25,overflow:'hidden',background:theme.panel}}><Img src={mediaSource(photo.src)} style={{width:'100%',height,display:'block',objectFit:'cover',objectPosition:'center 28%'}}/><div style={{fontSize:17,color:theme.muted,padding:'14px 18px'}}>{credit}</div></div>;
};
export const Ticker:FC<{text:string;theme:Theme}>=({text,theme})=>{
 const frame=useCurrentFrame();return <div style={{overflow:'hidden',whiteSpace:'nowrap',marginTop:35,padding:'16px 0',borderTop:`2px solid ${theme.border}`,borderBottom:`2px solid ${theme.border}`,fontSize:22,color:theme.accent,fontWeight:800}}><div style={{width:4400,transform:`translateX(${-(frame*2)%1500}px)`}}>{text.repeat(4)}</div></div>;
};
