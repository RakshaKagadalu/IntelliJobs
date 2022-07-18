import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

//adding line chart to display the count of job application over 6 months
const AreaChartGraph = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={270}>
      <AreaChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area type="monotone" dataKey="count" fill="#b2d7eb" stroke="#2cb1bc" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartGraph;
