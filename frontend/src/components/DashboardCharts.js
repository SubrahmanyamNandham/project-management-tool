import {
  Grid,
  Paper,
  Typography
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

export default function DashboardCharts({ projects, tasks }) {
  // Count task status
  const statusCount = {
    Todo: 0,
    'In Progress': 0,
    Completed: 0
  };

  tasks?.forEach((task) => {
    if (statusCount[task.status] !== undefined) {
      statusCount[task.status]++;
    }
  });

  const pieData = Object.entries(statusCount).map(([status, value]) => ({
    name: status,
    value
  }));

  // Line chart: tasks added over time (placeholder)
  const taskTrendData = [
    { date: 'Jul 1', tasks: 2 },
    { date: 'Jul 5', tasks: 4 },
    { date: 'Jul 10', tasks: 7 },
    { date: 'Jul 15', tasks: 3 },
  ];

  // Group tasks by assignedTo for stacked bar
  const userTaskMap = {};

  tasks?.forEach((task) => {
    const user = task.assignedTo || 'Unassigned';
    if (!userTaskMap[user]) {
      userTaskMap[user] = { user, Todo: 0, Completed: 0 };
    }
    if (task.status === 'Todo') userTaskMap[user].Todo++;
    if (task.status === 'Completed') userTaskMap[user].Completed++;
  });

  const stackedTaskData = Object.values(userTaskMap);

  return (
    <Grid container spacing={2}>
      {/* Summary */}
      <Grid item xs={12} sm={6} md={4}>
        <Paper sx={{ p: 2, height: '200px' }}>
          <Typography variant="h6">Summary</Typography>
          <Typography>Total Projects: {projects?.length || 0}</Typography>
          <Typography>Total Tasks: {tasks?.length || 0}</Typography>
        </Paper>
      </Grid>

      {/* Pie Chart */}
      <Grid item xs={12} sm={6} md={4}>
        <Paper sx={{ p: 2, height: '300px' }}>
          <Typography variant="h6" gutterBottom>
            Task Status (Pie)
          </Typography>
          <ResponsiveContainer width="100%" height="80%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={70}
                label
                dataKey="value"
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      {/* Bar Chart */}
      <Grid item xs={12} sm={6} md={4}>
        <Paper sx={{ p: 2, height: '300px' }}>
          <Typography variant="h6" gutterBottom>
            Task Status (Bar)
          </Typography>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={pieData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      {/* Line Chart */}
      <Grid item xs={12} sm={6} md={6}>
        <Paper sx={{ p: 2, height: '300px' }}>
          <Typography variant="h6" gutterBottom>
            Tasks Over Time (Line)
          </Typography>
          <ResponsiveContainer width="100%" height="80%">
            <LineChart data={taskTrendData}>
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid stroke="#ccc" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="tasks" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      {/* Stacked Bar Chart */}
      <Grid item xs={12} sm={6} md={6}>
        <Paper sx={{ p: 2, height: '300px' }}>
          <Typography variant="h6" gutterBottom>
            Task Status per User (Stacked)
          </Typography>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={stackedTaskData}>
              <XAxis dataKey="user" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Todo" stackId="a" fill="#8884d8" />
              <Bar dataKey="Completed" stackId="a" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Grid>
  );
}
