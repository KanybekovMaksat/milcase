import { AchievementSchema } from './achievements.types';
import $api from '~shared/api';

export function getAchiviements() {
  return $api.get('achievements/');
}
