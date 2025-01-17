import $api from '~shared/api';

export function getUserSubjects() {
  return $api.get('subjects/');
}

export function getSubjectDetail(){
  return $api.get('')
}
