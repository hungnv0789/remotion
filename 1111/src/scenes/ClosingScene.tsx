import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { Title, Metric, Phase } from '../components/UI';
import { Capitol, Flow, MarketChart } from '../components/MarketIllustrations';
export const ClosingScene: FC<SceneProps> = ({theme,copy,scene}) => {
  const c=copy.closing; const date=at(scene,'mùng 3'); const end=scene.speechTo+9;
  return <><Phase from={0} to={date}><Title>{c.title}</Title><Capitol theme={theme} /><Flow theme={theme} active={2} items={c.steps.map((label,i)=>({label,icon:(['people','search','bank'] as const)[i]}))} /></Phase><Phase from={date} to={end}><Title>{c.title}</Title><Capitol theme={theme} /><div style={{marginTop:40}}><Metric theme={theme} value={c.date} label={c.dateLabel} /></div></Phase><Phase from={end}><Title size={82}>{c.final}</Title><MarketChart theme={theme} from={end} height={270} /><div style={{fontSize:40,fontWeight:700,lineHeight:1.45,whiteSpace:'pre-line',marginTop:35}}>{c.question}</div><div style={{fontSize:27,fontWeight:800,color:theme.accent,marginTop:40}}>{c.cta}</div></Phase></>;
};
