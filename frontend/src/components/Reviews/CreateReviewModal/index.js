import { useState } from "react";
import { Modal } from "../../../context/Modal";

import CreateReviewForm from "./CreateReviewForm";

function CreateReviewFormModal({ spotId, setHasSubmitted }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Create Review</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateReviewForm setShowModal={setShowModal} spotId={spotId} setHasSubmitted={setHasSubmitted} />
                </Modal>
            )}
        </>
    )
}

export default CreateReviewFormModal;