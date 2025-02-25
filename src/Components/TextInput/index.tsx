import { PropsInputText } from "../../Types/types";

import { InputText } from "primereact/inputtext";

const TextInput = ({
  value,
  onChange,
  placeholder,
  disabled,
  onBlur,
  name,
  type
}: PropsInputText) => {
  return (
    <div>
      <InputText
        style={{ width: "100%" }}
        onBlur={onBlur}
        type={type}
        disabled={disabled}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextInput;
