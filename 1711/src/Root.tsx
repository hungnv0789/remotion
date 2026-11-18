import type { FC } from 'react';
import { SCBComposition } from './SCBComposition';
import { Video1811Composition } from './video1811/Composition';

export const RemotionRoot: FC = () => (
  <>
    <Video1811Composition />
    <SCBComposition />
  </>
);
