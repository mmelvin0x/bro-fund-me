import { FC } from "react";
import { SectionHeader } from "./SectionHeader";

export const InstructionsSection: FC = () => {
  return (
    <section className={"my-5 lg:my-10"}>
      <SectionHeader text={"Instructions"} />

      <h2 className={"text-3xl text-secondary"}>Creating a Campaign</h2>
      <p className={"mb-5"}>
        To create a campaign connect your Solana wallet and fill in the{" "}
        <span className={"font-bold text-accent"}>Campaign Name</span> and{" "}
        <span className={"font-bold text-accent"}>Campaign Description</span>{" "}
        inputs on the left and click{" "}
        <span className={"font-bold text-accent"}>CREATE A CAMPAIGN</span>. Your
        wallet will have you approve the transaction. The amount paid in this
        transaction is the amount of rent in ◎ necessary to open an account on
        the Solana Blockchain. After your campaign is created it will show in
        the <span className={"font-bold text-accent"}>Your Campaign</span>{" "}
        section.{" "}
        <span className={"font-bold text-accent"}>
          Note: you can only have one campaign per wallet.
        </span>
      </p>

      <h2 className={"text-3xl text-secondary"}>Donating to Campaigns</h2>
      <p className={"mb-5"}>
        To donate to a campaign click the{" "}
        <span className={"font-bold text-accent"}>DONATE</span> button on that
        campaign. Enter the amount in ◎ that you would like to donate. The
        minimum donation amount is 0.01 ◎ and the maximum is 1,000,000,000 ◎.
        After you have entered the desired amount, click{" "}
        <span className={"font-bold text-accent"}>DONATE</span>. Your wallet
        should appear for you to Approve the transaction.
      </p>

      <h2 className={"text-3xl text-secondary"}>
        Withdrawing from your Campaign
      </h2>
      <p className={"mb-5"}>
        To withdraw from your campaign click the{" "}
        <span className={"font-bold text-accent"}>WITHDRAW</span> button on that
        campaign. Enter the amount in ◎ that you would like to withdraw. The
        maximum withdraw amount is total amount deposited in the campaign. Once
        you have entered the desired amount, click{" "}
        <span className={"font-bold text-accent"}>WITHDRAW</span>. Your wallet
        should appear for you to{" "}
        <span className={"font-bold text-accent"}>Approve</span> the
        transaction. Withdrawing all of the funds does NOT close the campaign.
        It can be donated too again.
      </p>
    </section>
  );
};
