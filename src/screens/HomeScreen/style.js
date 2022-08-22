import {StyleSheet} from 'react-native';
import Colors from '~assets/colors';
import {pxScale} from '~utils/funcHelper';

export default StyleSheet.create({
  button: {
    backgroundColor: Colors.Yellow,
    width: pxScale.wp(100),
    height: pxScale.hp(40),
    borderRadius: 6,
    marginTop: pxScale.hp(5),
  },
});
