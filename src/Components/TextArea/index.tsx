
import { InputTextarea } from 'primereact/inputtextarea';
import { PropsInputArea } from '../../Types/types';


const TextAreaComponent = ({value, onChange, onBlur, placeholder, disabled, name, maxLength}: PropsInputArea) => {
    return (
        <InputTextarea style={{width: "100%"}} maxLength={maxLength} placeholder={placeholder} disabled={disabled} onBlur={onBlur} value={value} autoResize onChange={onChange} rows={5} name={name} cols={30} />
    )
}

export default TextAreaComponent;