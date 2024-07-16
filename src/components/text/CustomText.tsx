import {Text} from 'react-native';
import {Colors} from '../../utils/colors/colors';
import {FC} from 'react';
import {CustomTextPropTypes} from './types';

const CustomText: FC<CustomTextPropTypes> = ({
  color,
  size,
  text,
  style,
  lineHeight,
  numberOfLines,
  fontWeight,
}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        {
          color: color || Colors.black,
          fontSize: size || 12,
          fontWeight: fontWeight || '500',
          ...(lineHeight && {lineHeight: lineHeight}),
        },
        style,
      ]}>
      {text}
    </Text>
  );
};
export default CustomText;
