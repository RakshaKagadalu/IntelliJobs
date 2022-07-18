import { FormInput, FormRowSelect } from ".";
import { useContextApp } from "../context/contextApp";
import "../sass/SearchContainer.scss";

const SearchContainer = () => {
  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    handleChange,
    jobTypeOptions,
    statusOptions,
    clearSearch,
  } = useContextApp();

  const handleSearch = (e) => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearSearch();
  };

  return (
    <form className="form">
      <h4>search form</h4>
      {/* search position */}
      <div className="form-center">
        <FormInput
          labelText="Search:"
          type="text"
          name="search"
          value={search}
          handleChange={handleSearch}
        ></FormInput>

        {/* search by job application status */}

        <FormRowSelect
          labelText="Job Application Status:"
          name="searchStatus"
          value={searchStatus}
          handleChange={handleSearch}
          list={["All", ...statusOptions]}
        ></FormRowSelect>

        {/* search by job Type */}

        <FormRowSelect
          labelText="Job Application Type:"
          name="searchType"
          value={searchType}
          handleChange={handleSearch}
          list={["All", ...jobTypeOptions]}
        ></FormRowSelect>

        {/* sort by job application status */}

        <FormRowSelect
          labelText="Sort Jobs By:"
          name="sort"
          value={sort}
          handleChange={handleSearch}
          list={sortOptions}
        ></FormRowSelect>

        <button
          className="btn btn-block "
          disabled={isLoading}
          onClick={handleSubmit}
        >
          clear Search
        </button>
      </div>
    </form>
  );
};

export default SearchContainer;
