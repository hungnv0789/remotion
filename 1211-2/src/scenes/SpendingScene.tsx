import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { Title, Phase, Item, Pill } from '../components/UI';
import { Accumulation } from '../components/BehaviorIllustrations';
export const SpendingScene: FC<SceneProps> = ({theme,copy,scene}) => {
  const c=copy.spending; const shift=at(scene,'Vấn đề không');
  return <><Phase from={0} to={shift}><Title>{c.title}</Title>{c.items.map((title,i)=><Item key={title} theme={theme} number={`0${i+1}`} title={title} from={i*9} />)}<div style={{marginTop:32}}><Pill theme={theme}>{c.tag}</Pill></div></Phase><Phase from={shift}><Title size={64}>{c.shift}</Title><Accumulation theme={theme} /><div style={{fontSize:33,color:theme.accent,fontWeight:800,marginTop:40}}>{c.takeaway}</div></Phase></>;
};
