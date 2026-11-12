import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { Title, Pill, Phase, Item } from '../components/UI';
import { Icon } from '../components/SavingsIllustrations';
export const LiquidityScene: FC<SceneProps> = ({theme,copy,scene}) => {
  const c=copy.liquidity; const rest=at(scene,'Sự thảnh thơi');
  return <><Pill theme={theme}>{c.tag}</Pill><div style={{height:28}} /><Phase from={0} to={rest}><Title>{c.title}</Title>{c.items.map((item,i)=><Item key={item.title} theme={theme} number={`0${i+1}`} title={item.title} detail={item.detail} from={i?at(scene,'sự thuận tiện')+i*5:0} />)}</Phase><Phase from={rest}><Title>{c.restTitle}</Title><div style={{margin:'35px 0'}}><Icon name="moon" color={theme.accent} size={240} /></div><div style={{fontSize:25,fontWeight:700,color:theme.teal,lineHeight:1.6}}>{c.restLabel}</div></Phase></>;
};
