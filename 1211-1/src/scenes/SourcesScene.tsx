import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { Title, Panel, Reveal, Pill } from '../components/UI';
import { Icon } from '../components/StockIllustrations';
export const SourcesScene: FC<SceneProps> = ({theme,copy,scene}) => {
  const c=copy.sources;
  return <><Title>{c.title}</Title>{[[c.first,c.firstDetail,'chart'],[c.second,c.secondDetail,'coin']].map(([title,detail,icon],i)=><Reveal key={title} from={i*8} style={{marginTop:24}}><Panel theme={theme} style={{display:'flex',gap:30,alignItems:'center'}}><Icon name={icon as 'chart'|'coin'} color={i?theme.teal:theme.accent} size={115} /><div><div style={{fontSize:37,fontWeight:800}}>{title}</div><div style={{fontSize:26,color:theme.muted,marginTop:15,lineHeight:1.5}}>{detail}</div></div></Panel></Reveal>)}<div style={{marginTop:35}}><Pill theme={theme}>{c.center}</Pill></div></>;
};
