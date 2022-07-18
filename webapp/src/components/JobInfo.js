import "../sass/JobDetails.scss";

//component to add job icon and job details to each job
const JobInfo = ({ icon, text }) => {
  return (
    <div className="jInfoCom">
      <span className="icon">{icon}</span>
      <span className="text">{text}</span>
    </div>
  );
};

export default JobInfo;
