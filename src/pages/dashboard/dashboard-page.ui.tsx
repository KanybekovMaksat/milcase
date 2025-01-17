import { Typography, Paper } from '@mui/material';
import { userQueries } from '~entities/user';


export function DashboardPage() {
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

  return (
    <div className="my-10 flex flex-col gap-6">
      <Paper elevation={3} className="p-5 shadow-none border border-alto">
        <Typography variant="h5" className="font-bold">
          Добро пожаловать, {userData.data.firstName}!
        </Typography>
        <Typography variant="body1">
          Группа: {userData.data.group} • Баллы: {userData.data.points}
        </Typography>
      </Paper>
    </div>
  );
}
