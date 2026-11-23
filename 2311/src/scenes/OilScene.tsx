import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { SceneCard } from '../components/SceneCard';

export const OilScene: FC<SceneProps> = props => <SceneCard {...props} index={7} />;
