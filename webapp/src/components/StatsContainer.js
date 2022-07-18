import StatItem from "./StatItem";
import { useContextApp } from "../context/contextApp";
import {
  FaSuitcaseRolling,
  FaBug,
  FaCalendarCheck,
  FaCheckCircle,
} from "react-icons/fa";
import "../sass/StatsContainer.scss";

//creating a container which dispays both job count cards and charts when user clicks on Job analysis page
const StatsContainer = () => {
  const { stats } = useContextApp();

  const defaultStats = [
    {
      title: "Accepted",
      count: stats.Accepted || 0,
      icon: <FaCheckCircle />,
      color: "#82db7f",
      bcg: "#d6f2d5",
    },
    {
      title: "Pending",
      count: stats.Awaiting || 0,
      icon: <FaSuitcaseRolling />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
    {
      title: "Interview",
      count: stats.Interview || 0,
      icon: <FaCalendarCheck />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "Rejected",
      count: stats.Rejected || 0,
      icon: <FaBug />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];
  return (
    <div className="statsCom">
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />;
      })}
    </div>
  );
};

export default StatsContainer;
