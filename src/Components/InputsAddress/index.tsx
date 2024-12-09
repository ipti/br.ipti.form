import axios from "axios";
import { Padding } from "../../Styles/styles";
import TextInput from "../TextInput";


const InputAddressState = () => {

    const dadosCep = async (value: string, setFieldValue: any) => {
        const cep = value.replace(/[^a-zA-Z0-9 ]/g, '');

        await axios.get("https://viacep.com.br/ws/" + cep + "/json/").then((data) => {
            console.log(data)
            setFieldValue("address", data.data.logradouro);
            setFieldValue("neighborhood", data.data.bairro);
            setFieldValue("complement", data.data.complemento);

        }).catch(
            (error) => {
                return error
            }
        )


    }

    return { dadosCep }
}

const InputAddress = ({ errors, handleChange, touched, values, setFieldValue }: { values: any, handleChange: any, errors: any, touched: any, setFieldValue: any }) => {

    const props = InputAddressState();

    return (
        <div className="grid">
            <div className="col-12 md:col-6">
                <label>CEP *</label>
                <Padding />
                <TextInput
                    value={values.cep}
                    placeholder="Cep"
                    onChange={(e) => {
                        setFieldValue("cep", e.target.value)
                            props.dadosCep(values.cep, setFieldValue)
                            console.log(props.dadosCep(values.cep, setFieldValue))
                    }}
                    name="cep"
                />
                {errors.cep && touched.cep ? (
                    <div style={{ color: "red", marginTop: "8px" }}>
                        {errors.cep}
                    </div>
                ) : null}
            </div>
            <div className="col-12 md:col-6">
                <label>Endereço *</label>
                <Padding />
                <TextInput
                    value={values.address}
                    placeholder="Endereço"
                    onChange={handleChange}
                    name="address"
                />
                {errors.address && touched.address ? (
                    <div style={{ color: "red", marginTop: "8px" }}>
                        {errors.address}
                    </div>
                ) : null}
            </div>
            <div className="col-12 md:col-6">
                <label>Bairro *</label>
                <Padding />
                <TextInput
                    value={values.neighborhood}
                    placeholder="Bairro"
                    onChange={handleChange}
                    name="neighborhood"
                />
                {errors.neighborhood && touched.neighborhood ? (
                    <div style={{ color: "red", marginTop: "8px" }}>
                        {errors.neighborhood}
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default InputAddress