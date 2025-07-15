import React, { Suspense } from 'react';
import ThreeBackgroundContent from './ThreeBackgroundContent';
import ThreeSceneReady from './ThreeSceneReady';

const ThreeBackground = (props) => (
  <Suspense fallback={null}>
    <ThreeBackgroundContent {...props} />
    <ThreeSceneReady />
  </Suspense>
);

export default ThreeBackground;