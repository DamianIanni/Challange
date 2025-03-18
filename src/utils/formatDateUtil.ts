import {formatDistanceToNow} from 'date-fns';

export const getRelativeTime = (timestamp: string): string => {
  return formatDistanceToNow(new Date(timestamp), {addSuffix: true});
};
