import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// const auth = (req: Request) => ({ id: "fakeId" });

export const ourFileRouter = {
  chatImageUpload: f({ image: { maxFileSize: "32MB", maxFileCount: 4 } })
    // .middleware(async ({ req }) => {
    //   const user = await auth(req);

    //   if (!user) throw new UploadThingError("Unauthorized");

    //   return { userId: user.id };
    // })
    .onUploadComplete(async ({ file }) => {
      file;
      return;
    })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
