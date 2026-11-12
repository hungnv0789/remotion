import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { Title, Phase, Pill } from '../components/UI';
import { Flow, PriceChart } from '../components/StockIllustrations';
export const HookScene: FC<SceneProps> = ({theme,copy,scene}) => {
  const c=copy.hook; const change=at(scene,'Thực tế');
  return <><Phase from={0} to={change}><Title>{c.title}</Title><Flow theme={theme} active={1} items={c.steps.map((label,i)=>({label,icon:(['shares','chart','coin'] as const)[i]}))} /></Phase><Phase from={change}><Title size={78}>{c.shift}</Title><PriceChart theme={theme} from={change} /><div style={{marginTop:35}}><Pill theme={theme}>{c.tag}</Pill></div></Phase></>;
};
