import { FC } from "react";
import Image from "next/image";

export const Footer: FC = () => {
  return (
    <footer
      className={
        "footer footer-center rounded p-3 md:p-5 lg:p-10 my-5 lg:my-10"
      }
    >
      <Image
        height={73}
        width={256}
        src={"/assets/logo-white.png"}
        alt={"MDUSTRIES Corp"}
      />
      <div className={"flex"}>
        <h6 className={"text-primary"}>Bro Fund Me</h6> ⓒ 2022 MDUSTRIES Corp.
      </div>
    </footer>
  );
};
