import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { Title, Item, Phase } from '../components/UI';
import { Cityscape } from '../components/Illustrations';
export const ClosingScene: FC<SceneProps> = ({ theme, copy, scene }) => {
  const c = copy.closing; const ending = scene.speechTo + 9;
  return <><Phase from={0} to={ending}><Title>{c.title}</Title><Cityscape theme={theme} infrastructure />{c.items.map((title,i)=><Item key={title} theme={theme} title={title} number={`0${i+1}`} from={at(scene,['bất động sản dòng tiền','đô thị vệ tinh','Hạ tầng'][i])} />)}<div style={{ fontSize: 17, color: theme.muted, marginTop: 28 }}>{c.note}</div></Phase><Phase from={ending}><Title size={88}>{c.final}</Title><Cityscape theme={theme} infrastructure /><div style={{ fontSize: 40, lineHeight: 1.5, fontWeight: 700, whiteSpace: 'pre-line', marginTop: 40 }}>{c.question}</div><div style={{ color: theme.accent, fontSize: 27, fontWeight: 800, marginTop: 36 }}>{c.cta}</div></Phase></>;
};
