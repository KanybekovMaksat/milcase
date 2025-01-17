import { Box, LinearProgress, Paper, Typography } from '@mui/material';

const usersData = {
  goals: [
    { id: 1, title: 'Завершить 10 домашних заданий', progress: 60 },
    { id: 2, title: 'Достигнуть 6 уровня', progress: 50 },
  ],
};

export function GoalList() {
  return (
    <Paper
      elevation={3}
      className="relative p-5 shadow-none border border-alto rounded-md"
    >
      <Box className="absolute inset-0 bg-black/70 flex items-center justify-center z-10 rounded-md">
        <Typography variant="h6" className="text-white font-bold text-center">
          Скоро <br />
          (В разработке)
        </Typography>
      </Box>
      <Typography variant="h6" className="font-bold mb-3">
        Прогресс целей
      </Typography>
      {usersData.goals.map((goal) => (
        <div key={goal.id} className="mb-4">
          <Typography variant="body2">{goal.title}</Typography>
          <LinearProgress variant="determinate" value={goal.progress} />
          <Typography variant="caption">{goal.progress}%</Typography>
        </div>
      ))}
    </Paper>
  );
}
