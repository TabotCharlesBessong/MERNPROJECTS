const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { useMutation } from "react-query";

type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

export const useCreateUser = () => {
  const createUserRequest = async (user: CreateUserRequest) => {
    const response = await fetch(`${API_BASE_URL}/api/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("Failed to create user");
    }
  };

  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createUserRequest);

  return {
    createUser,
    isLoading,
    isError,
    isSuccess,
  };
};
