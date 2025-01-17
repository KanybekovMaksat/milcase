import { getUserSubjects } from './subject.api';
import {

  useQuery,
  queryOptions as tsqQueryOptions,
} from '@tanstack/react-query';

const keys = {
  root: () => ['subjects'],
  subject: () => [...keys.root(), 'subject'] as const,
};


export function useLoginUserQuery() {
  return useQuery({
    queryKey: keys.subject(),
    queryFn: getUserSubjects,
  });
}

