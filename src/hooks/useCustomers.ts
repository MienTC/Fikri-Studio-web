import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { customerService } from "../services/customerService";
import type { CreateCustomerDto, CustomerData } from "../services/customerService";

// Query Keys
export const CUSTOMER_QUERY_KEYS = {
  customers: ["customers"],
  customer: (id: number) => ["customer", id],
};

// Hook để fetch danh sách customers
export const useCustomers = () => {
  return useQuery<CustomerData[]>({
    queryKey: CUSTOMER_QUERY_KEYS.customers,
    queryFn: async () => {
      const result = await customerService.getCustomers();
      return result || [];
    },
  });
};

// Hook để fetch 1 customer theo ID
export const useCustomer = (id: number) => {
  return useQuery<CustomerData>({
    queryKey: CUSTOMER_QUERY_KEYS.customer(id),
    queryFn: async () => {
      const customer = await customerService.getCustomerById(id);
      if (!customer) {
        throw new Error("Customer not found");
      }
      return customer;
    },
    enabled: !!id, // Chỉ fetch khi có id
  });
};

// Hook để tạo customer mới
export const useCreateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newCustomer: CreateCustomerDto) => {
      const customer = await customerService.createCustomer(newCustomer);
      if (!customer) {
        throw new Error("Failed to create customer");
      }
      return customer;
    },
    onSuccess: () => {
      // Invalidate và refetch danh sách customers
      queryClient.invalidateQueries({ queryKey: CUSTOMER_QUERY_KEYS.customers });
    },
  });
};

// Hook để update customer
export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<CreateCustomerDto> }) => {
      const customer = await customerService.updateCustomer(id, data);
      if (!customer) {
        throw new Error("Failed to update customer");
      }
      return customer;
    },
    onSuccess: (updatedCustomer) => {
      // Update cache của danh sách customers
      queryClient.setQueryData<CustomerData[]>(CUSTOMER_QUERY_KEYS.customers, (oldCustomers = []) => {
        return oldCustomers.map((customer) =>
          customer.id === updatedCustomer.id ? updatedCustomer : customer
        );
      });

      // Update cache của customer detail
      queryClient.setQueryData(CUSTOMER_QUERY_KEYS.customer(updatedCustomer.id), updatedCustomer);
    },
  });
};

// Hook để xóa customer
export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const success = await customerService.deleteCustomer(id);
      if (!success) {
        throw new Error("Failed to delete customer");
      }
      return id;
    },
    onSuccess: (deletedId) => {
      // Xóa khỏi cache danh sách customers
      queryClient.setQueryData<CustomerData[]>(CUSTOMER_QUERY_KEYS.customers, (oldCustomers = []) => {
        return oldCustomers.filter((customer) => customer.id !== deletedId);
      });

      // Xóa cache của customer detail
      queryClient.removeQueries({ queryKey: CUSTOMER_QUERY_KEYS.customer(deletedId) });
    },
  });
};
