import { RadioButton } from "primereact/radiobutton";
import { useEffect, useState } from "react";
import { PropsRadioButtonCardCreate } from "../../../../../Types/types";
import { ControllerCreateForm } from "../../../../../Controller/controllerCreateForm";
import { Column, Padding, Row } from "../../../../../Styles/styles";
import TextInput from "../../../../TextInput";

export default function RadioButtonCard({
  options,
  index,
  form, setform
}: PropsRadioButtonCardCreate) {

  const props = ControllerCreateForm()
  return (
    <div>
      <div className="flex flex-column gap-3">
        {options?.map((item, indexRadioButton) => {
          return (
            <Row key={indexRadioButton}>
              <Column id="center">
                <RadioButton name="item" />
              </Column>
              <Padding padding="4px" />
              <Row id="space-between" style={{ width: "100%" }}>
                <ControllerInput
                  item={item}
                  index={index}
                  indexRadioButton={indexRadioButton}
                  form={form}
                  setform={setform}
                />
                <Padding padding="4px" />
                <Column id="center">
                  <i className="pi pi-trash" style={{ cursor: "pointer" }} onClick={() => props.deleteOptions(index, indexRadioButton, form, setform)} />
                </Column>
              </Row>
              {/* <label htmlFor={item.key} className="ml-2">{item.label}</label> */}
            </Row>
          );
        })}
      </div>
    </div>
  );
}

interface ControllerInputProps {
  item: any;
  index: number;
  indexRadioButton: number;
  form: any, setform: any
}

const ControllerInput = ({
  index,
  indexRadioButton,
  item,
  form, setform
}: ControllerInputProps) => {
  const [label, setlabel] = useState("");
  const props = ControllerCreateForm()

  useEffect(() => {
    setlabel(item?.label)
  }, [item?.label])
  

  return (
    <div className="w-full">
      <TextInput
        value={label}
        onBlur={() => {
          props.editlabelRadioButtonandBoxSelect!(index, indexRadioButton, label, form, setform);
        }}
        onChange={(e) => setlabel(e.target.value)}
      />
    </div>
  );
};
