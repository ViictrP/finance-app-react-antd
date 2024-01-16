import {ReactNode} from 'react';

const BottomNav = ({children}: { children?: ReactNode }) => {
  return (
    <div style={{
      height: 60,
      backgroundColor: 'ButtonFace',
      position: 'fixed',
      bottom: 0,
      right: 0,
      left: 0,
      zIndex: 1
    }}>
      {children}
    </div>
  );
};

export default BottomNav;
