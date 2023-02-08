import { FC } from "react";
import { Campaign, CampaignListSectionProps } from "../utils/types";
import { CampaignCard } from "./CampaignCard";
import { SectionHeader } from "./SectionHeader";

export const CampaignListSection: FC<CampaignListSectionProps> = ({
  campaigns,
  getCampaigns,
  isDonate,
  loading,
  setLoading,
}) => {
  return (
    <section className={"mt-5 mb-10 lg:my-10"}>
      {!!campaigns.length && (
        <>
          <SectionHeader text={isDonate ? "Campaigns" : "Your Campaign"} />

          <div
            className={`grid ${
              campaigns.length > 1 ? "lg:grid-cols-2 xl:grid-cols-3" : ""
            } gap-3 md:gap-5 lg:gap-10`}
          >
            {campaigns.map((it: Campaign) => (
              <CampaignCard
                campaign={it}
                getCampaigns={getCampaigns}
                isDonate={isDonate}
                key={it.pubkey.toString()}
                loading={loading}
                setLoading={setLoading}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};
