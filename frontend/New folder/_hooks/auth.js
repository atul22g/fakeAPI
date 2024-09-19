import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

import api from '../api';

export function useRequestPasswordRest() {
  return useMutation({
    mutationFn: email => api.auth.requestPasswordRest(email),
  });
}

export function useResetPassword(token) {
  return useMutation({
    mutationFn: password => api.auth.resetPassword({password, token}),
  });
}
