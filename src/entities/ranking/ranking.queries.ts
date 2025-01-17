import { getRankingByGroups, getRankingByStudents } from './ranking.api';
import {
  useQuery,
  queryOptions as tsqQueryOptions,
} from '@tanstack/react-query';

const keys = {
  root: () => ['ranking'],
  getGroups: () => [...keys.root(), 'groups'] as const,
  getStudents: () => [...keys.root(), 'students'] as const,
};

// export const userService = {
//   queryKey: () => keys.root(),

//   removeCache: () => queryClient.removeQueries({ queryKey: keys.root() }),

//   getCache: () => queryClient.getQueryData<Comment[]>(userService.queryKey()),

//   setCache: (user: UserDtoSchema) =>
//     queryClient.setQueryData(userService.queryKey(), user),

//   queryOptions: () => {
//     const userKey = userService.queryKey();
//     return tsqQueryOptions({
//       queryKey: userKey,
//       queryFn: async () => loginUserQuery,
//       initialDataUpdatedAt: () =>
//         queryClient.getQueryState(userKey)?.dataUpdatedAt,
//     });
//   },

//   prefetchQuery: async () =>
//     queryClient.prefetchQuery(userService.queryOptions()),

//   ensureQueryData: async () =>
//     queryClient.ensureQueryData(userService.queryOptions()),
// };

export function useGetRankingByGroups() {
  return useQuery({
    queryKey: keys.getGroups(),
    queryFn: getRankingByGroups,
  });
}

export function useGetRankingByStudents() {
  return useQuery({
    queryKey: keys.getStudents(),
    queryFn: getRankingByStudents,
  });
}
