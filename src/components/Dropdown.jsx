import { useSelector } from "react-redux";

const Dropdown = ({ filterId, closeDropdown, addFilterToSelected }) => {
  const totalList = useSelector(
    (state) => state.filterStore[filterId].totalList
  );

  if (totalList.length === 0) {
    closeDropdown();
  }

  return (
    <div
      className="position-absolute w-100"
      style={{
        top: "35px",
        left: "0px",
        minWidth: "80px",
        border: "2px solid var(--card-body-border-color)",
        maxHeight: "100px",
        overflowY: "scroll",
        zIndex: "99",
        borderRadius: "5px",
      }}
    >
      {totalList.length > 0 &&
        totalList.map((item) => {
          return (
            <div
              className="px-1"
              key={item}
              style={{
                backgroundColor: "white",
                boxShadow: "none",
                cursor: "pointer",
              }}
              onClick={() => {
                addFilterToSelected(item);
              }}
            >
              {item}
            </div>
          );
        })}
    </div>
  );
};
export default Dropdown;
