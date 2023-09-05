import { css, keyframes, styled } from 'styled-components';

export const SwipeWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
export const SwipeItem = styled.div<{
  $updateAnimate: boolean;
  $zIndex: number;
  $active: boolean;
  $maskImg: string;
  $transitionDuration: number;
  $maskPosition: NonNullable<MyValue<MaskSwipeProps, 'maskPosition'>>;
  $maskSize: string;
  $effectType: EffectType | null;
}>`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  border-radius: 10px;
  overflow: hidden;
  &:first-child {
    position: relative;
  }
  z-index: ${({ $zIndex }) => $zIndex};
  ${({ $maskImg, $active, $maskPosition, $maskSize }) =>
    $active
      ? css`
          mask-repeat: no-repeat;
          -webkit-mask-repeat: no-repeat;
          mask-position: ${$maskPosition.from};
          -webkit-mask-position: ${$maskPosition.from};
          mask-size: ${$maskSize};
          -webkit-mask-size: ${$maskSize};
          mask-image: ${$maskImg};
          -webkit-mask-image: ${$maskImg};
        `
      : null}
  ${({ $updateAnimate, $transitionDuration, $maskPosition, $effectType }) =>
    $updateAnimate
      ? css`
          animation: ${effectTypeFn($effectType, $maskPosition)}
            ${$transitionDuration}s linear 1;
          animation-fill-mode: forwards;
        `
      : null}
`;
export const Image = styled.img`
  width: 100%;
  height: 100%;
`;
export const Indicator = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  column-gap: 0.5rem;
  bottom: 40px;
  width: 100%;
  height: 15px;
  padding: 0 30px;
`;
const effectTypeFn = (
  effectType: EffectType | null,
  maskPosition: NonNullable<MyValue<MaskSwipeProps, 'maskPosition'>>
) => {
  if (effectType === 'conic') {
    return conicAnimate;
  } else if (effectType === 'radius') {
    return radiusAnimate;
  } else {
    return animateSlide(maskPosition);
  }
};
export const IndicatorItem = styled.div<{
  $active: boolean;
  $indicatorColor: PropertyColor;
  $indicatorActiveColor: PropertyColor;
}>`
  background-color: ${({ $active, $indicatorActiveColor, $indicatorColor }) =>
    $active ? $indicatorActiveColor : $indicatorColor};
  transition: background-color 0.3s ease;
`;
const animateSlide = (
  maskPosition: NonNullable<MyValue<MaskSwipeProps, 'maskPosition'>>
) => keyframes`
    to {
      mask-position: ${maskPosition.to};
      -webkit-mask-position: ${maskPosition.to};
    }
`;
const conicAnimate = keyframes`
  to { --angle: 370deg; }
`;
const radiusAnimate = keyframes`
  to { --radial-radius: 105%; }
`;
