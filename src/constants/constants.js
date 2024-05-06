export const initialStateFilters = {
  jobRole: { name: "Role", selectedList: [], totalList: [] },
  companyName: { name: "Select Company", selectedList: [], totalList: [] },
  minExp: {
    name: "Minimum Experience",
    selectedList: [],
    totalList: [],
  },
  location: { name: "Select Location", selectedList: [], totalList: [] },
  minJdSalary: { name: "Select Minimum Pay", selectedList: [], totalList: [] },
  isRemote: {
    name: "Remote/on-Site",
    selectedList: [],
    totalList: ["remote", "on-site"],
  },
};