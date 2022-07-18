import { JobsContainer, SearchContainer } from "../../components";

//Manage jobs page will have 2 container , one search filters and another is to display the job cards
const AllJobs = () => {
  return (
    <>
      <SearchContainer />
      <JobsContainer />
    </>
  );
};

export default AllJobs;
