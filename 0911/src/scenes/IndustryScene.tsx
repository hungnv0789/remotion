import type { FC } from 'react';
import { useCurrentFrame } from 'remotion';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { Panel, Title, Train, Reveal, Pill } from '../components/UI';
export const IndustryScene: FC<SceneProps> = ({ theme, copy, scene }) => {
  const frame = useCurrentFrame(); const c = copy.industry;
  if (frame >= scene.speechTo + 12) return <Reveal from={scene.speechTo + 12}><Pill theme={theme}>{copy.hook.unit}</Pill><div style={{ height: 35 }} /><Title>{c.final}</Title><Train theme={theme} /><div style={{ fontSize: 46, fontWeight: 700, lineHeight: 1.3, whiteSpace: 'pre-line', marginTop: 35 }}>{c.question}</div><div style={{ color: theme.accent, fontSize: 27, fontWeight: 800, marginTop: 40 }}>{c.cta}</div></Reveal>;
  const markers = [0, at(scene, 'giảm'), at(scene, 'chuỗi')];
  return <><Title>{c.title}</Title><Train theme={theme} />{c.items.map((item, i) => <Reveal key={item} from={markers[i]} style={{ marginTop: 22 }}><Panel theme={theme} style={{ display: 'flex', alignItems: 'center', gap: 26 }}><span style={{ fontSize: 42, color: theme.accent, fontWeight: 800 }}>0{i + 1}</span><span style={{ fontSize: 32, lineHeight: 1.4, fontWeight: 600 }}>{item}</span></Panel></Reveal>)}<div style={{ fontSize: 18, marginTop: 32, color: theme.muted }}>{c.note}</div></>;
};
