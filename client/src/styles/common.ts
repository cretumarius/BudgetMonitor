import { flex_design, boxShadow } from './mixins';
import { SHADOW, WHITE } from './colors';
import { SCREEN_WIDTH } from '_utils';

export const page = {
  flex: 1,
  // ...flex_design('column', 'flex-start'),
};

export const card = {
  backgroundColor: WHITE,
  ...boxShadow(SHADOW, { width: 0, height: 1 }, 3.0, 0.1),
};

export const borderBottomRadius = (radius: number) => ({
  borderBottomEndRadius: radius,
  borderBottomStartRadius: radius,
});

export const cardContainer = {
  paddingVertical: 30,
  // width: SCREEN_WIDTH,
  ...borderBottomRadius(12),
  ...card,
  ...flex_design('column', 'flex-start', 'center'),
};

export const borderTopRadius = (radius: number) => ({
  borderTopStartRadius: radius,
  borderTopEndRadius: radius,
});
