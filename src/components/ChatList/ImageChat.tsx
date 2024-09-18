"use client";
import { useChatImage } from "@/hook/ChatImage";
import React, { type Dispatch, type SetStateAction } from "react";
import toast from "react-hot-toast";
import { MdOutlineBrowseGallery } from "react-icons/md";
import { toast as toastson } from "sonner";

type Props = {
  arrayImages: string[];
  setArrayImages: Dispatch<SetStateAction<string[]>>;
};

const ImageChat = ({ setArrayImages }: Props) => {
  // const [linkUrl, setLinkUrl] = useState("");
  const { loading, setLoading, startUpload } = useChatImage(setArrayImages);
  return (
    <div className="">
      <input
        id="upload"
        type="file"
        multiple
        max={4}
        className="hidden  border-input placeholder:text-muted-foreground focus-visible:ring-ring  h-16 w-16 z-50 rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 p-4  file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1  disabled:cursor-not-allowed disabled:opacity-50"
        onChange={async (e) => {
          setLoading(true);
          const file = e.target.files;
          if (!file) {
            toast.error("File not available");
            setLoading(false);
            return;
          }
          if (file.length > 4) {
            toast.error("You can upload up to 4 images at a time");
            setLoading(false);
            return;
          }
          toastson.loading("Images are being prepared");
          await startUpload(Array.from(file));
          toastson.dismiss();
        }}
      />
      {!loading && (
        <label
          className="text-base cursor-pointer font-semibold rounded-md  justify-center px-3 py-2  text-[#73adff] z-10 flex items-center gap-1"
          htmlFor="upload">
          <MdOutlineBrowseGallery className="text-2xl text-slate-600" />
        </label>
      )}
      {loading && (
        <label
          className="text-xs pointer-events-none opacity-10 cursor-pointer font-semibold rounded-md  z-10 justify-center px-3 py-2 text-[#73adff] flex items-center gap-1"
          htmlFor="upload">
          <MdOutlineBrowseGallery className="text-2xl text-slate-600" />
        </label>
      )}
    </div>
  );
};

export default ImageChat;
