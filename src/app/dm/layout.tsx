export default function Layout({
  chat,
  list,
}: {
  chat: React.ReactNode;
  list: React.ReactNode;
}) {
  return (
    <div className="flex bg-[#6b8a7a] justify-center items-center h-screen">
      {list}
      {chat}
    </div>
  );
}
