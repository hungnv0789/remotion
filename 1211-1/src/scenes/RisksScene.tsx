import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { Title, Pill, Item } from '../components/UI';
import { PriceChart } from '../components/StockIllustrations';
export const RisksScene: FC<SceneProps> = ({theme,copy,scene}) => {
  const c=copy.risks;
  return <><Pill theme={theme}>{c.tag}</Pill><div style={{height:28}} /><Title>{c.title}</Title><PriceChart theme={theme} rising={false} /><Item theme={theme} number="01" title={c.first} detail={c.firstDetail} from={at(scene,'Giá cổ phiếu')} /><Item theme={theme} number="02" title={c.second} detail={c.secondDetail} from={at(scene,'Doanh nghiệp')} /></>;
};
