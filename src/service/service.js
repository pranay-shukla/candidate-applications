import { initialStateFilters } from "../constants/constants";





// returns sorted list of unique elements 
export const getUniqueSortedList = (list) => {
  list =  Array.from(new Set(list));
  if (typeof list[0] === typeof 0) {
    return list.sort((a, b) => a - b);
  } else {
    return list.sort();
  }
}

export const getUniqueObjList = (list) => {
  return Array.from(new Set(list.map(obj => JSON.stringify(obj)))).map(str => JSON.parse(str));
}

export const getFilteredList = (list, arr= [null, undefined, 0]) => {
  return list.filter((item) => 
    !arr.includes(item))
}

export const getMappedData = (jdList) => {
  let filters = structuredClone(initialStateFilters);
  jdList.forEach((jd) => {
    Object.keys(filters).forEach((key) => {
      if(jd[key]) {
        filters[key].totalList.push(jd[key]);
    }})
  });
  return filters;
}
export const isFilterApply= (filters, filterId) => {
  return Object.keys(filters).some((key) => {
    if (filterId && filterId === key ) return false;
    if( filters[key].selectedList.length > 0 ) {
      return true;
    }
  });
}
export const getFilteredListForFilter = (list, filterId, selectedList) => {
return list.filter((jd) => {
  if(filterId === 'minExp' || filterId === 'minJdSalary') {
    const min = Math.min(...selectedList);
    return jd[filterId] ? jd[filterId] >= min: false;
  } else if(filterId === 'isRemote') {
    if(selectedList.includes('on-site')) return jd.location.toLowerCase() !== 'remote'
    if(selectedList.includes('remote')) return jd.location.toLowerCase() === 'remote'
  } else if(jd[filterId]) {
    return selectedList.includes(jd[filterId]);
  }
});
}

export const getUpdatedFilteredList = (list,filters,filterId,filterVal) => {
  if(!filters) return list;
  if(!isFilterApply(filters)) return list;
  let filteredList = [];
  Object.keys(filters).forEach((key) => {
    if (filterId && filterId === key ) {
      filters[key].selectedList = filters[key].selectedList.filter((val) => val !== filterVal);
    }
    filteredList.push( ...getFilteredListForFilter(list, key, filters[key].selectedList));
  });

  if(filteredList.length === 0 && !isFilterApply(filters) )  return list;
  return getUniqueObjList(filteredList);
}

