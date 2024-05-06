import { IoClose } from "react-icons/io5";

const Tag = ({ selectedFilter, removeFilterFromSelected }) => {
  return (
    <div
      className="mx-1 px-1 border"
      style={{
        height: "24px",
        alignSelf: "center",
        fontSize: "13px",
        textAlign: "center",
        borderRadius: "2px",
      }}
    >
      {selectedFilter ? selectedFilter : ""}
      <IoClose
        className="ms-1"
        onClick={() => removeFilterFromSelected(selectedFilter)}
      />
    </div>
  );
};
export default Tag;
