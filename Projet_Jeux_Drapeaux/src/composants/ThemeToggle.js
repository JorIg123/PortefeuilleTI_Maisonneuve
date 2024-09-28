import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Button} from 'semantic-ui-react';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme}>
      Passer au thème {theme === 'clair' ? 'gris' : 'clair'} 
    </Button>
  );
};

export default ThemeToggle;