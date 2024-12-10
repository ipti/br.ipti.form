import axios from "axios";
import { Padding } from "../../Styles/styles";
import TextInput from "../TextInput";
import MaskInput from "../InputMask";
import { useEffect, useState } from "react";
import { useFetchRequestCity, useFetchRequestState } from "../../Services/Address/query";
import { CityList, StateList } from "../../Services/Address/type";
import DropdownComponent from "../Dropdown";


const InputAddressState = () => {

    const [stateId, setStateId] = useState<number | undefined>()
    const [state, setState] = useState<StateList | undefined>();

    const [city, setCity] = useState<CityList>([])


    const { data: stateRequest } = useFetchRequestState()

    const { data: cityRequest } = useFetchRequestCity(stateId)

    useEffect(() => {
        if (stateRequest) {
            setState(stateRequest)
        }

        if (cityRequest) {
            setCity(cityRequest)
        }
    }, [stateRequest, cityRequest])


    const dadosCep = async (value: string, setFieldValue: any) => {
        if (value) {

            const cep = value.replace(/[^a-zA-Z0-9 ]/g, '');

            await axios.get("https://viacep.com.br/ws/" + cep + "/json/").then((data) => {
                console.log(data)
                const stateCep = state?.find(props => props.acronym === data.data.uf)
                const cityCep = city?.find(props => props.name === data.data.localidade.toUpperCase())

                setFieldValue("address", data.data.logradouro);
                setFieldValue("neighborhood", data.data.bairro);
                setFieldValue("complement", data.data.complemento);
                setFieldValue("state", stateCep)
                setStateId(stateCep?.id)
                setFieldValue("city", cityCep)
            }).catch(
                (error) => {
                    return error
                }
            )
        }


    }

    return { dadosCep, state, setStateId, city }
}

const InputAddress = ({ errors, handleChange, touched, values, setFieldValue }: { values: any, handleChange: any, errors: any, touched: any, setFieldValue: any }) => {

    const props = InputAddressState();

    // useEffect(() => {
    //     if(values.state){
    //         props.setStateId(values.state.id);
    //         setFieldValue("city",props.city.find(props => props.id === values.city));
    //     }
        
    // }, [])

    return (
        <div className="grid">
            <div className="col-12 md:col-6">
                <label>CEP *</label>
                <Padding />
                <MaskInput
                    value={values.cep}
                    mask="99999-999"
                    placeholder="Cep"
                    onChange={(e) => {
                        setFieldValue("cep", e.target.value)
                        props.dadosCep(e.target.value!, setFieldValue)
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
            <div className="col-12 md:col-6">
                <label>Complemento *</label>
                <Padding />
                <TextInput
                    value={values.complement}
                    placeholder="Complemento"
                    onChange={handleChange}
                    name="complement"
                />
                {errors.neighborhood && touched.neighborhood ? (
                    <div style={{ color: "red", marginTop: "8px" }}>
                        {errors.neighborhood}
                    </div>
                ) : null}
            </div>
            <div className="col-12 md:col-6">
                <label>Estado *</label>
                <Padding />
                <DropdownComponent
                    value={values.state}
                    placerholder="Estado"
                    name="state"
                    onChange={(e) => {
                        setFieldValue("state", e.target.value)
                        props.setStateId(e.target.value.id)
                    }}
                    options={props.state}
                />
                {errors.neighborhood && touched.neighborhood ? (
                    <div style={{ color: "red", marginTop: "8px" }}>
                        {errors.neighborhood}
                    </div>
                ) : null}
            </div>
            <div className="col-12 md:col-6">
                <label>Cidade *</label>
                <Padding />
                <DropdownComponent
                    value={values.city}
                    placerholder="Cidade"
                    name="city"
                    onChange={handleChange}
                    options={props.city}
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