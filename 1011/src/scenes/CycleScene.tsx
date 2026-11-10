import type { FC } from 'react';
import { useCurrentFrame } from 'remotion';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { Title, Pill } from '../components/UI';
import { Flow } from '../components/Illustrations';
export const CycleScene: FC<SceneProps> = ({ theme, copy, scene }) => {
  const frame = useCurrentFrame(); const c = copy.cycle;
  const active = frame >= at(scene, 'đầu tư tiếp') ? 3 : frame >= at(scene, 'giá đất') ? 2 : 1;
  return <><Title>{c.title}</Title><Flow theme={theme} active={active} items={c.nodes.map((label,i)=>({ label, icon: (['bank','rail','city','coin'] as const)[i] }))} /><div style={{ marginTop: 35 }}><Pill theme={theme}>↻ {c.loop}</Pill></div><div style={{ fontSize: 27, color: theme.muted, marginTop: 26 }}>{c.note}</div></>;
};
