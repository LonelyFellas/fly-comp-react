import React from 'react';
import MaskSwipe from './index';
import ReactDOM from 'react-dom/client';
// import png1 from '../assets/swipe/1.png';
// import png2 from '../assets/swipe/2.png';
// import png3 from '../assets/swipe/3.png';
// import png4 from '../assets/swipe/4.png';
import { assert } from 'console';
import { type } from 'os';
const imgList = [''];
const DemoComponent = () => {
  return (
    <div className="w-[800px] h-[600px]">
      <MaskSwipe imgList={imgList} maskImage="" />
    </div>
  );
};
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<DemoComponent />);
