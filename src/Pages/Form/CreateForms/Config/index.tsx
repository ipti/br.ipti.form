import { Dropdown } from "primereact/dropdown"
import { Column, Padding } from "../../../../Styles/styles"

const Config = () => {

    const periodic = [
        { id: 1, name: "Unica vez" },
        { id: 2, name: "1 mês" },
        { id: 3, name: "2 meses" },
        { id: 4, name: "6 meses" },
    ]

    const project = [
        { id: 1, name: "Vetores" },
        { id: 2, name: "Cloc" },
        { id: 3, name: "Tag" },
        { id: 4, name: "6 meses" },
    ]

    return (
        <div className="card">
            <Column>
                <Padding padding="8px" />
                <label>
                    Periodização do formulário
                </label>
                <Padding />
                <Dropdown options={periodic} placeholder="Escolher Periodo" optionLabel="name" />
                <Padding padding="8px" />
                <label>Destino do formulário</label>
                <Padding />
                <Dropdown options={project} placeholder="Escolher Plano de trabalho" optionLabel="name" />
                <Padding padding="8px" />
            </Column>
        </div>
    )
}

export default Config