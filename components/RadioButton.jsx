/* eslint-disable @next/next/no-img-element */
import { ThirdwebNftMedia } from "@thirdweb-dev/react";

export const RadioButton = (props) => {
  const { changed, id, isSelected, label } = props;
  return (
    <div>
      <input
        name="NFT"
        id={id}
        onChange={changed}
        value={id - 1}
        type="radio"
        checked={isSelected}
        hidden
      />
      <label htmlFor={id}>
        <ThirdwebNftMedia metadata={label || {}} />
      </label>
    </div>
  );
};
