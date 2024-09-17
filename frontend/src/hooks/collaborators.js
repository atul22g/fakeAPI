import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

import api from '../api';

export function useCollaborators(project) {
  return useQuery({
    queryKey: getKey(project.id),
    queryFn: () => api.collaborator.list(project.id),
    enabled: project != null,
    initialData: [],
  });
}

export function useAddCollaborator(project) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({email}) =>
      api.collaborator.add({email, projectId: project.id}),
    onSuccess: collaborator => {
      queryClient.setQueryData(getKey(project.id), old => {
        return old.find(c => c.email === collaborator.email)
          ? old
          : [collaborator, ...old];
      });
    },
  });
}

export function useRemoveCollaborator(collaborator) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.collaborator.remove(collaborator.id),
    onSuccess: () => {
      queryClient.setQueryData(
        getKey(collaborator.mock),
        (collaborators = []) =>
          collaborators.filter(c => c.id !== collaborator.id)
      );
    },
  });
}

export function useAcceptInvite(collaboratorId) {
  return useMutation({
    mutationFn: () => api.collaborator.accept(collaboratorId),
  });
}

function getKey(projectId) {
  return ['project', projectId, 'collaborators'];
}
