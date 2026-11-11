import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { Title, Metric, Phase, Pill } from '../components/UI';
import { MarketChart, SymbolIcon } from '../components/MarketIllustrations';
export const PivotScene: FC<SceneProps> = ({theme,copy,scene}) => {
  const c=copy.pivot; const change=at(scene,'Vậy cái nhóm');
  return <><Phase from={0} to={change}><Title>{c.title}</Title><Metric theme={theme} value={c.value} label={c.label} /><MarketChart theme={theme} height={260} /></Phase><Phase from={change}><Pill theme={theme}>{c.tag}</Pill><div style={{height:32}} /><Title>{c.techTitle}</Title><SymbolIcon name="chip" color={theme.accent} size={180} /><MarketChart theme={theme} from={change} height={230} /><div style={{fontSize:18,color:theme.muted}}>{copy.illustration}</div></Phase></>;
};
