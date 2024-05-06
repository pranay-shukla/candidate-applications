import { useSelector } from "react-redux";
import Filter from "./Filter";

const Filters = () => {
  const filters = useSelector((state) => state?.filterStore);
  // const updateFilteredList = () => {

  // }

  return (
    <div className="d-flex mx-5 my-4 justify-content-center align-items-center flex-wrap">
      {Object.keys(filters).map((key) => {
        return <Filter key={key} filterId={key}></Filter>;
      })}
    </div>
  );
};
export default Filters;
