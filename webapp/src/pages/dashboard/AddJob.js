import { FormInput, AlertMessage, FormRowSelect } from "../../components";
import { useContextApp } from "../../context/contextApp";
import "../../sass/DashboardPage.scss";

const AddJob = () => {
  const {
    isLoading,
    isEditing,
    showAlert,

    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createJob,
    editJob,
    dateOfInterview,
    addEvent,
  } = useContextApp();

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (!position || !company || !jobLocation) {
    //   showAlert();
    //   return;
    // }
    if (isEditing) {
      editJob();
      return;
    }
    createJob();
  };

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  return (
    <div className="jobCommon">
      <form className="form">
        <h3>{isEditing ? "Edit Job Status" : "Add New Job"}</h3>
        {showAlert && <AlertMessage />}

        {/*HTML element for position field */}
        <div className="form-center">
          <FormInput
            type="text"
            name="position"
            labelText="Job Role"
            value={position}
            handleChange={handleJobInput}
            placeholder="Enter a job role"
          />
          {/* html element company */}
          <FormInput
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
            placeholder="Enter the company"
          />
          {/* html element for location */}
          <FormInput
            type="text"
            labelText="location"
            name="jobLocation"
            value={jobLocation}
            handleChange={handleJobInput}
            placeholder="Enter the job location"
          />
          {/* html element for job status */}
          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
            placeholder="Enter the job status"
          />
          {/* html element for job type */}
          <FormRowSelect
            name="jobType"
            labelText="Job type"
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />
          <FormInput
            type="date"
            name="dateOfInterview"
            labelText="Interview Date"
            handleChange={handleJobInput}
          />
          {/* html element for btn container */}
          <div className="btn-container">
            <button
              className="btn btn-block submit-btn"
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
            <button
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                clearValues();
                //console.log("hello")
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddJob;
