import { createSlice } from "@reduxjs/toolkit"
const initialTableState = {
    tempSliderValues:{},
    filteredData:[],
    showSettingModal: false
}

const tableSlice = createSlice(
    {
        name: 'table',
        initialState: initialTableState,
        reducers: {
            setTempSliderValues(state, action) {
                state.tempSliderValues = action.payload
            },
            
        }

    }
)
export const tableActions = tableSlice.actions

export default tableSlice.reducer