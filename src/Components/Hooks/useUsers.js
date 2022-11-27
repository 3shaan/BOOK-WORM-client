import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../Load & Error/Loading";

export const useUsers = (email) => {
        const { data: userData, isLoading } = useQuery({
          queryKey: ["userCheck"],
          queryFn: async () => {
            const data = await axios.get(
              `http://localhost:5000/users?email=${email}`
            );
            return data?.data?.result;
          },
        });
    return { userData, isLoading };
}