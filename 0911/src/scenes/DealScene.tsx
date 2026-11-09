import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { at } from '../timing';
import { Reveal, Title, Photo, Pill } from '../components/UI';
export const DealScene: FC<SceneProps> = ({ copy, theme, images, scene }) => <><Reveal><Pill theme={theme}>{copy.deal.date}</Pill><div style={{ height: 26 }} /><Title>{copy.deal.title}</Title><Photo src={images.signing} caption={copy.deal.source} /><div style={{ fontSize: 34, lineHeight: 1.5, whiteSpace: 'pre-line', marginTop: 26, fontWeight: 600 }}>{copy.deal.subtitle}</div></Reveal><Reveal from={at(scene, 'Thương vụ')} style={{ marginTop: 25, fontSize: 29, color: theme.accent, fontWeight: 800 }}>{copy.deal.shift}</Reveal></>;
