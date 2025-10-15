import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../services/userServices";
import type { UserData, CreateUserDto } from "../services/userServices";

// Query Keys
export const USER_QUERY_KEYS = {
  users: ["users"],
  user: (id: number) => ["user", id],
};

// Hook để fetch danh sách users
export const useUsers = () => {
  return useQuery<UserData[]>({
    queryKey: USER_QUERY_KEYS.users,
    queryFn: async () => {
      const users = await userService.getUsers();
      return users || [];
    },
  });
};

// Hook để fetch 1 user theo ID
export const useUser = (id: number) => {
  return useQuery<UserData>({
    queryKey: USER_QUERY_KEYS.user(id),
    queryFn: async () => {
      const user = await userService.getUserById(id);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    },
    enabled: !!id, // Chỉ fetch khi có id
  });
};

// Hook để tạo user mới
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newUser: CreateUserDto) => {
      const user = await userService.createUser(newUser);
      if (!user) {
        throw new Error("Failed to create user");
      }
      return user;
    },
    onSuccess: () => {
      // Invalidate và refetch danh sách users
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.users });
    },
  });
};

// Hook để update user
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<CreateUserDto> }) => {
      const user = await userService.updateUser(id, data);
      if (!user) {
        throw new Error("Failed to update user");
      }
      return user;
    },
    onSuccess: (updatedUser) => {
      // Update cache của danh sách users
      queryClient.setQueryData<UserData[]>(USER_QUERY_KEYS.users, (oldUsers = []) => {
        return oldUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
      });

      // Update cache của user detail
      queryClient.setQueryData(USER_QUERY_KEYS.user(updatedUser.id), updatedUser);
    },
  });
};

// Hook để xóa user
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const success = await userService.deleteUser(id);
      if (!success) {
        throw new Error("Failed to delete user");
      }
      return id;
    },
    onSuccess: (deletedId) => {
      // Xóa khỏi cache danh sách users
      queryClient.setQueryData<UserData[]>(USER_QUERY_KEYS.users, (oldUsers = []) => {
        return oldUsers.filter((user) => user.id !== deletedId);
      });

      // Xóa cache của user detail
      queryClient.removeQueries({ queryKey: USER_QUERY_KEYS.user(deletedId) });
    },
  });
};
