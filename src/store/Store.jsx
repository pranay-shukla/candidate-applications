import { configureStore, createSlice } from "@reduxjs/toolkit";
import { initialStateFilters } from "../constants/constants";
import { getUniqueSortedList, getUniqueObjList } from "../service/service";

// const payload = {
//   filter: role,
//   list: []
// };

const filterSlice = createSlice({
  name: "filters",
  initialState: { ...initialStateFilters },
  reducers: {
    addToSelected: (state, action) => {
      state[action.payload.filter].selectedList.push(...action.payload.list);
      state[action.payload.filter].totalList = state[
        action.payload.filter
      ].totalList.filter((item) => !action.payload.list.includes(item));
    },
    removeFromSelected: (state, action) => {
      state[action.payload.filter].selectedList = state[
        action.payload.filter
      ].selectedList.filter((item) => !action.payload.list.includes(item));
      state[action.payload.filter].totalList = getUniqueSortedList([
        ...state[action.payload.filter].totalList,
        ...action.payload.list,
      ]);
    },
    clearSelected: (state, action) => {
      state[action.payload.filter].totalList = getUniqueSortedList([
        ...state[action.payload.filter].totalList,
        ...state[action.payload.filter].selectedList,
      ]);
      state[action.payload.filter].selectedList = [];
    },
    addToTotalList: (state, action) => {
      state[action.payload.filter].totalList = getUniqueSortedList([
        ...state[action.payload.filter].totalList,
        ...action.payload.list.filter(
          (item) => !state[action.payload.filter].selectedList.includes(item)
        ),
      ]);
    },
    removeFromTotalList: (state, action) => {
      state[action.payload.filter].totalList = state[
        action.payload.filter
      ].totalList.filter((item) => !action.payload.list.includes(item));
    },
    clearTotalList: (state) => {
      state[action.payload.filter].totalList = [];
    },
  },
});

const jdSlice = createSlice({
  name: "jd",
  initialState: { jdList: [], filteredList: [], totalCount: 0 },
  reducers: {
    addJd: (state, action) => {
      state.jdList = getUniqueObjList([
        ...state.jdList,
        ...action.payload.list,
      ]);
    },
    removeFromJd: (state, action) => {
      state.jdList = state.jdList.filter(
        (item) => !action.payload.list.includes(item)
      );
    },
    clearJd: (state) => {
      state.jdList = [];
    },
    updateTotalCount: (state, action) => {
      state.totalCount = action.payload.totalCount;
    },
    addFilteredList: (state, action) => {
      if (action.payload.toAppend) {
        state.filteredList = getUniqueObjList([
          ...state.filteredList,
          ...action.payload.list,
        ]);
      } else {
        state.filteredList = getUniqueObjList(action.payload.list);
      }
    },
    removeFromFilteredList: (state, action) => {
      let list = state.filteredList;
      action.payload.list.forEach((item) => {
        list = list.filter((jd) => jd.jdUid !== item.jdUid);
      });
      state.filteredList = action.payload.toAppend
        ? getUniqueObjList(list)
        : getUniqueObjList(state.jdList);
    },
  },
});

const store = configureStore({
  reducer: { filterStore: filterSlice.reducer, jdStore: jdSlice.reducer },
});

export const jdStoreActions = jdSlice.actions;
export const filterActions = filterSlice.actions;
export default store;
