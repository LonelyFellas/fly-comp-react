import React, { memo, useEffect, useMemo, useReducer, useState } from 'react';
import {
  SwipeWrapper,
  SwipeItem,
  IndicatorItem,
  Image,
  Indicator,
} from './maskSwipe.styled';
import { directionMap, reducer } from './helper';

const MaskSwipe: React.FC<MaskSwipeProps> = ({
  imgList = [],
  duration = 4,
  transitionDuration = 1,
  maskPosition = {
    from: 'left',
    to: 'right',
  },
  maskImage = '',
  effectType = null,
  indicatorPosition = 'center',
  indicatorColor = 'gray',
  indicatorActiveColor = 'black',
  showIndicator = true,
  maskSize = 'cover',
}) => {
  const initialIndexList = useMemo(() => {
    let arr = [];
    for (let i = imgList.length; i > 0; i--) {
      arr.push(i);
    }
    return arr;
  }, [imgList]);
  const [{ indexList, currentIndex, updateAnimate, transIndex }, dispatch] =
    useReducer(reducer, {
      indexList: initialIndexList,
      currentIndex: 0,
      updateAnimate: false,
      transIndex: 0,
    });

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch({ type: 'update-animate', value: true });
      setTimeout(() => {
        dispatch({ type: 'change-trans-index', value: 'transIndex' });
      }, -2 * transitionDuration * 1000);
      setTimeout(() => {
        dispatch({ type: 'change-current-index', value: 'currentIndex' });
        dispatch({ type: 'update-animate', value: false });
        dispatch({ type: 'rotate-index-list' });
      }, transitionDuration * 1000 + 120); // 120ms delay for the transition animation
    }, duration * 1000);
    return () => {
      intervalId && clearInterval(intervalId);
    };
  }, []);
  const maskImgFn = (index: number) => {
    if (currentIndex !== index) return '';
    if (effectType === 'conic') {
      return `conic-gradient(
        transparent 0deg,
        transparent calc(var(--angle) - 10deg),
        #fff calc(var(--angle) + 10deg),
        #fff 360deg
      )
  `;
    } else if (effectType === 'radius') {
      return `radial-gradient(circle,
        transparent calc(var(--radial-radius) - 5%),
        #fff calc(var(--radial-radius) + 5%))`;
    } else if (effectType === 'linear') {
      return maskImage;
    } else {
      return `url('${maskImage}')`;
    }
  };
  return (
    <div className="relative">
      <SwipeWrapper>
        {imgList.map((img, index) => (
          <SwipeItem
            key={index}
            $updateAnimate={updateAnimate}
            $zIndex={indexList[index]}
            $active={index === currentIndex}
            $maskImg={maskImgFn(index)}
            $maskPosition={maskPosition}
            $transitionDuration={transitionDuration}
            $maskSize={maskSize}
            $effectType={effectType}
          >
            <Image src={img} alt="swipe item's images" />
          </SwipeItem>
        ))}
        {showIndicator ? (
          <Indicator
            style={{
              zIndex: imgList.length + 1,
              justifyContent: directionMap[indicatorPosition],
            }}
          >
            {Array.from({ length: imgList.length }).map((_, index) => (
              <IndicatorItem
                key={index}
                $active={index === transIndex}
                $indicatorColor={indicatorColor}
                $indicatorActiveColor={indicatorActiveColor}
                className="h-[15px] w-[15px] rounded-full"
              ></IndicatorItem>
            ))}
          </Indicator>
        ) : null}
      </SwipeWrapper>
    </div>
  );
};
export default memo(MaskSwipe);
