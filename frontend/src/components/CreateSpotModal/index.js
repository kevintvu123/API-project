import React, { useState } from 'react';
import { Modal } from "../../context/Modal";
import CreateSpotForm from "./CreateSpotForm";
import './CreateSpotForm.css'

function CreateSpotFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="hostButton" onClick={() => setShowModal(true)}>Host a Spot</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateSpotForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}

export default CreateSpotFormModal;