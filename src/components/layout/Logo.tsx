import Image from "next/image";
import LogoImg from "../../../public/Logo (Web).svg";

export function Logo() {
  return (
    <Image width={150} height={150} alt="Hobby Explore Logo" src={LogoImg} />
  );
}
