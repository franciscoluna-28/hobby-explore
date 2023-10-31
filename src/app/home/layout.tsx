import Image from "next/image";
import Link from "next/link";
import { BsCompassFill } from "react-icons/bs";

type Props = {
  children: React.ReactNode;
};

export default function HomeLayout({ children }: Props) {
  return (
    <main>
      <header className="bg-mainGreen flex h-16 items-center m-auto px-4 ">
        <Image
          alt="Hobby Explore logo"
          className=""
          width={200}
          height={100}
          src="/logo-web-white.svg"
        ></Image>

        <div className="justify-center m-auto h-full">
          <div className="relative h-full flex items-center">
            <Link
              className="text-white text-normal relative font-bold flex gap-2 items-center"
              href="/"
            >
              <BsCompassFill /> Explore
            </Link>
            <div className="absolute h-1 w-full bottom-0 bg-white"></div>
          </div>
        </div>
      </header>
      {children}
    </main>
  );
}
