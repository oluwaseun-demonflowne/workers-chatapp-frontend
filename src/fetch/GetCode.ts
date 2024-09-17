import { type Dispatch, type SetStateAction } from "react";

export const getCode = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  chatter: string,
  setOpenVerifyModal?: Dispatch<SetStateAction<boolean>>
) => {
  setLoading(true);

  try {
    const response = await fetch("/api/OtpEmail", {
      body: JSON.stringify({ email: chatter }),
      method: "POST"
    });
    if (response.status === 200) {
      setOpenVerifyModal && setOpenVerifyModal(true);
      //   setLoading(false);
    }
    if (response.status === 500) {
      setLoading(false);
      //   setOpenVerifyModal && setOpenVerifyModal(true);
    }
    //
    // setSenderEmail(chatter);
  } catch (error) {
    setLoading(false);
  }
};
