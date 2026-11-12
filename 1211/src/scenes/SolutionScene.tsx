import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { Title, Item } from '../components/UI';
import { SplitMoney } from '../components/SavingsIllustrations';
export const SolutionScene: FC<SceneProps> = ({theme,copy}) => {
  const c=copy.solution;
  return <><Title>{c.title}</Title><SplitMoney theme={theme} />{c.lanes.map((title,i)=><Item key={title} theme={theme} number={`0${i+1}`} title={title} from={i*6} />)}<div style={{fontSize:25,color:theme.teal,fontWeight:700,marginTop:30}}>{c.end}</div></>;
};
