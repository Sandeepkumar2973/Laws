import React, { useRef, useState, useEffect } from "react";
import { Flex, Avatar, useToast } from "@chakra-ui/react";
import axios from "axios";
import * as mod from "../../../url";
const ProfileAvatar = () => {
  const fileInputRef = useRef(null);
  const [userDetails, setUserDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const data = JSON.parse(localStorage.getItem("lawvsuserinfo"));
  const token = data?.data?.token;
  const userId = data?.data?.userData?._id;
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

      setUserDetails(data?.data);
      // console.log(user, "josjdddddddd");
    } catch (err) {
      console.error("Error fetching user:", err.response?.data || err);
      toast({
        title: "Error loading skill",
        description:
          err.response?.data?.message || "Could not fetch skill details",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  // Trigger file input when Avatar clicked
  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  // Handle file selection
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("profilePicture", file);

      const res = await axios.put(
        `${mod.api_url}/api/v1/user/${userDetails._id}/profile-image`,
        formData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      toast({
        title: "Profile image updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Update UI with new profile picture
      setUserDetails(res.data.user);
    } catch (err) {
      console.error(err);
      toast({
        title: "Failed to upload image",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex align="center" gap={4}>
      <Avatar
        size="xl"
        src={userDetails?.profilePicture}
        name={userDetails?.fullName}
        cursor="pointer"
        onClick={handleAvatarClick} // avatar clickable
      />

      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </Flex>
  );
};

export default ProfileAvatar;
