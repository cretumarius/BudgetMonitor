import { Dimensions, PixelRatio } from 'react-native';
import { SHADOW } from './colors';

const WINDOW_WIDTH = Dimensions.get('window').width;
const guidelineBaseWidth = 375;

export const scaleSize = (size: number) => (WINDOW_WIDTH / guidelineBaseWidth) * size;

export const scaleFont = (size: number) => size * PixelRatio.getFontScale();

export function dimensions(top: number, right = top, bottom = top, left = right, property: string) {
  let styles: any = {};

  styles[`${property}Top`] = top;
  styles[`${property}Right`] = right;
  styles[`${property}Bottom`] = bottom;
  styles[`${property}Left`] = left;

  return styles;
}

export function margin(top: number, right: number | undefined, bottom: number | undefined, left: number | undefined) {
  return dimensions(top, right, bottom, left, 'margin');
}

export function padding(top: number, right: number | undefined, bottom: number | undefined, left: number | undefined) {
  return dimensions(top, right, bottom, left, 'padding');
}

export function boxShadow(color = SHADOW, offset = { height: 2, width: 2 }, radius = 8, opacity = 0.2) {
  return {
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: radius,
  };
}

export function flex_design(direction: any = 'row', justify: any = 'space-between', align: any = 'flex-start') {
  return {
    flexDirection: direction,
    justifyContent: justify,
    alignItems: align,
  };
}
