import React from "react";
import '../styles/Settings.css'
const Box = ({ boxNumber, handleDrag, handleDrop,available,onClick }) => {
    return (
        <div
            draggable={true}
            id={boxNumber}
            onDragOver={(ev) => ev.preventDefault()}
            onDragStart={handleDrag}
            onDrop={handleDrop}
            style={{
                // backgroundColor: boxColor,

            }}
            className="boxes"
            onClick={onClick}
        >
           <div className={`box-side ${available?"box-side-available":"box-side-available-not"}`}>
           </div>
           <div className="box-title">{boxNumber}</div>
        </div>
    );
};

export default Box;
