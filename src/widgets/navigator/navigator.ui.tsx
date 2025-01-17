import { useState } from 'react';
import { Paper } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SchoolIcon from '@mui/icons-material/School';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { pathKeys } from '~shared/lib/react-router';

export function Navigator() {
  const [value, setValue] = useState(0);

  const navigate = useNavigate();

  const handleNavigation = (newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate(pathKeys.home());
        break;
      case 1:
        navigate(pathKeys.course.root());
        break;
      case 2:
        navigate(pathKeys.ranking());
        break;
      case 3:
        navigate(pathKeys.profile.root());
        break;
      default:
        break;
    }
  };
  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
      elevation={5}
      className="shadow-none md:hidden"
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          handleNavigation(newValue);
        }}
      >
        <BottomNavigationAction label="Главная" icon={<HomeRoundedIcon />} />
        <BottomNavigationAction label="Курсы" icon={<SchoolIcon />} />
        <BottomNavigationAction
          label="Рейтинг"
          icon={<BarChartRoundedIcon />}
        />

        <BottomNavigationAction label="Профиль" icon={<AccountCircleIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
