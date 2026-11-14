import type { FC } from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { CLAMP } from './UI';
import { BankGraphics } from './BankGraphics';
import { Ticker } from './ProductionUI';

export const SceneCard: FC<SceneProps & { index: number }> = ({ index, ...props }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { scene, copy, theme } = props;
  const shots = copy.scenes[index];
  const starts = shots.map((s) => s.anchor ? at(scene, s.anchor) : 0);
  const phase = starts.reduce((n, start, i) => f >= start ? i : n, 0);
  const shot = shots[phase];
  const local = f - starts[phase];
  const shotFrames = fps * props.production.shotSeconds;
  const beat = Math.floor(local / shotFrames);
  const sub = local % shotFrames;
  const entry = spring({ frame: local, fps, config: { damping: 22, stiffness: 190 } });
  const color = theme[shot.tone || 'accent'];
  const zoom = interpolate(sub, [0, 7, shotFrames - 1], [1.035, 1, 1.018], CLAMP);
  const flash = interpolate(local, [0, 2, 6], [.55, .14, 0], CLAMP);
  const metricScale = index === 4 ? 1 + Math.sin(Math.min(local, 18) / 18 * Math.PI) * .12 : .9 + entry * .1;
  return <div style={{ position: 'relative' }}>
    <div style={{ position: 'absolute', top: -33, right: 0, display: 'flex', gap: 8 }}>
      {shots.map((_, i) => <div key={i} style={{ width: i === phase ? 54 : 18, height: 5, borderRadius: 6, background: i === phase ? color : theme.border }} />)}
    </div>
    <div style={{ transform: `translateY(${(1 - entry) * 22}px)`, opacity: Math.min(1, entry) }}>
      <h1 style={{ fontSize: index === 0 && phase === 0 ? 83 : 64, lineHeight: 1.22, letterSpacing: -2.6, whiteSpace: 'pre-line', margin: '0 0 28px', fontWeight: 800, color: index === 0 ? color : theme.text }}>{shot.title}</h1>
      <div style={{ position: 'relative', transform: `scale(${zoom})`, filter: `blur(${interpolate(sub,[0,4],[2,0],CLAMP)}px)` }}>
        <BankGraphics kind={shot.graphic} props={props} color={color} beat={beat} />
        {shot.stamp && <div style={{ position: 'absolute', left: 50, bottom: 38, padding: '12px 21px', border: `6px solid ${theme.danger}`, color: theme.danger, fontSize: 36, fontWeight: 800, transform: `rotate(-12deg) scale(${Math.min(1.2, 1.5 - entry * .5)})`, opacity: Math.min(1, entry), background: '#FFFFFFDD' }}>{shot.stamp}</div>}
      </div>
      <div style={{ padding: '24px 28px', marginTop: 26, background: theme.panel, border: `2px solid ${color}35`, borderLeft: `7px solid ${color}`, borderRadius: 22 }}>
        <div style={{ fontSize: shot.value.length > 13 ? 62 : shot.value.length > 9 ? 75 : 112, fontWeight: 800, lineHeight: 1.12, letterSpacing: -3.5, color: index === 4 && local < 18 ? '#C68B28' : color, transform: `scale(${metricScale})`, transformOrigin: 'left center', whiteSpace: 'nowrap' }}>{shot.value}</div>
        <div style={{ fontSize: 22, lineHeight: 1.5, fontWeight: 700, color: theme.muted, marginTop: 13 }}>{shot.label}</div>
      </div>
      <div style={{ fontSize: 30, lineHeight: 1.45, marginTop: 24, fontWeight: 600, color: index === 7 && phase === 1 ? theme.accent : theme.text }}>{shot.detail}</div>
      <Ticker text={copy.ticker} theme={theme} />
    </div>
    <div style={{ position: 'absolute', inset: -15, background: 'white', opacity: flash, pointerEvents: 'none', borderRadius: 25 }} />
  </div>;
};
