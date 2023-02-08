import { AccountInfo, PublicKey } from "@solana/web3.js";
import { BN } from "@project-serum/anchor";
import { Dispatch, SetStateAction } from "react";

export interface Campaign {
  account: AccountInfo<Buffer>;
  amountDonated: BN;
  admin: PublicKey;
  description: PublicKey;
  name: PublicKey;
  pubkey: PublicKey;
}

export interface CampaignCardProps {
  campaign: Campaign;
  getCampaigns: () => Promise<void>;
  isDonate: boolean;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export interface CampaignListSectionProps {
  campaigns: Campaign[];
  getCampaigns: () => Promise<void>;
  isDonate: boolean;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export interface CreateCampaignProps {
  loading: boolean;
  getCampaigns: () => Promise<void>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export interface CreateCampaignSectionProps {
  loading: boolean;
}
