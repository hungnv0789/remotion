import type { FC } from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { CLAMP } from './UI';
import { IPOGraphics } from './IPOGraphics';

export const SceneCard: FC<SceneProps & { index: number }> = ({ index, ...props }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { scene, copy, theme } = props;
  const shots = copy.scenes[index];
  const starts = shots.map(s => s.anchor ? at(scene,s.anchor) : 0);
  const phase = starts.reduce((n,start,i) => f >= start ? i : n,0);
  const shot = shots[phase];
  const local = f-starts[phase];
  const shotFrames = fps*props.production.shotSeconds;
  const beat = Math.floor(local/shotFrames);
  const sub = local%shotFrames;
  const entry = spring({ frame: local, fps, config: { damping: 23, stiffness: 175 } });
  const color = index === 0 ? '#D3AEFF' : theme[shot.tone || 'accent'];
  const zoom = interpolate(sub,[0,8,shotFrames-1],[1.035,1,1.016],CLAMP);
  const pulse = interpolate(f-at(scene,shot.focus || '',0),[0,7,18],[1,1.1,1],CLAMP);
  const metricScale = index===0 && phase===0 ? pulse : .94+entry*.06;
  return <div style={{ position: 'relative' }}>
    <div style={{ position: 'absolute', top: -33, right: 0, display: 'flex', gap: 8 }}>{shots.map((_,i) => <div key={i} style={{ width: i===phase?54:18, height: 5, borderRadius: 6, background: i===phase?color:theme.border }} />)}</div>
    <div style={{ transform: `translateY(${(1-entry)*22}px)`, opacity: Math.min(1,entry) }}>
      <h1 style={{ fontSize: 62, lineHeight: 1.23, letterSpacing: -2.5, whiteSpace: 'pre-line', margin: '0 0 28px', fontWeight: 800 }}>{shot.title}</h1>
      <div style={{ transform: `scale(${zoom})`, filter: `blur(${interpolate(sub,[0,5],[2,0],CLAMP)}px)` }}>
        <IPOGraphics kind={shot.graphic} props={props} color={color} frame={local} beat={beat} />
      </div>
      <div style={{ padding: '24px 28px', marginTop: 26, background: theme.panel, border: `2px solid ${color}35`, borderLeft: `7px solid ${color}`, borderRadius: 22 }}>
        <div style={{ fontSize: shot.value.length>17 ? 48 : shot.value.length>13 ? 57 : shot.value.length>9 ? 70 : 106, fontWeight: 800, lineHeight: 1.15, letterSpacing: -3, color, transform: `scale(${metricScale})`, transformOrigin: 'left center', whiteSpace: 'nowrap' }}>{shot.value}</div>
        <div style={{ fontSize: 22, lineHeight: 1.5, fontWeight: 700, color: theme.muted, marginTop: 14 }}>{shot.label}</div>
      </div>
      <div style={{ fontSize: 29, lineHeight: 1.45, marginTop: 24, fontWeight: 600, color: index===6 && phase===2 ? theme.accent : theme.text }}>{shot.detail}</div>
      <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', marginTop: 28, padding: '16px 0', borderTop: `2px solid ${theme.border}`, borderBottom: `2px solid ${theme.border}`, fontSize: 21, color: theme.accent, fontWeight: 800 }}><div style={{ width: 4500, transform: `translateX(${-(f*1.5)%1500}px)` }}>{copy.ticker.repeat(4)}</div></div>
    </div>
    <div style={{ position: 'absolute', inset: -12, pointerEvents: 'none', borderRadius: 25, background: 'white', opacity: interpolate(local,[0,2,6],[.4,.1,0],CLAMP) }} />
  </div>;
};
