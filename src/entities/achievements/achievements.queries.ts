import { getAchiviements } from './achievements.api';
import { useQuery } from '@tanstack/react-query';

const keys = {
  root: () => ['achievements'],
  getAchievement: () => [...keys.root(), 'getAchievement'] as const,
};

export function useAchievements() {
  return useQuery({
    queryKey: keys.root(),
    queryFn: getAchiviements,
  });
}
