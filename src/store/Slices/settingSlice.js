import { createSlice } from "@reduxjs/toolkit"
const initialSettingState = {
    boxes: [
        {
            id: "Date",
            service_name: "Date",
            order: 1,
            available: true
        },
        {
            id: "App Name",
            service_name: "App Name",
            order: 2,
            available: true

        },
        {
            id: "AD Request",
            service_name: "AD Request",
            order: 3,
            available: true

        },
        {
            id: "AD Response",
            service_name: "AD Response",
            order: 4,
            available: true

        },
        {
            id: "Impression",
            service_name: "Impression",
            order: 5,
            available: true

        }, {
            id: "Clicks",
            service_name: "Clicks",
            order: 6,
            available: true

        },
        {
            id: "Revenue",
            service_name: "Revenue",
            order: 7,
            available: true
        }
        , {
            id: "Fill Rate",
            service_name: "Fill Rate",
            order: 8,
            available: true
        }, {
            id: "CTR",
            service_name: "CTR",
            order: 9,
            available: true
        }
    ],
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