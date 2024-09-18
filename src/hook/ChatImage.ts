import { type Dispatch, type SetStateAction, useState } from "react";
import { useUploadThing } from "../../utils/uploadthing";
import { toast } from "sonner";

export const useChatImage = (
  setArrayImages: Dispatch<SetStateAction<string[]>>
) => {
  const [loading, setLoading] = useState(false);
  // const [linkUrl, setLinkUrl] = useState("");
  const { startUpload } = useUploadThing("chatImageUpload", {
    onClientUploadComplete: async (res) => {
      const uploadedUrls = res.map((item) => item.url);
      setLoading(false);
      setArrayImages((prev) => [...prev, ...uploadedUrls]);
      toast.success("Image uploaded", { duration: 2000 });
    },
    onUploadError: (e) => {
      console.log(e);
      toast.error("Error Updating file, ReUpload", { duration: 2000 });
      setLoading(false);
      toast.error("Upload error");
    }
  });

  toast.dismiss();

  return {
    loading,
    // linkUrl,
    setLoading,
    startUpload
  };
};
