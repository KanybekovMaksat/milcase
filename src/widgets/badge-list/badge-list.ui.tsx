import { Paper, Typography } from "@mui/material";

type Achievement = {
  id: string;
  name: string;
  photo: string;
};

type BadgeListProps = {
  achievements: Achievement[];
};

export function BadgeList({ achievements }: BadgeListProps) {
  return (
    <Paper elevation={3} className=" p-5 shadow-none border border-alto">
      <Typography variant="h6" className="font-bold mb-3">
        Последние достижения
      </Typography>
      <div className="max-w-[320px] flex justify-center  gap-4">
        {achievements.map((ach) => (
          <div key={ach.id} className="flex flex-col items-center">
            <img src={ach.photo} alt={ach.name} className="w-16 h-16" />
            <Typography variant="body2" className="text-center">
              {ach.name}
            </Typography>
          </div>
        ))}
      </div>
    </Paper>
  );
}
