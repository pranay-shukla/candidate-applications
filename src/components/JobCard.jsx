import { useState } from "react";
import style from "./JobCard.module.css";

const JobCard = ({ job }) => {
  const [isFullView, setIsFullView] = useState(false);
  return (
    <>
      <div className={style["card-body"]}>
        <div>
          <div className="d-flex justify-content-start">
            <img className={style["logo"]} src={job.logoUrl} alt="logo" />
            <div className={"mx-2 " + style["jd-info"]}>
              <h4 className={"mt-0 mb-0 "} style={{ fontSize: "1.25rem" }}>
                {job.companyName}
              </h4>
              <h3 className="mt-0 mb-1" style={{ fontSize: "1rem" }}>
                {job.jobRole}
              </h3>
              <p className="mb-0" style={{ fontSize: "0.75rem" }}>
                {job.location} | Exp: {job.minExp | 0} {job.maxExp ? "-" : ""}{" "}
                {job.maxExp} years
              </p>
            </div>
          </div>
          <p className={style["salary-info"]}>
            Estimated Salary: ₹{job.minJdSalary | 0} - {job.maxJdSalary | 0} LPA
            <span aria-label="Offered salary range"> ✅</span>
            <br />
          </p>
          <div
            className={
              style["description"] +
              (isFullView ? " " + style["full-view"] : "")
            }
          >
            <div className="d-flex justify-content-between align-items-start">
              <h6>Job Description:</h6>
              {isFullView && (
                <button
                  className="btn btn-link p-0 m-0"
                  onClick={() => {
                    setIsFullView((isFullView) => !isFullView);
                  }}
                >
                  {" "}
                  Show Less
                </button>
              )}
            </div>
            <div className={"m-2"}>
              <div
                style={{
                  fontWeight: "400",
                  overflowY: !isFullView ? "hidden" : "scroll",
                  height: !isFullView ? "240px" : "278px",
                }}
              >
                {job.jobDetailsFromCompany}
              </div>
            </div>
          </div>
          {!isFullView && (
            <div className="text-center">
              <button
                className="btn btn-link"
                onClick={() => {
                  setIsFullView((isFullView) => !isFullView);
                }}
              >
                View More
              </button>
            </div>
          )}
          <div className={style["jd-info"]}>
            <h5 className="mb-0 mt-2">Minimum Experience</h5>
            <h6>{job.minExp | 0} years</h6>
          </div>
        </div>
        <div>
          <div className="text-center">
            <a
              className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorPrimary MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorPrimary css-1dyt7kc"
              tabIndex="0"
              type="button"
              id="custom-btn"
              href={job.jdLink}
              style={{
                width: "100%",
                backgroundColor: "rgb(85, 239, 196)",
                color: "rgb(0, 0, 0)",
                fontWeight: "500",
                padding: "8px 18px",
                textDecoration: "none",
                borderRadius: "10px",
              }}
            >
              ⚡ Easy Apply
              <span className="MuiTouchRipple-root css-w0pj6f"></span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default JobCard;
