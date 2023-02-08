import type { NextPage } from "next";
import { toast } from "react-toastify";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { Campaign } from "../utils/types";
import { callGetCampaignsRPCMethod } from "../utils/api";
import { InstructionsSection } from "../components/InstructionsSection";
import { CreateCampaignSection } from "../components/CreateCampaignSection";
import { CampaignListSection } from "../components/CampaignListSection";
import { Layout } from "../components/Layout";

const Home: NextPage = () => {
  const { connected, publicKey } = useWallet();
  const [loading, setLoading] = useState<boolean>(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [yourCampaigns, setYourCampaigns] = useState<Campaign[]>([]);

  const getCampaigns = async () => {
    try {
      setLoading(true);
      const fetchedCampaigns =
        (await callGetCampaignsRPCMethod()) as Campaign[];
      setLoading(false);
      setCampaigns(fetchedCampaigns as Campaign[]);
      setYourCampaigns(
        fetchedCampaigns.filter(
          (it: Campaign) => it.admin.toString() === publicKey?.toString()
        )
      );
    } catch (e: any) {
      setCampaigns([]);
      setYourCampaigns([]);
      setLoading(false);
      console.error(e);
      toast.error(e.message || "There was an error getting the campaigns");
    }
  };

  useEffect(() => {
    getCampaigns();
  }, []);

  useEffect(() => {
    getCampaigns();
  }, [connected]);

  return (
    <Layout>
      <div className={"lg:grid lg:grid-cols-2 lg:gap-10"}>
        <div>
          {!yourCampaigns?.length && (
            <CreateCampaignSection
              loading={loading}
              getCampaigns={getCampaigns}
              setLoading={setLoading}
            />
          )}

          <CampaignListSection
            campaigns={yourCampaigns}
            getCampaigns={getCampaigns}
            isDonate={false}
            loading={loading}
            setLoading={setLoading}
          />
        </div>

        <InstructionsSection />
      </div>

      <CampaignListSection
        campaigns={campaigns}
        getCampaigns={getCampaigns}
        isDonate={true}
        loading={loading}
        setLoading={setLoading}
      />
    </Layout>
  );
};

export default Home;
