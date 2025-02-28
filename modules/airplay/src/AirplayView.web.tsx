import * as React from 'react';

import { AirplayViewProps } from './Airplay.types';

export default function AirplayView(props: AirplayViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
