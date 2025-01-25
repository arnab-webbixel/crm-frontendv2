
import { Typography } from '@mui/material';
import useDarkMode from '@/hooks/useDarkMode';
const AppVersion = () => {
  // You can import the version directly from package.json or set it manually
  const version = "Beta";
  const [darkMode] = useDarkMode();

  // Dynamically adjust text color based on the current theme
  const textColor = darkMode ? 'white' : 'black';
  return (
    <Typography
      variant="caption"
      style={{
        position: 'relative',
        text: "left",
        color: textColor,
      }}
    className="rounded-full px-2 py-1"
    >
      Version: {version}
    </Typography>
  );
};

export default AppVersion;
