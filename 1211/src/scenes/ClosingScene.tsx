import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { Title, Pill, Phase } from '../components/UI';
import { BankVault } from '../components/SavingsIllustrations';
export const ClosingScene: FC<SceneProps> = ({theme,copy,scene}) => {
  const c=copy.closing; const end=scene.speechTo+9;
  return <><Phase from={0} to={end}><Title size={75}>{c.title}</Title><BankVault theme={theme} /><div style={{display:'flex',gap:14,flexWrap:'wrap',marginTop:30}}>{c.choices.map(text=><Pill key={text} theme={theme}>{text}</Pill>)}</div></Phase><Phase from={end}><Title size={79}>{c.final}</Title><BankVault theme={theme} /></Phase><div style={{fontSize:27,fontWeight:800,color:theme.accent,marginTop:48}}>{c.cta}</div></>;
};
