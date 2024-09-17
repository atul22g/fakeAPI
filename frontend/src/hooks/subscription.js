import api from '../api';
import {useQuery} from '@tanstack/react-query';

export function useSubscriptionInfo(enabled) {
  return useQuery({
    queryKey: ['subscription'],
    queryFn: () => api.subscription.info(),
    enabled,
  });
}
