// UserDashboard.js
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
} from '@mui/material';
import DashboardCharts from './DashboardCharts';

export default function UserDashboard({ user, projects, tasks, onBack }) {
  const userProjects = projects.filter(p => p.members.includes(user));
  const userTasks = tasks.filter(t => t.assignedTo === user);

  return (
    <>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">{user}'s Dashboard</Typography>
        <Button onClick={onBack}>Back to User List</Button>
      </Box>

      <DashboardCharts projects={userProjects} tasks={userTasks} />

      <Paper sx={{ mt: 3, p: 2 }}>
        <Typography variant="h6" gutterBottom>{user}'s Projects</Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Title</strong></TableCell>
                <TableCell><strong>Description</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userProjects.map((proj) => (
                <TableRow key={proj.id}>
                  <TableCell>{proj.title}</TableCell>
                  <TableCell>{proj.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper sx={{ mt: 3, p: 2 }}>
        <Typography variant="h6" gutterBottom>{user}'s Tasks</Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Title</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Due Date</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>{task.dueDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
