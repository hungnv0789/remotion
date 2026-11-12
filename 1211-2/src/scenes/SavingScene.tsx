import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { Title, Phase, Item } from '../components/UI';
import { Accumulation, Icon } from '../components/BehaviorIllustrations';
export const SavingScene: FC<SceneProps> = ({theme,copy,scene}) => {
  const c=copy.saving; const home=at(scene,'có khi');
  return <><Phase from={0} to={home}><Title>{c.title}</Title><Accumulation theme={theme} />{c.items.map((title,i)=><Item key={title} theme={theme} number={`0${i+1}`} title={title} from={i?at(scene,'Người biết ưu tiên')+(i-1)*8:0} />)}</Phase><Phase from={home}><Title>{c.home}</Title><Icon name="home" color={theme.teal} size={250} /></Phase></>;
};
