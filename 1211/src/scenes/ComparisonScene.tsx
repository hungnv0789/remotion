import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { calculateSavings, million, numberVi } from '../finance';
import { Title, Metric, Panel, Phase, Item } from '../components/UI';
export const ComparisonScene: FC<SceneProps> = ({theme,copy,finance,scene}) => {
  const c=copy.comparison; const monthly=at(scene,'tính ra'); const decision=at(scene,'Con số');
  const result=calculateSavings(finance.principal,finance.largeBankRate,finance.smallBankRate,finance.termYears);
  return <><Phase from={0} to={monthly}><Title>{c.title}</Title><Metric theme={theme} value={`+${million(result.difference)}`} label={`${copy.units.million} / ${finance.termYears} NĂM`} /><div style={{display:'flex',gap:24,marginTop:40}}>{[result.lowerInterest,result.higherInterest].map((amount,i)=><Panel key={i} theme={theme} style={{flex:1}}><div style={{fontSize:27,color:theme.muted}}>{i?c.second:c.first}</div><div style={{fontSize:71,fontWeight:800,color:i?theme.teal:theme.accent,marginTop:22}}>{million(amount)}</div><div style={{fontSize:21,color:theme.muted}}>{copy.units.million}</div></Panel>)}</div></Phase><Phase from={monthly} to={decision}><Title>{c.monthlyTitle}</Title><Metric theme={theme} value={`≈${numberVi(result.monthlyDifference / 1_000_000, 2)}`} label={copy.units.million} /><div style={{fontSize:26,color:theme.muted,marginTop:30}}>{c.monthlyLabel}</div></Phase><Phase from={decision}><Title>{c.takeaway}</Title>{c.details.map((title,i)=><Item key={title} theme={theme} number={`0${i+1}`} title={title} from={decision+i*5} />)}</Phase></>;
};
