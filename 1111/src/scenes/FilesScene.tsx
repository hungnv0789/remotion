import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { Title, Pill, Panel, Reveal } from '../components/UI';
import { SymbolIcon } from '../components/MarketIllustrations';
export const FilesScene: FC<SceneProps> = ({theme,copy,scene}) => {
  const c=copy.files;
  return <><Title>{c.title}</Title><div style={{display:'flex',gap:40,alignItems:'center',marginBottom:35}}><SymbolIcon name="files" color={theme.accent} size={130} /><SymbolIcon name="search" color={theme.teal} size={130} /></div><Pill theme={theme}>{c.request}</Pill><Reveal from={at(scene,'Bởi vì')} style={{marginTop:30}}><Panel theme={theme}><div style={{display:'flex',gap:25}}>{[c.partyA,c.partyB].map((party,i)=><div key={party} style={{flex:1}}><div style={{fontSize:24,fontWeight:800,color:i?theme.teal:theme.accent}}>{party}</div><div style={{fontSize:25,lineHeight:1.5,marginTop:15}}>{c.actions[i]}</div></div>)}</div></Panel></Reveal><Reveal from={at(scene,'Rốt cuộc')} style={{marginTop:30}}><div style={{fontSize:46,lineHeight:1.3,fontWeight:800,whiteSpace:'pre-line'}}>{c.question}</div><div style={{fontSize:17,color:theme.muted,marginTop:20}}>{c.questionLabel}</div></Reveal></>;
};
