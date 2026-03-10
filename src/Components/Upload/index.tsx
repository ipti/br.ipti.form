import { Button } from 'primereact/button';
import { FileUpload, FileUploadHeaderTemplateOptions, ItemTemplateOptions } from 'primereact/fileupload';
import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MeetingListRegistrationContext } from '../../Context/Classroom/Meeting/MeetingListRegistration/context';
import { MeetingListRegisterTypes } from '../../Context/Classroom/Meeting/MeetingListRegistration/type';

export default function Upload() {

    const [file, setFile] = useState<Array<any>>([])

    const {idMeeting} = useParams()

    const meetingList = useContext(MeetingListRegistrationContext) as MeetingListRegisterTypes;

    const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
        const { className, chooseButton, cancelButton, props } = options;

        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center', gap: '8px' }}>
                {chooseButton}
                <Button
                    rounded
                    outlined
                    icon="pi pi-upload"
                    label="Enviar arquivo"
                    tooltip="Clique para enviar o arquivo selecionado"
                    tooltipOptions={{ position: 'bottom' }}
                    className="p-button-success p-button-rounded p-button-outlined"
                    disabled={file.length === 0}
                    onClick={() => {
                        meetingList.ArchivesMeeting(file[0], parseInt(idMeeting!));
                        props.onClear!();
                    }}
                />
                {cancelButton}
            </div>
        );
    };

    const onTemplateSelect = (e: any) => {
        let files = e.files;
        setFile(files)
    };

    const chooseOptions = {
        icon: 'pi pi-fw pi-plus',
        label: 'Selecionar arquivo',
        className: 'custom-choose-btn p-button-rounded p-button-outlined',
    };
    const uploadOptions = {
        icon: 'pi pi-fw pi-cloud-upload',
        iconOnly: true,
        className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined',
        style: { display: 'none' }, // oculta o botão padrão de upload do PrimeReact
    };
    const cancelOptions = {
        icon: 'pi pi-fw pi-times',
        label: 'Limpar',
        className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined',
    };

    const onTemplateRemove = (files: File, callback: Function) => {
        setFile(file.filter(props => props.name !== files.name))
        callback();
    };


    const itemTemplate = (inFile: object, props: ItemTemplateOptions) => {
        const file = inFile as any;
        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center" style={{ width: '40%' }}>
                    <img alt={file.name} role="presentation" src={file?.objectURL} width={100} />
                    <span className="flex flex-column text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
        );
    };

    const onTemplateClear = () => {
        setFile([])
    };

    return (
        <FileUpload chooseOptions={chooseOptions} accept="image/*" onClear={onTemplateClear} itemTemplate={itemTemplate} uploadOptions={uploadOptions} cancelOptions={cancelOptions} name="demo[]" headerTemplate={headerTemplate} onSelect={onTemplateSelect} emptyTemplate={<p className="m-0">Arraste e solte os arquivos aqui.</p>} />
    )
}