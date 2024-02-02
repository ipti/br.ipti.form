import { DropdownChangeEvent } from "primereact/dropdown";
import { RadioButtonChangeEvent } from "primereact/radiobutton";
import { SelectItemOptionsType } from "primereact/selectitem";
import { ChangeEventHandler, Dispatch, FocusEventHandler, SetStateAction } from "react";

export interface PropsInputText {
    value?: string,
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined,
    placeholder?: string | undefined,
    disabled?: boolean | undefined,
    onBlur?: FocusEventHandler<HTMLInputElement> | undefined,
    name?: string
}

export interface PropsInputArea {
    value?: string,
    onChange?: ChangeEventHandler<HTMLTextAreaElement> | undefined,
    placeholder?: string | undefined,
    disabled?: boolean | undefined,
    onBlur?: FocusEventHandler<HTMLTextAreaElement> | undefined
}

export interface PropsRadioButton {
    value?: string,
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
    value?: any,
    onChange?(event: DropdownChangeEvent): void,
    options?: SelectItemOptionsType | undefined,
    placerholder?: string
}

export interface PropsForm {
    title?: string, description?: string, question?: Array<any>, id?: string
}

export interface PropsAplicationContext {
    form: PropsForm,
    setform: any
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