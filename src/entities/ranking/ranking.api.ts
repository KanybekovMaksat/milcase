import $api from '~shared/api';

export function getRankingByGroups() {
  return $api.get('rating/groups/');
}

export function getRankingByStudents() {
  return $api.get('rating/users/');
}
