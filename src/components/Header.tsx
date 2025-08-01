
import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Header: React.FC = () => {
  const { themeName, setThemeName } = useTheme();

  return (
    <header >
     
      <div >
          <select
            value={themeName}
            onChange={(e) => setThemeName(e.target.value as any)}
            // className="p-2 border rounded"
            className="p-2 border rounded bg-white text-black"
          >
            <option value="theme1">Theme 1</option>
            <option value="theme2">Theme 2</option>
            <option value="theme3">Theme 3</option>
          </select>
      </div>
      
    </header>
  );
};

export default Header;
