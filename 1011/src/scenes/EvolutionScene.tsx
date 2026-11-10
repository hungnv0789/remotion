import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { Title, Pill, Item } from '../components/UI';
export const EvolutionScene: FC<SceneProps> = ({ theme, copy, scene }) => {
  const c = copy.evolution;
  return <><Pill theme={theme}>{c.tag}</Pill><div style={{ height: 30 }} /><Title>{c.title}</Title>{c.nodes.map((text,i)=><Item key={text} theme={theme} number={`0${i+1}`} title={text} from={at(scene,text)} />)}</>;
};
