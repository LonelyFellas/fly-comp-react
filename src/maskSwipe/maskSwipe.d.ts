import { CSSProperties } from 'react';
declare global {
  type direction = 'left' | 'right' | 'center';
  type EffectType = 'radius' | 'conic' | 'linear';
  type MyValue<K extends object, V extends keyof K> = K[V];
  type PropertyColor = import('csstype').Property.Color;
  type PropertyMaskPosition = import('csstype').Property.MaskPosition;
  interface MaskSwipeProps {
    imgList: string[];
    duration?: number;
    transitionDuration?: number;
    maskPosition?: {
      from: PropertyMaskPosition;
      to: PropertyMaskPosition;
    };
    maskImage?: string;
    effectType?: EffectType;
    indicatorPosition?: direction;
    indicatorColor?: PropertyColor;
    indicatorActiveColor?: PropertyColor;
    showIndicator?: boolean;
    maskSize?: string;
  }
  interface MaskReducerStates {
    indexList: number[];
    currentIndex: number;
    transIndex: 0;
    updateAnimate: boolean;
  }
  interface MaskReducerActions {
    type:
      | 'rotate-index-list'
      | 'change-current-index'
      | 'update-animate'
      | 'change-trans-index';
    value?: any;
  }
}

export default function MaskSwipe(props: MaskSwipeProps): JSX.Element;
