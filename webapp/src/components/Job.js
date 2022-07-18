import moment from "moment";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContextApp } from "../context/contextApp";
import "../sass/Jobs.scss";
import JobInfo from "./JobInfo";

const Job = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  status,
}) => {
  const { setEditJob, deleteJob } = useContextApp();

  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");
  //console.log(date);
  //console.log(jobLocation);
  //console.log(jobType);

  return (
    <div className="jCommon">
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div
            className={`status ${
              status === "Awaiting Response"
                ? "Awaiting"
                : status === "Interview Scheduled"
                ? "Interview"
                : status
            }`}
          >
            {status}
          </div>
        </div>
        <footer>
          <div>
            <Link
              to="/add-job"
              className="btn edit-btn"
              onClick={() => setEditJob(_id)}
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => deleteJob(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Job;
