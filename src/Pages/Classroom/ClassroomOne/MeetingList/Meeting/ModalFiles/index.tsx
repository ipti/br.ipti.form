import { Galleria } from "primereact/galleria";
import { MeetingArc } from "../../../../../../Context/Classroom/Meeting/MeetingListRegistration/type";
import { Dialog } from "primereact/dialog";
import { Padding } from "../../../../../../Styles/styles";

const ModalFiles = ({ item, onHide, visible, index }: { item: MeetingArc[], visible: boolean, onHide: () => void, index: number }) => {



    const itemTemplate = (item: MeetingArc) => {
        return <img src={item.archive_url} alt={item.original_name} style={{ width: '100%', display: 'block' }} />;
    };

    return (
        <Dialog onHide={onHide} visible={visible} header="Evidências do encontro" >
            <Padding>

                <div className="card">
                    <Galleria value={item} style={{ maxWidth: '640px', maxHeight: "" }} showThumbnails={false} showIndicators activeIndex={index} item={itemTemplate} />
                </div>
            </Padding>
        </Dialog>
    )
}

export default ModalFiles