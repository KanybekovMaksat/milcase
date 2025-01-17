import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, CardContent, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { userQueries } from '~entities/user';

interface ChartDataPoint {
  date: string;
  score: number;
}

export const Chart: React.FC = () => {
  const {
    data: performanceData,
    isLoading,
    isError,
  } = userQueries.useGetUserPerfomanceChart();

  const fakeData: ChartDataPoint[] = [
    { date: '01-01', score: 3 },
    { date: '01-15', score: 5 },
    { date: '02-01', score: 5 },
    { date: '02-15', score: 8 },
    { date: '03-01', score: 3 },
  ];

  const transformData = (data: { date: string; grade: number }[]) => {
    if (!data || data.length === 0) {
      return fakeData;
    }
    return data.map((item) => ({
      date: item.date.slice(5),
      score: item.grade,
    }));
  };

  const chartData: ChartDataPoint[] = performanceData
    ? transformData(performanceData.data)
    : fakeData;

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'line',
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    dataLabels: { enabled: true },
    stroke: { curve: 'smooth' },
    xaxis: {
      categories: chartData.map((data) => data.date),
      title: { text: 'Даты' },
    },
    yaxis: {
      max: 10,
      min: 0,
      tickAmount: 5,
      title: { text: 'Баллы' },
    },
    colors: ['#0589c7'],
    tooltip: { shared: true },
  };

  const series = [
    {
      name: 'Score',
      data: chartData.map((data) => data.score),
    },
  ];

  const isFakeData = performanceData?.data.length === 0;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching user data.</div>;
  }

  return (
    <Card className="max-w-[320px] min-w-[320px] shadow-none rounded-lg border border-alto relative">
      <div className="flex items-center px-5 gap-2">
        <Typography variant="h6" className="text-lg font-semibold mb-3 pt-4">
          График успеваемости
        </Typography>
        <TrendingUpIcon className="border rounded border-alto" />
      </div>
      {isFakeData && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-10">
          <Typography variant="body1" className="text-white">
            Недостаточно данных
          </Typography>
        </div>
      )}
      <CardContent className="p-0">
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={350}
        />
      </CardContent>
    </Card>
  );
};
