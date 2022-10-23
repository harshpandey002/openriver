import styles from "@/styles/MintModal.module.css";

export const RadioButton = (props) => {
  const { changed, id, isSelected, label, value } = props;
  return (
    <div>
      <input
        name="NFT"
        id={id}
        onChange={changed}
        value={value}
        type="radio"
        checked={isSelected}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
