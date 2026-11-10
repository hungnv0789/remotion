import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { Title, Item } from '../components/UI';
import { Icon } from '../components/Illustrations';
export const CapitalScene: FC<SceneProps> = ({ theme, copy, scene }) => {
  const c = copy.capital;
  return <><Title>{c.title}</Title><div style={{ display: 'flex', gap: 50, margin: '30px 0' }}><Icon name="coin" color={theme.accent} size={160} /><Icon name="bank" color={theme.teal} size={160} /></div><Item theme={theme} number="01" title={c.first} detail={c.firstDetail} from={at(scene,'Một,')} /><Item theme={theme} number="02" title={c.second} detail={c.secondDetail} from={at(scene,'Hai,')} /><div style={{ fontSize: 24, fontWeight: 700, color: theme.accent, marginTop: 40 }}>{c.focus}</div></>;
};
