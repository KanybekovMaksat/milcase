import { Paper, Typography } from '@mui/material';
import React from 'react';

const FreeCases = ({ count }) => {
  return (
    <Paper
      elevation={3}
      sx={{ padding: 2 }}
      className="shadow-none border border-alto mx-auto"
    >
      <Typography variant="h6" className="text-center">
        Бесплатные чехлы
      </Typography>
      <p className="text-violet font-bold italic">
        {count !== 0
          ? 'Вам доступны бесплатные чехлы:'
          : 'Вам будут доступны бесплатные чехлы, если вы приобрели 7 чехлов'}{count === 0 ? "" : count}.
      </p>
    </Paper>
  );
};

export default FreeCases;
