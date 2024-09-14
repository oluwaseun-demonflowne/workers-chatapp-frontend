import { useChatImage } from "@/hook/ChatImage";
import React, { type Dispatch, type SetStateAction } from "react";
import { MdOutlineBrowseGallery } from "react-icons/md";

type Props = {
  arrayImages: string[];
  setArrayImages: Dispatch<SetStateAction<string[]>>;
};

const ImageChat = ({ setArrayImages, arrayImages }: Props) => {
  const { loading, setLoading } = useChatImage();
  return (
    <div className="">
      <input
        id="upload"
        type="file"
        className="hidden  border-input placeholder:text-muted-foreground focus-visible:ring-ring  h-16 w-16 z-50 rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 p-4  file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1  disabled:cursor-not-allowed disabled:opacity-50"
        onChange={async (e) => {
          //   setLoading(true);
          const filhaha = e.target.files?.[0];

          // we can't send undefined
          if (!filhaha) {
            setLoading(false);
            throw new Error("Error");
          }

          // we only want to send 4 files nothing more
          if (arrayImages.length === 4) {
            setLoading(false);
            throw new Error("Can't upload anymore");
          }

          // Let us find duplicate file in the list
          const findDuplicate = arrayImages.find(
            (i) => i === URL.createObjectURL(filhaha)
          );
          console.log(findDuplicate);
          if (findDuplicate !== undefined) {
            setLoading(false);
            throw new Error("Don't upload duplicate");
          }
          setArrayImages((prev) => [...prev, URL.createObjectURL(filhaha)]);
          // for (const xFile of arrayImages) {
          //   await startUpload([xFile]);
          // }
        }}
      />
      {!loading && (
        <label
          className="text-base cursor-pointer font-semibold rounded-md  justify-center px-3 py-2  text-[#73adff] z-10 flex items-center gap-1"
          htmlFor="upload"
        >
          <MdOutlineBrowseGallery className="text-2xl text-slate-600" />
        </label>
      )}
      {loading && (
        <label
          className="text-xs pointer-events-none opacity-10 cursor-pointer font-semibold rounded-md  z-10 justify-center px-3 py-2 text-[#73adff] flex items-center gap-1"
          htmlFor="upload"
        >
          <MdOutlineBrowseGallery className="text-2xl text-slate-600" />
        </label>
      )}
    </div>
  );
};

export default ImageChat;
