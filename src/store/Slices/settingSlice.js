import { createSlice } from "@reduxjs/toolkit"
import dataLayer from '../../constants/datalayer.js'
const initialSettingState = {
    boxes: dataLayer,
    showSettingModal: false
}

const settingSlice = createSlice(
    {
        name: 'setting',
        initialState: initialSettingState,
        reducers: {
            setUpdatedBoxes(state, action) {
                state.boxes = action.payload
            },
            setSettingModal(state, action) {
                state.showSettingModal = action.payload
            }
        }

    }
)
export const settingActions = settingSlice.actions

export default settingSlice.reducer