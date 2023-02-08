import { FC, PropsWithChildren } from "react";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={"m-5 lg:m-10"}>
      <Head>
        <title>Bro Fund Me</title>
        <meta
          name="description"
          content="A decentralized crowdfunding application on the Solana blockchain."
        />
      </Head>

      <ToastContainer theme={"dark"} />
      <Navbar />
      <div className={"divider"} />
      <main className={""}>{children}</main>
      <Footer />
    </div>
  );
};
