import { Dropdown } from "primereact/dropdown";
import { PropsDropdown } from "../../Types/types";

const DropdownComponent = ({
  value,
  onChange,
  options,
  placerholder,
  optionsLabel,
  name,
  optionsValue,
  disabled,
}: PropsDropdown) => {
  return (
    <Dropdown
      name={name}
      value={value}
      onChange={onChange}
      options={options}
      disabled={disabled}
      optionValue={optionsValue}
      optionLabel={optionsLabel ?? "name"}
      placeholder={placerholder}
      className="w-full"
    />
  );
};

export default DropdownComponent;
