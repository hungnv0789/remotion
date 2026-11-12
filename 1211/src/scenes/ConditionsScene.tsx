import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { numberVi } from '../finance';
import { Title, Phase, Pill, Metric, Item, Panel } from '../components/UI';
import { Icon } from '../components/SavingsIllustrations';
export const ConditionsScene: FC<SceneProps> = ({theme,copy,finance,scene}) => {
  const c=copy.conditions; const terms=at(scene,'Rất nhiều'); const early=at(scene,'Chưa kể');
  return <><Pill theme={theme}>{c.tag}</Pill><div style={{height:28}} /><Phase from={0} to={terms}><Title>{c.title}</Title><Icon name="gift" color={theme.teal} size={150} /><div style={{marginTop:40}}><Metric theme={theme} value={`${numberVi(finance.smallBankRate)}%`} label={c.review} /></div></Phase><Phase from={terms} to={early}><Title>{c.title}</Title>{c.items.map((title,i)=><Item key={title} theme={theme} number={`0${i+1}`} title={title} from={terms+i*7} />)}<div style={{fontSize:29,color:theme.teal,fontWeight:700,marginTop:40}}>{c.review}</div></Phase><Phase from={early}><Title>{c.earlyTitle}</Title><Icon name="calendar" color={theme.accent} size={160} /><Panel theme={theme} style={{marginTop:38}}><div style={{fontSize:25,fontWeight:800,color:theme.danger}}>{c.early}</div><div style={{fontSize:35,lineHeight:1.45,fontWeight:700,marginTop:23}}>{c.earlyDetail}</div></Panel></Phase></>;
};
