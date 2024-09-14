import { useEmailState } from "@/store";
import { Chat } from "@/types/chatType";
import { ListName, ListNameType } from "@/types/listTypes";

export const useList = () => {
    const {senderEmail} = useEmailState()
    const handleData = (names: Chat[]) => {
        const emailMap: ListNameType = {};
    
        console.log("e dey work")
    
        names.forEach((item) => {
          if (item.receiverEmail !== senderEmail) {
            console.log(item.message)
            if (emailMap[item.receiverEmail]) {
              emailMap[item.receiverEmail].message = item.message;
            } else
              [
                (emailMap[item.receiverEmail] = {
                  email: item.receiverEmail,
                  message: item.message,
                }),
              ];
          }
        });
        const unique = Object.values(emailMap) as ListName[];
      };
    
};
