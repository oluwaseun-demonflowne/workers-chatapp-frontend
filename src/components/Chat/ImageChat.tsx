import Image from "next/image";
import React, { type FC } from "react";
import { shimmer, toBase64 } from "../media/Shimmer";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

type ChatImages = {
  chatsImage: string[];
};

const ImageChat: FC<ChatImages> = ({ chatsImage }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {chatsImage.map((i, index) => (
        <div key={index} className="flex">
          <PhotoProvider>
          <PhotoView src={i}>
          <Image
            className="bg-black w-16 h-16 border border-gray-700 rounded-md"
            unoptimized
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(700, 475)
            )}`}
            src={i}
            alt=""
            width={0}
            height={0}
          />
          </PhotoView>
          </PhotoProvider>
        </div>
      ))}
    </div>
  );
};

export default ImageChat;
