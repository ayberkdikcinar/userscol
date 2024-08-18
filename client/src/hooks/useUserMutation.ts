import type { User } from '../services/types/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
const useUserMutation = (mutationFn: (user: User) => Promise<User>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export { useUserMutation };
