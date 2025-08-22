// hooks/useUser.js
import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import * as mod from "../../url";
const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const data = JSON.parse(localStorage.getItem("lawvsuserinfo"));
  const token = data?.data?.token;
  const userId = data?.data?.userData?._id;
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${mod.api_url}/api/v1/user/get-user-byId/${userId}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setUser(data?.data);
      } catch (err) {
        console.error("Error fetching user:", err.response?.data || err);
        toast({
          title: "Error loading user",
          description:
            err.response?.data?.message || "Could not fetch user ",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    if (userId && token) fetchUserData();
  }, [userId, token]);

  return { user, setUser, loading, setLoading };
};

export default useUser;
