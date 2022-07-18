import { IoBarChartSharp } from "react-icons/io5";
import { IoCalendarSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

//adding the link component with url to trverse through different pages in the application

const links = [
  { id: 1, text: "Profile", path: "profile", icon: <ImProfile /> },
  { id: 2, text: "Manage Jobs", path: "add-job", icon: <FaWpforms /> },
  { id: 3, text: "View All Jobs", path: "all-jobs", icon: <MdQueryStats /> },
  { id: 4, text: "Job Analysis", path: "/", icon: <IoBarChartSharp /> },
  { id: 5, text: "Calendar", path: "scheduler", icon: <IoCalendarSharp /> },
];

export default links;
