import Image from "next/image";
import LogoImg from "../../../public/Logo (Web).svg";

export function Logo() {
  return (
    <Image
      width="0"
      height="0"
      sizes="100vw"
      style={{ width: "10%", height: "auto" }}
      className="h-auto"
      alt="Hobby Explore Logo"
      src={LogoImg}
    />
  );
}
