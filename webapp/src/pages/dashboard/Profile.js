import { useState } from "react";
import "../../sass/DashboardPage.scss";
import { FormInput, AlertMessage } from "../../components";
import { useContextApp } from "../../context/contextApp";

const Profile = () => {
  const { user, showAlert, updateUser, isLoading } = useContextApp();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [location, setLocation] = useState(user?.location);

  const handleSubmit = (e) => {
    e.preventDefault();
    //checking for empty values in the profile page
    if (!name || !email || !lastName || !location) {
      showAlert();
      return;
    }
    updateUser({ name, email, lastName, location });
  };

  return (
    <div className="jobCommon">
      <form onSubmit={handleSubmit} className="form">
        <h3>profile</h3>
        {showAlert && <AlertMessage />}
        <div className="form-center">
          <FormInput
            type="text"
            name="name"
            value={name}
            handleChange={(e) => setName(e.target.value)}
            placeholder = "Enter your first name"
          />
          <FormInput
            type="text"
            labelText="Last Name"
            name="lastName"
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
            placeholder = "Enter your last name"
          />
          <FormInput
            type="email"
            labelText="Email"
            name="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
            placeholder = "Enter an email"
          />
          <FormInput
            type="text"
            name="location"
            value={location}
            handleChange={(e) => setLocation(e.target.value)}
            placeholder = "Enter your location"
          />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "Loading.." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
