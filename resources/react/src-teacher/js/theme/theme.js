import Colors from 'material-ui/lib/styles/colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing from 'material-ui/lib/styles/spacing';
import zIndex from 'material-ui/lib/styles/zIndex';

export default {
  spacing: Spacing,
  zIndex,
  fontFamily: 'Roboto, Noto Sans JP, sans-serif',
  palette: {
    primary1Color: 'rgb(17, 25, 142)',
    primary2Color: Colors.indigo700,
    primary3Color: Colors.lightBlack,
    accent1Color: '#00BCD4',
    accent2Color: Colors.indigo50,
    accent3Color: Colors.grey500,
    textColor: Colors.darkBlack,
    alternateTextColor: Colors.white,
    canvasColor: Colors.white,
    borderColor: Colors.grey300,
    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
    pickerHeaderColor: Colors.cyan500,
  }
};
