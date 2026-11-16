import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { SceneCard } from '../components/SceneCard';

export const StocksScene: FC<SceneProps> = (props) => <SceneCard {...props} index={6} />;
