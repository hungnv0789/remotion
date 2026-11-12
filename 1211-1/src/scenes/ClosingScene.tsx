import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { Title, Pill, Phase } from '../components/UI';
import { Icon } from '../components/StockIllustrations';
export const ClosingScene: FC<SceneProps> = ({theme,copy,scene}) => {
  const c=copy.closing; const end=scene.speechTo+8;
  return <><Phase from={0} to={end}><Title>{c.title}</Title></Phase><Phase from={end}><Title size={86}>{c.final}</Title></Phase><div style={{margin:'35px 0'}}><Icon name="shield" color={theme.accent} size={230} /></div><div style={{display:'flex',gap:15,flexWrap:'wrap'}}>{c.themes.map(label=><Pill key={label} theme={theme}>{label}</Pill>)}</div><div style={{fontSize:27,fontWeight:800,color:theme.teal,marginTop:45}}>{c.endLine}</div></>;
};
