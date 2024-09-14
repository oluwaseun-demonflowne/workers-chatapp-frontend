import { useState } from "react";
import toast from "react-hot-toast";
import { useUploadThing } from "../../utils/uploadthing";

export const useChatImage = () => {
  const [loading, setLoading] = useState(false);
  // const [linkUrl, setLinkUrl] = useState("");
  const { startUpload } = useUploadThing("chatImageUpload", {
    onClientUploadComplete: async (res) => {
      console.log(res);
    },
    onUploadError: () => {
      toast.error("Error Updating file, ReUpload");
      setLoading(false);
    },
  });

  return {
    loading,
    // linkUrl,
    setLoading,
    startUpload,
  };
};
