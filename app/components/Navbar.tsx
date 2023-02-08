import { FC } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export const Navbar: FC = () => {
  return (
    <nav className="flex justify-between items-center">
      <h1 className="text-3xl md:text-5xl text-primary">Bro Fund Me</h1>

      <WalletMultiButton />
    </nav>
  );
};
