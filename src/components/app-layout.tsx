'use client';

import CustomNavbar from './navbar';
import BottomNavigation from './bottom-navigation';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="h-screen relative max-w-sm mx-auto">
      <CustomNavbar />
      <div className="overflow-y-scroll">{children}</div>
      <BottomNavigation />
    </div>
  );
};

export default AppLayout;
