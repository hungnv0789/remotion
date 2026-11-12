import type { FC } from 'react';
import { useCurrentFrame } from 'remotion';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { Title, Metric, Pill, Reveal } from '../components/UI';
import { Building } from '../components/BusinessIllustrations';
export const RetailScene: FC<SceneProps> = ({theme,copy,scene}) => {
  const frame=useCurrentFrame();const c=copy.retail;const quarter=at(scene,'Riêng quý 3');const isQuarter=frame>=quarter;
  return <><Title>{c.title}</Title><Building theme={theme} kind="mall" /><Pill theme={theme}>{isQuarter?c.quarter:c.nineMonths}</Pill><div style={{marginTop:28}}><Metric theme={theme} value={isQuarter?c.q3Profit:c.profit} label={isQuarter?c.q3ProfitUnit:c.profitUnit} from={isQuarter?quarter:at(scene,'Sau 9 tháng')} /></div><Reveal from={isQuarter?quarter:at(scene,'25,1%')} style={{fontSize:40,color:theme.teal,fontWeight:800,marginTop:28}}>{isQuarter?c.q3Growth:c.growth}<span style={{fontSize:21,color:theme.muted,marginLeft:20}}>{c.growthUnit}</span></Reveal></>;
};
