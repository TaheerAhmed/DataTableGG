import React, { useState } from 'react'
import Box from './Box'
import '../styles/Settings.css'
import { useSelector, useDispatch } from 'react-redux'
import { settingActions } from '../store/Slices/settingSlice'

const Settings = () => {
    const dispatch = useDispatch();
    const initialBoxes = useSelector(state => state.setting.boxes);
    const settingsVisible = useSelector(state => state.setting.showSettingModal)

    const [dragId, setDragId] = useState();
    const [boxes, setBoxes] = useState(initialBoxes);
    const [errorModal, setErrorModal] = useState(false);
    // to toggle the visibility of various columns
    const toggleAvailability = (id) => {
        // to prevent Date and App Name from being toggled as they are always visible
        if (id === "Date" || id === "App Name") {
            setErrorModal(true);
            return;
        }
        setBoxes((prevBoxes) =>
            prevBoxes.map((box) =>
                (box.id !== "Date" && box.id !== "App Name" && box.id === id) ? { ...box, available: !box.available } : box
            )
        );
    };
    // to set the id of the column being dragged
    const handleDrag = (ev) => {
        setDragId(ev.currentTarget.id);
    };
    // to swap the order of the columns
    const handleDrop = (ev) => {
        const dragBox = boxes.find((box) => box.id === dragId);
        const dropBox = boxes.find((box) => box.id === ev.currentTarget.id);

        const dragBoxOrder = dragBox.order;
        const dropBoxOrder = dropBox.order;

        const newBoxState = boxes.map((box) => {
            if (box.id === dragId) {
                return { ...box, order: dropBoxOrder };
            }
            if (box.id === ev.currentTarget.id) {
                return { ...box, order: dragBoxOrder };
            }
            return box;
        });

        setBoxes(newBoxState);
    };
    // to save the changes made to the columns
    const handleSave = () => {
        dispatch(settingActions.setUpdatedBoxes([...boxes].sort((a, b) => a.order - b.order)));
        dispatch(settingActions.setSettingModal(false));
    };
    // to cancel the changes made to the columns
    const handleCancel = () => {
        setBoxes(initialBoxes);
        dispatch(settingActions.setSettingModal(false));

    };
    return (
        <div>
            {settingsVisible ? (
                <div className="settings">
                    <div>Dimensions & Metrics</div>
                    <div className="settings-box">
                        
                        {[...boxes]
                            .sort((a, b) => a.order - b.order)
                            .map((box) => (
                                    <Box
                                        className="boxe"
                                        key={box.id}
                                        boxColor={box.service_name}
                                        boxNumber={box.id}
                                        handleDrag={handleDrag}
                                        handleDrop={handleDrop}
                                        available={box.available}
                                        onClick={() => toggleAvailability(box.id)}
                                    />
                                
                            ))}
                        {errorModal&&<div className="error-modal">
                            <div className="error-modal-content">
                                <button className="close-button" onClick={()=>setErrorModal(false)}>
                                    &times;
                                </button>
                                <p className="error-message">
                                    Date and App Name Columns can't be disabled
                                </p>
                            </div>
                        </div>}
                    </div>
                    <div className='buttons-set'>          
                        <button
                            className="cancel-button"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        <button className="save-button" onClick={handleSave}>
                            Apply Changes
                        </button>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Settings;
