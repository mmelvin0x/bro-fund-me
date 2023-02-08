import { PublicKey } from "@solana/web3.js";

export const ERROR_MESSAGES = {
  TRANSACTION_FAILED: "Sorry, there was an error sending the transaction.",
  MINIMUM_DONATION_AMOUNT_NOT_MET: "0.01 ◎ is the minimum donation amount.",
  MINIMUM_WITHDRAW_AMOUNT_NOT_MET:
    "The withdraw amount must be greater than 0 ◎.",
  MAXIMUM_WITHDRAW_AMOUNT_EXCEEDED:
    "You cannot withdraw more than the balance of the campaign.",
};

export const shortenAddress = (pubkey: PublicKey): string =>
  pubkey.toString().substring(0, 4) +
  "..." +
  pubkey
    .toString()
    .substring(pubkey.toString().length - 4, pubkey.toString().length);
