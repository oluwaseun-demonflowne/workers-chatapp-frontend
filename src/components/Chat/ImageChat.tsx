import Image from "next/image";
import React, { type FC } from "react";
import { shimmer, toBase64 } from "../media/Shimmer";

type ChatImages = {
  chatsImage: string[];
};

const ImageChat: FC<ChatImages> = ({ chatsImage }) => {
  return (
    <div>
      {chatsImage.map((i, index) => (
        <div key={index} className="flex">
          <Image
            className="bg-black w-16 h-16 border border-gray-700 rounded-md"
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

export default ImageChat;
