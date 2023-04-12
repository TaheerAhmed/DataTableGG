import { createSlice } from "@reduxjs/toolkit"
const initialDateState = { startDate: "", endDate: "" }
const dateSlice = createSlice(
    {
        name: 'date',
        initialState: initialDateState,
        reducers: {
            setStartDate(state, action) {
                state.startDate = action.payload
            },
            setEndDate(state, action) {
                state.endDate = action.payload
            }
        }

    }
)
export const dateActions = dateSlice.actions

export default dateSlice.reducer