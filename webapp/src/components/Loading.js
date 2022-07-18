//creating a loading component to display during the page load

const Loading = ({ center }) => {
  return <div className={center ? "loading loading-center" : "loading"}></div>;
};

export default Loading;
