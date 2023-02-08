import { ChangeEvent, FC, useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { ERROR_MESSAGES, shortenAddress } from "../utils/helpers";
import { Campaign, CampaignCardProps } from "../utils/types";
import { useWallet } from "@solana/wallet-adapter-react";
import { CampaignCardItem } from "./CampaignCardItem";
import { toast } from "react-toastify";
import {
  callCloseRPCMethod,
  callDonateRPCMethod,
  callWithdrawRPCMethod,
} from "../utils/api";

export const CampaignCard: FC<CampaignCardProps> = ({
  campaign,
  loading,
  isDonate,
  getCampaigns,
  setLoading,
}) => {
  const { connected, publicKey } = useWallet();
  const [amount, setAmount] = useState<number>(0.01);

  const onTransactionComplete = async () => {
    setAmount(0.01);
    await getCampaigns();
    setLoading(false);
  };

  const close = async (campaign?: Campaign) => {
    if (campaign?.pubkey) {
      try {
        setLoading(true);
        await callCloseRPCMethod(campaign);
        toast.success(`Campaign closed.`);
        await onTransactionComplete();
      } catch (e: any) {
        await onTransactionComplete();
        console.error(e);
        toast.error(e.message || ERROR_MESSAGES.TRANSACTION_FAILED);
      }
    }
  };

  const donate = async (campaign?: Campaign) => {
    if (amount < 0.01) {
      toast.error(ERROR_MESSAGES.MINIMUM_DONATION_AMOUNT_NOT_MET);
      return;
    }

    if (campaign?.pubkey) {
      try {
        setLoading(true);
        await callDonateRPCMethod(campaign, amount);
        toast.success(
          `You donated ${amount} ◎ to ${shortenAddress(campaign.pubkey)!}`
        );
        await onTransactionComplete();
      } catch (e: any) {
        await onTransactionComplete();
        console.error(e);
        toast.error(e.message || ERROR_MESSAGES.TRANSACTION_FAILED);
      }
    }
  };

  const withdraw = async (campaign?: Campaign) => {
    if (amount > campaign?.amountDonated?.toNumber()!) {
      toast.error(ERROR_MESSAGES.MAXIMUM_WITHDRAW_AMOUNT_EXCEEDED);
      return;
    }

    if (amount === 0) {
      toast.error(ERROR_MESSAGES.MINIMUM_WITHDRAW_AMOUNT_NOT_MET);
      return;
    }

    if (campaign?.pubkey) {
      try {
        setLoading(true);
        await callWithdrawRPCMethod(campaign, amount);
        await onTransactionComplete();
        toast.success(
          `Withdrew ${amount} ◎ from ${shortenAddress(
            campaign.pubkey
          )} to ${shortenAddress(publicKey!)}`
        );
      } catch (e: any) {
        await onTransactionComplete();
        console.error(e);
        toast.error(e.message || ERROR_MESSAGES.TRANSACTION_FAILED);
      }
    }
  };

  return (
    <div className={"border border-gray-400 rounded relative"}>
      {!!campaign?.pubkey && (
        <div
          key={campaign.pubkey.toString()}
          className="grid gap-2 p-5 lg:p-10"
        >
          <CampaignCardItem
            label={"Balance"}
            value={`${(
              campaign.amountDonated.toNumber() / LAMPORTS_PER_SOL
            ).toString()} ◎`}
          />

          <CampaignCardItem label={"Name"} value={campaign.name.toString()} />

          <CampaignCardItem
            label={"Owner"}
            value={shortenAddress(campaign.admin)}
          />

          <CampaignCardItem
            label={"Campaign ID"}
            value={shortenAddress(campaign.pubkey)}
          />

          <CampaignCardItem
            label={"Description"}
            value={campaign.description.toString()}
          />

          <div className="flex flex-wrap gap-2 mt-5">
            <div className={"form-control flex-grow"}>
              <input
                type="number"
                required
                value={amount}
                disabled={loading || !connected}
                placeholder={`${isDonate} ? "Donation" : "withdraw"} amount`}
                min={0.01}
                max={isDonate ? 1000000000 : campaign.amountDonated.toNumber()}
                className={" input input-bordered"}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setAmount(+event.target.value)
                }
              />
            </div>

            <button
              disabled={loading || !connected}
              className="btn btn-primary flex-grow"
              onClick={() => {
                isDonate ? donate(campaign) : withdraw(campaign);
              }}
            >
              {isDonate ? "Donate" : "Withdraw"}
            </button>

            {campaign?.pubkey &&
              campaign?.admin.toString() === publicKey?.toString() && (
                <button
                  disabled={loading || !connected}
                  className="btn btn-accent flex-grow"
                  onClick={() => close(campaign)}
                >
                  Close
                </button>
              )}
          </div>
        </div>
      )}
    </div>
  );
};
