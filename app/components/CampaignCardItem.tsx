import { FC } from "react";

export const CampaignCardItem: FC<{ label: string; value: string }> = ({
  label,
  value,
}) => {
  return (
    <div>
      <span className={"font-bold"}>{label}:</span> <span>{value}</span>
    </div>
  );
};
