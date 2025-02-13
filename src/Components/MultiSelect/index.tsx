import { MultiSelect } from "primereact/multiselect";
import { PropsMultiSelect } from "../../Types/types";

const MultiSelectComponet = ({
  value,
  onChange,
  options,
  placerholder,
  optionsLabel,
  name,
  optionsValue,
  disabled,
}: PropsMultiSelect) => {
  return (
    <MultiSelect
      name={name}
      value={value}
      onChange={onChange}
      options={options}
      optionValue={optionsValue}
      optionLabel={optionsLabel ?? "name"}
      filter placeholder={placerholder}
      maxSelectedLabels={3}
      className="w-full"
    />
  );
};

export default MultiSelectComponet;
