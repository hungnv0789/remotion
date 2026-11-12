import type { FC } from 'react';
import { useCurrentFrame } from 'remotion';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { Title, Phase, Pill } from '../components/UI';
import { Flow, Icon } from '../components/BehaviorIllustrations';
export const DebtScene: FC<SceneProps> = ({theme,copy,scene}) => {
  const frame=useCurrentFrame(); const c=copy.debt; const out=at(scene,'Cứ mắc');
  return <><Phase from={0} to={out}><Title>{c.title}</Title><Flow theme={theme} items={c.nodes} active={frame>=at(scene,'Đến lúc')?3:frame>=at(scene,'Thiếu thì')?2:1} /><div style={{marginTop:32}}><Pill theme={theme}>↻ {c.label}</Pill></div></Phase><Phase from={out}><Title>{c.takeaway}</Title><Icon name="coin" color={theme.danger} size={240} /><div style={{marginTop:45}}><Pill theme={theme}>{c.label}</Pill></div></Phase></>;
};
