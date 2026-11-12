import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { Title, Pill } from '../components/UI';
import { Building } from '../components/BusinessIllustrations';
export const ClosingScene: FC<SceneProps> = ({theme,copy}) => {
  const c=copy.closing;
  return <><Title size={76}>{c.title}</Title><Building theme={theme} kind="mall" /><div style={{marginTop:35}}><Pill theme={theme}>{c.note}</Pill></div><div style={{fontSize:27,color:theme.accent,fontWeight:800,marginTop:45}}>{c.cta}</div></>;
};
