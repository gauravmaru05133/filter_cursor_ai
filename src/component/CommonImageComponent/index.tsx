import React, { memo } from 'react';
import { Image, ImageProps, ImageStyle, StyleProp } from 'react-native';

export type CommonImageProps = {
  source: any; // require(...) or { uri: string }
  style?: StyleProp<ImageStyle>;
  resizeMode?: ImageProps['resizeMode'];
  fallback?: any; // require fallback image
};

const CommonImageComponent = ({
  source,
  style,
  resizeMode = 'cover',
  fallback,
  ...rest
}: CommonImageProps) => {
  const [error, setError] = React.useState(false);

  const isRemote =
    typeof source === 'object' && source?.uri !== undefined;

  return (
    <Image
      source={
        error
          ? fallback
            ? fallback
            : source
          : source
      }
      onError={() => setError(true)}
      resizeMode={resizeMode}
      style={style}
      {...rest}
    />
  );
};

// 🔥 Memo for performance
export const CommonImage = memo(CommonImageComponent);