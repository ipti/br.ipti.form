import { DropdownChangeEvent } from "primereact/dropdown";
import { MultiSelectChangeEvent, MultiSelectHeaderCheckboxChangeEvent } from "primereact/multiselect";
import { InputMaskChangeEvent } from "primereact/inputmask";
import { InputNumberValueChangeEvent } from "primereact/inputnumber";
import { RadioButtonChangeEvent } from "primereact/radiobutton";
import { SelectItemOptionsType } from "primereact/selectitem";
import { ChangeEventHandler, Dispatch, FocusEventHandler, HTMLInputTypeAttribute, SetStateAction } from "react";
import { User } from "../Context/Users/type";

export interface PropsInputText {
    value?: string,
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined,
    placeholder?: string | undefined,
    disabled?: boolean | undefined,
    onBlur?: FocusEventHandler<HTMLInputElement> | undefined,
    name?: string
    type?: HTMLInputTypeAttribute | undefined
}

export interface PropsInputMask {
    value?: string,
    onChange?(event: InputMaskChangeEvent): void
    placeholder?: string | undefined,
    disabled?: boolean | undefined,
    onBlur?: FocusEventHandler<HTMLInputElement> | undefined,
    name?: string,
    mask?: string
}

export interface PropsInputNumber {
    value?: number,
    onChange?(event: InputNumberValueChangeEvent): void
    placeholder?: string | undefined,
    disabled?: boolean | undefined,
    onBlur?: FocusEventHandler<HTMLInputElement> | undefined,
    name?: string
    suffix?: string
}

export interface PropsInputCalendar {
    value?: any,
    onChange: any,
    placeholder?: string | undefined,
    disabled?: boolean | undefined,
    onBlur?: FocusEventHandler<HTMLInputElement> | undefined,
    name?: string,
    view?: "date" | "month" | "year",
    dateFormat?: string
    selectionMode?: "range" | "multiple" | "single" | undefined
}

export interface PropsInputArea {
    value?: string,
    onChange?: ChangeEventHandler<HTMLTextAreaElement> | undefined,
    placeholder?: string | undefined,
    disabled?: boolean | undefined,
    onBlur?: FocusEventHandler<HTMLTextAreaElement> | undefined
    name?: string
    maxLength?: number | undefined
}

export interface PropsRadioButton {
    value?: any,
    onChange?(event: RadioButtonChangeEvent): void,
    checked?: boolean,
    placeholder?: string | undefined,
    disabled?: boolean | undefined,
    label?: string,
    name?: string
}
export interface PropsRadioButtonCardCreate {
    options?: Array<any>,
    index: number,
    form: any,
    setform: any
}

export interface PropsCheckBoxCardView {
    options?: Array<any>,
    item?: any,
    handleChange?: (e: any, id: number, idOptions: number) => void,
    form?: any,
    setform?: any,
    disabled?: boolean
}

export interface PropsRadioButtonCardView {
    options?: Array<any>,
    item?: any,
    handleChange?: (e: any, id: number) => void,
    form?: any,
    setFormResp?: any,
    disabled?: boolean
}

export interface PropsTextFieldCardView {
    item?: any,
    form?: any,
    setFormResp?: any,
    disabled?: boolean
}

export interface PropsDropdown {
    disabled?: boolean | undefined
    value?: any,
    onChange?(event: DropdownChangeEvent): void,
    options?: SelectItemOptionsType | undefined,
    placerholder?: string,
    optionsLabel?: string,
    name?: string,
    optionsValue?: string
}

export interface PropsMultiSelect {
    disabled?: boolean | undefined
    value?: any,
    onChange?(event: MultiSelectChangeEvent): void
    options?: SelectItemOptionsType | undefined,
    placerholder?: string,
    optionsLabel?: string,
    name?: string,
    optionsValue?: string
}

export interface PropsForm {
    title?: string, description?: string, question?: Array<any>, id?: string
}

export interface PropsAplicationContext {
    form: PropsForm,
    setform: any,
    project: Array<Projects> | undefined;
    user: User | undefined
}

export interface FormsJson {
    form: Array<PropsForm>
}

export interface CreateOrEditFormTypes {
    form: PropsForm | undefined,
    setform: Dispatch<SetStateAction<PropsForm | undefined>>,
    responses: Responses
}


export interface Responses {
    response: Response[]
}

export interface Response {
    id: string
    title: string
    description: string
    response: Response2[]
}

export interface Response2 {
    question: Question[]
}

export interface Question {
    type: string
    label: string
    id: string
    required: boolean
    value: any
    options?: Option[]
}

export interface Option {
    value: number
    label: string
}


export interface ViewFormTypes {
    form: PropsForm | undefined,
    setform: Dispatch<SetStateAction<PropsForm | undefined>>
}


export interface FormListContextTypes {
    forms: FormsJson | undefined
}

export interface PropsComponentForm {
    name: string,
    type: string,
    component: ({ form, index, item, setform }: PropsComponets) => JSX.Element
}

export interface PropsComponets {
    index?: number,
    form?: any,
    item?: any,
    setform?: any,

}

export interface CardFormTypes {
    item: PropsForm
}

export interface Projects {
    id: number,
    name: string,
  }

  export interface LogoFileContent {
    type: string
    data: number[]
  }
  