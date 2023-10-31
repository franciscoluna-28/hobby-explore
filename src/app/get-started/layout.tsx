export default function GetStartedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="p-16 h-screen items-center flex flex-col justify-center">
      <div className="p-6 bg-white border shadow-md rounded-2xl h-full">
        {children}
      </div>
    </main>
  );
}

{/*       <Image
        width={150}
        height={50}
        alt="Hobby Explore Logo"
        className="mb-4"
        src="/logo-web-black.svg"
      ></Image> */}
