import { Title } from '~shared/ui/title';
import { Paper, Typography, Box, Grid, Divider, Link } from '@mui/material';
import { Table } from '~widgets/table';
import { Rules } from './ui/Rules.ui';

export function CoursePage() {
  return (
    <div style={{ padding: '20px' }}>
      <Title>Основы экономики, менеджмента и маркетинга в IT</Title>
      <Paper
        elevation={3}
        sx={{ padding: 3, marginBottom: 3 }}
        className="shadow-none border border-alto rounded-lg"
      >
        <div className="flex justify-between gap-5">
          <div>
            <img
              src="https://i.pinimg.com/736x/a8/ab/07/a8ab07e33c8e2630d92e71742cb97d98.jpg"
              alt="Course Cover"
              className="max-w-[200px] min-w-[200px] min-h-[200px] max-h-[200px] object-cover rounded-md"
            />
          </div>
          <Grid item xs={12} sm={8}>
            <Typography variant="h6">
              Основы экономики, менеджмента и маркетинга в IT
            </Typography>
            <Divider sx={{ marginBottom: 2, marginTop: 2 }} />
            <Typography variant="body1">
              Курс охватывает основные принципы экономики, управления и
              маркетинга в IT. Вы научитесь оценивать финансовые показатели,
              разрабатывать стратегии управления проектами и командами, а также
              изучите методы маркетинга для IT-продуктов.
            </Typography>
          </Grid>
        </div>
      </Paper>
      <Title>ПИМ-1-24</Title>
      <Table />
      <Rules />
      <Paper className="shadow-none my-5">
        <Typography variant="h6">Теоретическая информация</Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <Typography variant="body1">
          Программа и материалы курса находятся в боксе "Product Managemant":
        </Typography>
        <Box sx={{ marginTop: 2 }}>
          <iframe
            src="https://makalabox.com"
            width="100%"
            height="600px"
            style={{ border: 'none', borderRadius: '8px' }}
            title="Makalabox Embed"
          ></iframe>
        </Box>
      </Paper>
    </div>
  );
}
