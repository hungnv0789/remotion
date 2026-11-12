import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { Title, Panel, Reveal } from '../components/UI';
import { Icon } from '../components/BusinessIllustrations';
export const SectorsScene: FC<SceneProps> = ({theme,copy,scene}) => {
  const c=copy.sectors;
  return <><Title>{c.title}</Title>{[[c.pearl,c.pearlDetail,'hotel'],[c.retail,c.retailDetail,'mall']].map(([label,detail,icon],i)=><Reveal key={label} from={i?at(scene,'Một bên khai thác'):0} style={{marginTop:25}}><Panel theme={theme} style={{display:'flex',gap:28,alignItems:'center'}}><Icon name={icon as 'hotel'|'mall'} color={i?theme.teal:theme.accent} size={120} /><div><div style={{fontSize:30,fontWeight:800,lineHeight:1.4}}>{label}</div><div style={{fontSize:25,color:theme.muted,lineHeight:1.5,marginTop:15}}>{detail}</div></div></Panel></Reveal>)}<div style={{fontSize:29,fontWeight:700,color:theme.accent,marginTop:40,lineHeight:1.5}}>{c.end}</div></>;
};
