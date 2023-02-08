import {
  clusterApiUrl,
  Commitment,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";
import {
  AnchorProvider,
  BN,
  Idl,
  Program,
  utils,
  web3,
} from "@project-serum/anchor";
import idl from "../idl.json";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { Campaign } from "./types";

export const programID = new PublicKey(idl.metadata.address);
export const network = clusterApiUrl(WalletAdapterNetwork.Devnet); // TODO: Get from env
export const { SystemProgram } = web3;
export const opts = {
  preflightCommitment: "processed" as Commitment,
};

export const getProvider = () => {
  const connection = new Connection(network, opts.preflightCommitment);
  return new AnchorProvider(connection, (window as any).solana, opts);
};

export const callCloseRPCMethod = async (campaign: Campaign) => {
  const provider = getProvider();
  const program = new Program(idl as Idl, programID, provider);
  await program.rpc.close({
    accounts: {
      campaign: campaign.pubkey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    },
  });
};

export const callDonateRPCMethod = async (
  campaign: Campaign,
  donationAmount: number
) => {
  const provider = getProvider();
  const program = new Program(idl as Idl, programID, provider);
  await program.rpc.donate(new BN(donationAmount * LAMPORTS_PER_SOL), {
    accounts: {
      campaign: campaign.pubkey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    },
  });
};

export const callWithdrawRPCMethod = async (
  campaign: Campaign,
  withdrawAmount: number
) => {
  const provider = getProvider();
  const program = new Program(idl as Idl, programID, provider);
  await program.rpc.withdraw(new BN(withdrawAmount * LAMPORTS_PER_SOL), {
    accounts: {
      campaign: campaign.pubkey,
      user: provider.wallet.publicKey,
    },
  });
};

export const callGetCampaignsRPCMethod = async () => {
  const provider = getProvider();
  const connection = new Connection(network, opts.preflightCommitment);
  const program = new Program(idl as Idl, programID, provider);
  return Promise.all(
    (await connection.getProgramAccounts(programID)).map(
      async ({ account, pubkey }) => {
        return {
          ...(await program.account.campaign.fetch(pubkey)),
          pubkey,
        };
      }
    )
  );
};

export const callCreateCampaignRPCMethod = async (
  name: string,
  description: string
) => {
  const provider = getProvider();
  const program = new Program(idl as Idl, programID, provider);
  const [campaign] = await PublicKey.findProgramAddress(
    [
      utils.bytes.utf8.encode("CAMPAIGN_DEMO"),
      provider.wallet.publicKey.toBuffer(),
    ],
    program.programId
  );

  await program.rpc.create(name, description, {
    accounts: {
      campaign,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    },
  });

  return campaign;
};
