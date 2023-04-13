import React from 'react'
import '../styles/ErrorModal.css'
const ErrorModal = () => {
    return (
        <div className='modal-container'>
            <div className="modal-content">
                <div className='modal-cen'>
                <img src={require('../assets/logos/notepad.png')} alt="error"className="modal-img" />

                <div className='modal-text'>
                    <div className='modal-head'>Hey! Something’s off! We couldn’t display the given data.</div>
                    <div className='modal-sent'>Try changing your filters or selecting a different date.</div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorModal;

