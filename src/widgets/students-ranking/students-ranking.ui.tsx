import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
} from '@mui/material';

import { Link } from 'react-router-dom';
import { rankingQueries } from '~entities/ranking';

export function StudentsRanking() {
  const transformStudentData = (data: any[]) => {
    return data.map((student, index) => ({
      rank: index + 1,
      name: `${student.lastName} ${student.firstName}`,
      points: student.points,
      avatar: student.photo || 'https://via.placeholder.com/40',
      username: student.username,
    }));
  };

  // Пример использования
  const {
    data: studentsRanking,
    isLoading,
    isError,
  } = rankingQueries.useGetRankingByStudents();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching user data.</div>;
  }

  const studentRankings = transformStudentData(studentsRanking.data);

  const getMedalStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'font-bold';
      case 2:
        return 'font-bold';
      case 3:
        return 'font-bold';
      default:
        return 'text-gray';
    }
  };

  const getBackgroundColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-[#EFBF04]';
      case 2:
        return 'bg-[#C0C0C0]';
      case 3:
        return 'bg-[#CE8946]';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <TableContainer
      component={Paper}
      className="shadow-none border border-alto md:overflow-x-hidden md:max-w-full overflow-x-auto max-w-[350px] "
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Место</TableCell>
            <TableCell>Студент</TableCell>
            <TableCell align="right">Баллы</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentRankings.map((student) => (
            <TableRow key={student.rank} style={{ height: '64px' }}>
              <TableCell align="center" style={{ width: '50px' }}>
                {student.rank <= 3 ? (
                  <div className="relative">
                    <img
                      src={`/medal_${student.rank}.svg`}
                      alt={`Медаль за ${student.rank} место`}
                      className="w-15 h-15 max-w-15 min-w-15 max-h-15 min-h-15"
                    />
                    <div
                      className={`w-[18px] h-[18px] text-tundora absolute top-[13%] left-[30%] text-[12px] rounded-full font-bold flex justify-center items-center ${getBackgroundColor(
                        student.rank
                      )}`}
                    >
                      {student.rank}
                    </div>
                  </div>
                ) : (
                  <span
                    style={{
                      fontSize: '12px',
                      lineHeight: '64px',
                      fontWeight: 'bold',
                    }}
                  >
                    {student.rank}
                  </span>
                )}
              </TableCell>
              <TableCell>
                {student.rank <= 3 ? (
                  <div
                    className="flex items-center space-x-2"
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <Avatar src={student.avatar} alt={student.name} />
                    <div className="flex flex-col">
                      <span className={`${getMedalStyle(student.rank)}`}>
                        {student.name}
                      </span>
                      <Link
                        to="/"
                        className="font-semibold text-[13px] text-dove hover:underline hover:cursor-pointer"
                      >
                        @{student.username}
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div
                    className="flex items-center space-x-2"
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <Avatar src={student.avatar} alt={student.name} />
                    <div className="flex flex-col">
                      <span>{student.name}</span>
                      <Link
                        to="/"
                        className="font-semibold text-[13px] text-dove hover:underline hover:cursor-pointer"
                      >
                        @{student.username}
                      </Link>
                    </div>
                  </div>
                )}
              </TableCell>
              <TableCell align="right" className="font-bold text-tundora">
                {student.points}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
