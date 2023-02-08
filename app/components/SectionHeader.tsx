import { FC } from "react";

export const SectionHeader: FC<{ text: string }> = ({ text }) => {
  return (
    <>
      <h1 className={"text-4xl md:text-5xl text-center text-secondary"}>
        {text}
      </h1>
      <div className={"divider"} />
    </>
  );
};
