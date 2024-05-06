import { useState, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

import Dropdown from "./Dropdown";
import ClickOutsideComponent from "./ClickOutsideComponent";
import Tag from "./Tag";
import { useDispatch, useSelector } from "react-redux";
import { filterActions, jdStoreActions } from "../store/Store";
import {
  getFilteredListForFilter,
  isFilterApply,
  getUpdatedFilteredList,
} from "../service/service";

const Filter = ({ filterId }) => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filterStore[filterId]);
  const filters = useSelector((state) => state?.filterStore);
  const jdList = useSelector((state) => state.jdStore.jdList);
  const [showTitle, setShowTitle] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef("");

  const handleOnChange = (value) => {
    setShowTitle(!!value);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };
  const openDropdown = () => {
    if (!showDropdown) setShowDropdown(true);
  };

  const addFilterToSelected = (filterVal) => {
    dispatch(
      filterActions.addToSelected({
        filter: filterId,
        list: [filterVal],
      })
    );
    dispatch(
      jdStoreActions.addFilteredList({
        list: getFilteredListForFilter(jdList, filterId, [filterVal]),
        toAppend: isFilterApply(filters),
      })
    );
    closeDropdown();
  };

  const removeFilterFromSelected = (filterVal) => {
    dispatch(
      filterActions.removeFromSelected({
        filter: filterId,
        list: [filterVal],
      })
    );
    dispatch(
      jdStoreActions.addFilteredList({
        list: getUpdatedFilteredList(
          jdList,
          structuredClone(filters),
          filterId,
          filterVal
        ),
        toAppend: false,
      })
    );
    closeDropdown();
  };

  const clearFilter = (filterId) => {
    closeDropdown();
    setShowTitle(false);
    dispatch(filterActions.clearSelected({ filter: filterId }));
    dispatch(
      jdStoreActions.removeFromFilteredList({
        list: getFilteredListForFilter(jdList, filterId, filter.selectedList),
        toAppend: isFilterApply(filters, filterId),
      })
    );
  };

  return (
    <div
      className="mx-2"
      style={{
        minWidth: "60px",
      }}
    >
      <div
        className="mx-2 mb-0 w-100"
        style={{
          minWidth: "50px",
          height: "20px",
        }}
      >
        {(filter.selectedList.length > 0 || showTitle) && filter.name}
      </div>
      <div
        className="d-flex justify-content-start m-2 ps-2 position-relative flex-row flex-wrap w-100"
        style={{
          border: showDropdown
            ? "2px solid blue"
            : "2px solid var(--card-body-border-color)",
          borderRadius: "5px",
        }}
      >
        <div className="d-flex justify-content-start w-100">
          {filter.selectedList.length > 0 &&
            filter.selectedList.map((selectedFilter) => {
              return (
                <Tag
                  key={selectedFilter}
                  selectedFilter={selectedFilter}
                  removeFilterFromSelected={removeFilterFromSelected}
                ></Tag>
              );
            })}
          <ClickOutsideComponent onClickOutside={closeDropdown}>
            <div className="d-flex justify-content-between">
              <input
                type="text"
                placeholder={
                  !(filter.selectedList.length > 0) || showTitle
                    ? filter.name
                    : ""
                }
                ref={inputRef}
                onChange={() => handleOnChange(inputRef.current.value)}
                style={{
                  color: "inherit",
                  background: "0px center",
                  opacity: "1",
                  width: "100%",
                  height: "30px",
                  font: "inherit",
                  minWidth: "2px",
                  border: "0px",
                  margin: "0px",
                  outline: "0px",
                  padding: "0px",
                }}
                onClick={openDropdown}
              />
              {showDropdown && (
                <Dropdown
                  filterId={filterId}
                  closeDropdown={closeDropdown}
                  addFilterToSelected={addFilterToSelected}
                ></Dropdown>
              )}
              <div className="d-flex mt-2">
                {filter.selectedList.length > 0 && (
                  <IoClose
                    className="ms-1"
                    onClick={() => clearFilter(filterId)}
                  />
                )}
                <FaChevronDown className=" mx-1" onClick={toggleDropdown} />
              </div>
            </div>
          </ClickOutsideComponent>
        </div>
      </div>
    </div>
  );
};
export default Filter;
