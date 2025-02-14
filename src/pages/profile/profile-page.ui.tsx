import { Avatar, Typography, Paper, Chip } from '@mui/material';
import { userQueries } from '~entities/user';
import TollIcon from '@mui/icons-material/Toll';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';

import Box from '@mui/material/Box';
import { useState } from 'react';

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary' }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}


export function ProfilePage() {
  const [progress, setProgress] = useState(60);
  const {
    data: userData,
    isLoading,
    isError,
  } = userQueries.useLoginUserQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching user data.</div>;
  }

  console.log(userData.data);

  return (
    <div className="my-10 max-w-[400px]">
      <Paper
        elevation={3}
        sx={{ padding: 2 }}
        className="shadow-none border border-alto"
      >
        <div className="items-center">
          <div className="flex flex-col items-center">
            <Avatar
              alt={userData.data.firstName}
              src={userData.data.photo}
              sx={{ width: 100, height: 100 }}
            />
            <Typography variant="h6" className="text-center">
              {userData.data.firstName} {userData.data.lastName}
            </Typography>
          </div>

          <div className="mt-5 flex flex-col items-center">
            <div className="flex flex-col gap-4 ">
              <div className="flex gap-4">
                <Paper
                  className="max-w-[150px] min-w-[150px] shadow-none border border-alto"
                  elevation={2}
                  sx={{
                    padding: 1,
                    backgroundColor: '#e3f2fd',
                  }}
                >
                  <Chip
                    label="32"
                    color="primary"
                    className="text-white font-bold"
                    icon={<TollIcon className="text-alto" />}
                  />
                  <p className="text-[15px] font-bold text-tundora">
                    Накопленные баллы
                  </p>
                </Paper>
                <Paper
                  className="max-w-[150px] min-w-[150px] shadow-none border border-alto"
                  elevation={2}
                  sx={{
                    padding: 1,
                    backgroundColor: '#f1f8e9',
                    flex: 1,
                  }}
                >
                  <Chip
                    label="4"
                    color="primary"
                    className="text-white font-bold"
                    icon={<LoyaltyIcon className="text-alto" />}
                  />
                  <p className="text-[15px] font-bold text-tundora">
                    Куплено чехлов
                  </p>
                  <LinearProgressWithLabel value={progress} />
                </Paper>
              </div>
            </div>
          </div>

          <div className="mt-5  flex flex-col items-center"></div>
        </div>
      </Paper>
    </div>
  );
}
