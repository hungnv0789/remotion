import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { Title, Phase, Item, Pill } from '../components/UI';
import { Capitol, Flow } from '../components/MarketIllustrations';
export const CongressScene: FC<SceneProps> = ({theme,copy,scene}) => {
  const c=copy.congress; const change=at(scene,'quyền điều tra');
  return <><Phase from={0} to={change}><Title>{c.title}</Title><Capitol theme={theme} /><Pill theme={theme}>{c.chamber} · {c.tag}</Pill>{c.powers.map((title,i)=><Item key={title} theme={theme} number={`0${i+1}`} title={title} from={i<2?at(scene,'Quyền dùng tiền'):at(scene,'Và có một điều')} />)}</Phase><Phase from={change}><Title>{c.investigation}</Title><div style={{height:40}} /><Flow theme={theme} active={0} items={c.steps.map((label,i)=>({label,icon:(['files','bank','search'] as const)[i]}))} /></Phase></>;
};
