import type { FC } from 'react';
import { Composition } from 'remotion';
import { MainVideo } from './MainVideo';
import { defaultProps, VIDEO } from './config';

export const RemotionRoot: FC = () => (
  <Composition
    id="FinancialLiquidity"
    component={MainVideo}
    fps={VIDEO.fps}
    durationInFrames={VIDEO.durationInFrames}
    width={VIDEO.width}
    height={VIDEO.height}
    defaultProps={defaultProps}
  />
);
