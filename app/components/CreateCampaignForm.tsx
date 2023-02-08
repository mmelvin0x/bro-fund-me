import { ChangeEvent, FC, MouseEvent, useState } from "react";
import { CreateCampaignProps } from "../utils/types";
import { toast } from "react-toastify";
import { callCreateCampaignRPCMethod } from "../utils/api";

export const CreateCampaignForm: FC<CreateCampaignProps> = ({
  loading,
  setLoading,
  getCampaigns,
}) => {
  const [campaignName, setCampaignName] = useState<string>("");
  const [campaignDescription, setCampaignDescription] = useState<string>("");

  const onCreateCampaign = async (event: MouseEvent) => {
    event.preventDefault();

    if (!campaignName) {
      toast.error("A Campaign Name is required.");
      return;
    }

    if (!campaignDescription) {
      toast.error("A Campaign Description is required.");
      return;
    }

    try {
      setLoading(true);
      await callCreateCampaignRPCMethod(campaignName, campaignDescription);
      await getCampaigns();
      setCampaignName("");
      setCampaignDescription("");
      toast.success(`Campaign created!`);
      setLoading(false);
    } catch (e: any) {
      await getCampaigns();
      console.error(e);
      toast.error(
        e.message || "Sorry, there was an error creating the campaign!"
      );
      setLoading(false);
    }
  };

  return (
    <form className={"grid gap-5 lg:gap-10"}>
      <div className="form-control">
        <label htmlFor="name" className="label">
          Campaign Name
        </label>
        <input
          id={"name"}
          name={"name"}
          type="text"
          required
          maxLength={50}
          disabled={loading}
          placeholder={"Enter the name of your campaign"}
          className={"input input-bordered"}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCampaignName(e.target.value)
          }
        />
      </div>

      <div className="form-control">
        <label htmlFor="description" className="label">
          Campaign Description
        </label>
        <textarea
          id={"description"}
          name={"description"}
          required
          maxLength={180}
          disabled={loading}
          placeholder={"Please enter a short description"}
          className={"textarea textarea-bordered"}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setCampaignDescription(e.target.value)
          }
        />
      </div>

      <div className="form-control">
        <button
          className="btn btn-primary"
          disabled={loading}
          onClick={(event: MouseEvent) => onCreateCampaign(event)}
        >
          Create a campaign
        </button>
      </div>
    </form>
  );
};
