import type { FC } from 'react';
import { Composition } from 'remotion';
import { MainVideo } from './MainVideo';
import { defaultProps, VIDEO } from './config';
import { getAudioDurationInSeconds } from '@remotion/media-utils';
import { staticFile } from 'remotion';
import { buildTimeline, getDurationInFrames } from './timing';

export const RemotionRoot: FC = () => (
  <Composition
    id="FinancialLiquidity"
    component={MainVideo}
    fps={VIDEO.fps}
    durationInFrames={Math.ceil(defaultProps.timing.audioDurationSeconds * VIDEO.fps)}
    calculateMetadata={async ({ props }) => {
      const duration = props.audio.voiceover
        ? await getAudioDurationInSeconds(
            /^https?:\/\//i.test(props.audio.voiceover)
              ? props.audio.voiceover
              : staticFile(props.audio.voiceover),
          )
        : 0;
      const resolvedProps = {
        ...props,
        timing: { ...props.timing, audioDurationSeconds: duration },
      };
      return {
        durationInFrames: getDurationInFrames(buildTimeline(resolvedProps, VIDEO.fps)),
        props: resolvedProps,
      };
    }}
    width={VIDEO.width}
    height={VIDEO.height}
    defaultProps={defaultProps}
  />
);
