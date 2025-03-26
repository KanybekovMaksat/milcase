import { Avatar, Typography, Paper, Chip, Button } from '@mui/material';
import { userQueries } from '~entities/user';
import TollIcon from '@mui/icons-material/Toll';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { removeCookie } from 'typescript-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { pathKeys } from '~shared/lib/react-router';
import CakeIcon from '@mui/icons-material/Cake';
import { parse, differenceInDays, format } from 'date-fns'; // Импортируем функции из date-fns
import { ru } from 'date-fns/locale'; // Импортируем русскую локализацию



function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

const getNextBirthday = (birthdate) => {
  const currentYear = new Date().getFullYear();
  const parsedBirthday = parse(birthdate, 'yyyy-MM-dd', new Date()); // Парсим строку даты
  const nextBirthday = new Date(parsedBirthday.setFullYear(currentYear));

  // Если день рождения в этом году уже прошел, устанавливаем на следующий год
  if (nextBirthday < new Date()) {
    nextBirthday.setFullYear(currentYear + 1);
  }

  return nextBirthday;
};

const formattedBirthday = format(new Date('2025-02-06'), 'd MMMM yyyy', { locale: ru });

export function ProfilePage() {
  const [progress, setProgress] = useState(60);
  const [timeLeft, setTimeLeft] = useState('');
  const navigate = useNavigate();
  const {
    data: userData,
    isLoading,
    isError,
  } = userQueries.useLoginUserQuery();

  const handleLogout = () => {
    removeCookie('access');
    localStorage.removeItem('refreshMilcase');
    navigate(`${pathKeys.home()}`);
    userQueries.userService.removeCache();
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching user data.</div>;

  const birthdate = userData?.data?.birthdate; // Проверка на существование

  useEffect(() => {
    if (!birthdate) return; // Проверка перед запуском эффекта

    const interval = setInterval(() => {
      const nextBirthday = getNextBirthday(birthdate);
      const diff = nextBirthday - new Date();
      const daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hoursLeft = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft(`${daysLeft} дней ${hoursLeft} часов ${minutesLeft} минут`);
    }, 1000);

    return () => clearInterval(interval);
  }, [birthdate]); // Используем только `birthdate` в зависимостях

  return (
    <div className="my-10 max-w-[400px] mx-auto">
      <Paper elevation={3} sx={{ padding: 2 }} className="shadow-none border border-alto mx-auto">
        <div>
          <div className="flex flex-col items-center">
            <Typography variant="h6" className="text-center">
              {userData.data.firstName} {userData.data.lastName}
            </Typography>
          </div>

          <div className="mt-5 flex flex-col items-center">
            <div className="flex flex-col gap-4">
              <Paper className="max-w-[310px] shadow-none border border-alto" elevation={2} sx={{ padding: 1, backgroundColor: '#e3f2fd' }}>
                <p className="text-[15px] font-medium text-tundora mb-[5px]">
                  До <span className='font-bold text-violet'>{formattedBirthday} </span> остается:
                </p>
                <Chip
                  label={`${timeLeft}`}
                  color="primary"
                  className="text-white mx-auto"
                  icon={<CakeIcon className="text-alto" />}
                />
              </Paper>
              <div className="flex gap-[10px]">
                <Paper className="max-w-[150px] min-w-[150px] shadow-none border border-alto" elevation={2} sx={{ padding: 1, backgroundColor: '#e3f2fd' }}>
                  <Chip label="32" color="primary" className="text-white font-bold" icon={<TollIcon className="text-alto" />} />
                  <p className="text-[15px] font-bold text-tundora">Накопленные баллы</p>
                </Paper>
                <Paper className="max-w-[150px] min-w-[150px] shadow-none border border-alto" elevation={2} sx={{ padding: 1, backgroundColor: '#f1f8e9', flex: 1 }}>
                  <Chip label="4" color="primary" className="text-white font-bold" icon={<LoyaltyIcon className="text-alto" />} />
                  <p className="text-[15px] font-bold text-tundora">Куплено чехлов</p>
                  <LinearProgressWithLabel value={progress} />
                </Paper>
              </div>
              <Link className='text-violet underline' to={pathKeys.loyalty()}>Подробнее о наших скидках</Link>
              <Button variant='contained' className='bg-milk shadow-none' onClick={handleLogout}>Выйти</Button>
            </div>
          </div>
        </div>
      </Paper>
      <Paper elevation={3} sx={{ padding: 2 }} className="shadow-none border border-alto mx-auto">
        <Typography variant="h6" className="text-center">История покупок</Typography>
      </Paper>
    </div>
  );
}
