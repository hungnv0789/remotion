import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { Title, Pill, Panel, Phase, Metric } from '../components/UI';
import { Beats, Photo, Ticker } from '../components/ProductionUI';
import { DownChart } from '../components/AiGraphics';
export const MarketScene:FC<SceneProps>=({theme,copy,assets,photo,production,scene})=>{
 const c=copy.market;const close=at(scene,'Kết phiên');const indices=at(scene,'Không chỉ');
 return <><Phase from={0} to={close}><Beats seconds={production.shotSeconds}>{[
  <div key="intraday"><Pill theme={theme}>{c.stocks}</Pill><div style={{height:30}}/><Title>{c.title}</Title><div style={{fontSize:145,fontWeight:800,color:theme.danger,letterSpacing:-7}}>{c.intraday}</div><div style={{fontSize:25,fontWeight:700,color:theme.muted,marginTop:18,lineHeight:1.5}}>{c.intradayLabel}</div><DownChart theme={theme}/></div>,
  <div key="chart"><Title>{c.title}</Title><DownChart theme={theme}/><div style={{fontSize:100,color:theme.danger,fontWeight:800,marginTop:20}}>{c.intraday}</div><div style={{fontSize:25,color:theme.muted,marginTop:15}}>{c.intradayLabel}</div></div>,
 ]}</Beats></Phase><Phase from={close} to={indices}><Pill theme={theme}>{c.closeLabel}</Pill><div style={{height:40}}/><Title size={86}>{c.stocks}</Title><div style={{fontSize:160,color:theme.danger,fontWeight:800,letterSpacing:-8}}>{c.close}</div><DownChart theme={theme} from={close}/></Phase><Phase from={indices}><Beats seconds={production.shotSeconds} from={indices}>{[
  <div key="indices"><Title>{c.indexTitle}</Title><Photo assets={assets} id={photo.market} credit={photo.marketCredit} height={350} theme={theme}/><div style={{display:'flex',gap:22,marginTop:28}}>{c.indices.map(name=><Panel key={name} theme={theme} style={{flex:1,fontSize:31,fontWeight:800,color:theme.danger}}>↓ {name}</Panel>)}</div><div style={{fontSize:24,color:theme.muted,marginTop:25}}>{c.direction}</div></div>,
  <div key="wide"><Title>{c.direction}</Title>{c.indices.map(name=><Panel key={name} theme={theme} style={{marginTop:25,color:theme.danger,fontSize:49,fontWeight:800}}>↓ {name}</Panel>)}<DownChart theme={theme}/></div>,
 ]}</Beats></Phase><Ticker text={copy.ticker} theme={theme}/></>;
};
