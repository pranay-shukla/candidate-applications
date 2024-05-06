import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import JobCard from "./JobCard";
import { filterActions, jdStoreActions } from "../store/Store";
import { fetchData } from "../service/apiService";
import {
  getMappedData,
  getFilteredList,
  getUniqueSortedList,
  getUpdatedFilteredList,
} from "../service/service";

const JobList = () => {
  const jdLStore = useSelector((state) => state.jdStore);
  const filterStore = useSelector((state) => state.filterStore);
  const [loading, setLoading] = useState(false);
  let offset;
  let limit = 8;
  const dispatch = useDispatch();

  useEffect(() => {
    offset = 0;
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      ) {
        return;
      }
      getList(); // Fetch more data when user reaches the bottom
    };
    getList();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (loading) {
      updateFilteredList(jdLStore.jdList, filterStore);
    }
  }, [filterStore]);

  useEffect(() => {
    const fn = async () => {
      offset = jdLStore.jdList.length;
      if (!isVerticalScrollAvailable()) {
        console.log(offset);
        await getList();
      }
    };
    fn();
  }, [jdLStore]);

  const getList = async () => {
    debugger;
    setLoading(true);
    const response = await fetchData(limit, offset);
    dispatch(
      jdStoreActions.addJd({
        list: response.jdList,
      })
    );
    dispatch(
      jdStoreActions.updateTotalCount({
        totalCount: response.totalCount,
      })
    );
    dispatchInitialFilterData(response.jdList);
    offset += limit;
    setLoading(false);
    return new Promise((resolve) => resolve);
  };

  const updateFilteredList = (list, filters) => {
    list = getUpdatedFilteredList(list, filters);
    dispatch(
      jdStoreActions.addFilteredList({
        list: list,
      })
    );
  };
  const isVerticalScrollAvailable = () => {
    const { scrollHeight, clientHeight } = document.documentElement;
    return scrollHeight > clientHeight;
  };

  const dispatchInitialFilterData = (list) => {
    const filters = getMappedData(list);
    Object.keys(filters).forEach((key) => {
      filters[key].totalList = getFilteredList(filters[key].totalList, [
        null,
        undefined,
        0,
      ]);
      filters[key].totalList = getUniqueSortedList(filters[key].totalList);
      dispatch(
        filterActions.addToTotalList({
          filter: key,
          list: filters[key].totalList,
        })
      );
    });
    return filters;
  };

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center flex-wrap mx-auto"
        style={{ width: "80%" }}
      >
        {jdLStore.filteredList.length > 0 &&
          jdLStore.filteredList.map((job) => {
            return <JobCard key={job.jdUid} job={job}></JobCard>;
          })}
      </div>
      {loading && (
        <div className="text-center w-80">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      )}
    </>
  );
};

export default JobList;
