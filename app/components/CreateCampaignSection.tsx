import { FC } from "react";
import { CreateCampaignForm } from "./CreateCampaignForm";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { CreateCampaignProps } from "../utils/types";
import { SectionHeader } from "./SectionHeader";
import { useWallet } from "@solana/wallet-adapter-react";

export const CreateCampaignSection: FC<CreateCampaignProps> = ({
  loading,
  getCampaigns,
  setLoading,
}) => {
  const { connected } = useWallet();

  return (
    <section className={"my-5 lg:my-10"}>
      <SectionHeader text={"Create a Campaign"} />

      {connected && (
        <CreateCampaignForm
          loading={loading}
          getCampaigns={getCampaigns}
          setLoading={setLoading}
        />
      )}

      {!connected && (
        <div className={"flex flex-col items-center"}>
          <p className={"my-5 text-center"}>
            Connect your wallet to create a campaign
          </p>
          <WalletMultiButton />
        </div>
      )}
    </section>
  );
};
