import Image from "next/image";
import React, { type Dispatch, type SetStateAction } from "react";
import { shimmer, toBase64 } from "../media/Shimmer";
import { MdCancel } from "react-icons/md";

type Props = {
  arrayImages: string[];
  setArrayImages: Dispatch<SetStateAction<string[]>>;
};

const PreUpload = ({ arrayImages, setArrayImages }: Props) => {
  const deleteImage = (name: string) => {
    const newArrImages = arrayImages.filter((i) => i !== name);
    setArrayImages(newArrImages);
  };
  return (
    <div className="flex">
      {arrayImages.map((i) => (
        <div key={i} className="flex relative">
          <MdCancel
            onClick={() => {
              deleteImage(i);
            }}
            className="absolute cursor-pointer right-1 top-1"
          />
          <Image
            className="bg-black w-16 h-16 shadow-md rounded-md"
            unoptimized={true}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(700, 475)
            )}`}
            src={i}
            alt=""
            width={0}
            height={0}
          />
        </div>
      ))}
    </div>
  );
};

export default PreUpload;
