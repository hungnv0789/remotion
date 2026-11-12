import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { Title, Phase, Metric, Item, Pill } from '../components/UI';
import { Icon } from '../components/BehaviorIllustrations';
export const CarScene: FC<SceneProps> = ({theme,copy,scene}) => {
  const c=copy.car; const cost=at(scene,'Nhưng chiếc xe');
  return <><Phase from={0} to={cost}><Title>{c.title}</Title><Icon name="car" color={theme.accent} size={180} /><div style={{marginTop:30}}><Metric theme={theme} value={c.amount} label={c.unit} from={at(scene,'150–200')} /></div></Phase><Phase from={cost}><Title>{c.costTitle}</Title><div style={{margin:'15px 0'}}><Icon name="car" color={theme.accent} size={140} /></div>{c.costs.map((title,i)=><Item key={title} theme={theme} number={`0${i+1}`} title={title} from={at(scene,'Có thêm xe')+i*8} />)}<div style={{marginTop:35}}><Pill theme={theme}>{c.note}</Pill></div></Phase></>;
};
