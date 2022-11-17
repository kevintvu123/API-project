import { useState } from "react";
import { Modal } from "../../../context/Modal";

import EditSpotForm from "./EditSpotForm";


function EditSpotFormModal({ spot, setHasSubmitted }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="createReviewButton" onClick={() => setShowModal(true)}>Edit Spot</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditSpotForm setShowModal={setShowModal} spot={spot} setHasSubmitted={setHasSubmitted}/>
                </Modal>
            )}
        </>
    )
}

export default EditSpotFormModal;