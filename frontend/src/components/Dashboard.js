import axios from 'axios';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  MenuItem,
  IconButton,
  Select,
  FormControl,
  InputLabel,
  Menu,
  ListItemIcon,
  Avatar
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderIcon from '@mui/icons-material/Folder';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProjects,
  createProject,
  deleteProject,
  updateProject,
  fetchTasks,
  deleteTask,
  updateTask,
  logout
} from '../components/redux/actions';
import Navbar from './Navbar';
import DashboardCharts from './DashboardCharts';
import ProjectUpdate from './Projectupdate';
import TaskUpdate from './TaskUpdate';

const defaultProjects = [
  { _id: 'd1', title: 'Website Redesign', description: 'UI revamp', createdBy: { email: 'admin@example.com' }, members: ['Alice', 'Bob'] },
  { _id: 'd2', title: 'Mobile App', description: 'Build app', createdBy: { email: 'manager@example.com' }, members: ['Charlie'] },
  { _id: 'd3', title: 'Marketing Campaign', description: 'Launch ads', createdBy: { email: 'marketing@example.com' }, members: ['Daisy'] },
  { _id: 'd4', title: 'API Integration', description: 'Payment API', createdBy: { email: 'dev@example.com' }, members: ['Sam'] },
  { _id: 'd5', title: 'Client Onboarding', description: 'Automate onboarding', createdBy: { email: 'support@example.com' }, members: ['Grace'] },
];

const defaultTasks = [
  { _id: 't1', title: 'Design Login Page', description: 'Login UI', dueDate: new Date().toISOString(), status: 'Todo', assignedTo: 'Alice', projectId: 'd1' },
  { _id: 't2', title: 'Write API Docs', description: 'Backend docs', dueDate: new Date().toISOString(), status: 'In Progress', assignedTo: 'Bob', projectId: 'd2' },
  { _id: 't3', title: 'Test Payment Flow', description: 'E2E test', dueDate: new Date().toISOString(), status: 'Completed', assignedTo: 'Charlie', projectId: 'd4' },
  { _id: 't4', title: 'Publish Ads', description: 'Go live with ads', dueDate: new Date().toISOString(), status: 'Todo', assignedTo: 'Daisy', projectId: 'd3' },
  { _id: 't5', title: 'Send Welcome Emails', description: 'Automated emails', dueDate: new Date().toISOString(), status: 'Todo', assignedTo: 'Grace', projectId: 'd5' },
];

export default function Dashboard() {
   const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projects, tasks } = useSelector((state) => state);

  const mergedProjects = [...defaultProjects, ...(Array.isArray(projects) ? projects : [])];
  const mergedTasks = [...defaultTasks, ...(Array.isArray(tasks) ? tasks : [])];

  const [activeView, setActiveView] = useState('projects');
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [editProjectDialogOpen, setEditProjectDialogOpen] = useState(false);
  const [editTaskDialogOpen, setEditTaskDialogOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const [newProject, setNewProject] = useState({ title: '', description: '', createdBy: '', members: '' });
  const [newTask, setNewTask] = useState({
  title: '',
  description: '',
  dueDate: '',
  status: '',
  assignedTo: '',
  projectId: '',
  file: null,
});

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAddProject = () => {
    dispatch(createProject(newProject));
    console.log(newProject);
    
    setNewProject({ title: '', description: '',createdBy:'',members: '' });
    setProjectDialogOpen(false);
  };

 const handleAddTask = async () => {
  const { title, description, dueDate, status, assignedTo, projectId, file } = newTask;

  if (!title || !description || !dueDate || !status || !assignedTo || !projectId || !file) {
    return alert('Please fill in all fields including file');
  }

  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('dueDate', dueDate);
    formData.append('status', status);
    formData.append('assignedTo', assignedTo);
    formData.append('projectId', projectId);
    formData.append('file', file); // assuming `file` is a File object

    const token = localStorage.getItem('token');
    await axios.post(
      'https://project-management-api-5d48.onrender.com/api/tasks',
      formData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    setNewTask({ title: '', description: '', dueDate: '', status: '', assignedTo: '', projectId: '', file: null });
    setTaskDialogOpen(false);
    dispatch(fetchTasks()); // Refresh task list
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || 'Failed to create task');
  }
};


  const handleDeleteProject = (id) => dispatch(deleteProject(id));
  const handleDeleteTask = (id) => dispatch(deleteTask(id));
  const handleMenuClick = (e, id, type) => {
    setAnchorEl(e.currentTarget);
    if (type === 'project') setSelectedProjectId(id);
    else setSelectedTaskId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProjectId(null);
    setSelectedTaskId(null);
  };



  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

   const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const adminName = "Subrahmanyam Admin"

  return (
    <>
      <Navbar />
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <Box sx={{ width: '20%', bgcolor: '#f5f5f5', p: 2 }}>
          <Box display="flex" alignItems="center" gap={2}>
          <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
            <Avatar>{adminName[0]}</Avatar>
          </IconButton>
          <Typography>{adminName}</Typography>
        </Box>
          <Typography sx={{ mt: 2 }} variant="h6">Menu</Typography>
          <List>
            <ListItem button onClick={() => setActiveView('dashboard')}>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>

            <ListItem button onClick={() => setActiveView('projects')}>
              <ListItemIcon><FolderIcon /></ListItemIcon>
              <ListItemText primary="Projects" />
            </ListItem>

            <ListItem button onClick={() => setActiveView('tasks')}>
              <ListItemIcon><AssignmentIcon /></ListItemIcon>
              <ListItemText primary="Tasks" />
            </ListItem>

            <ListItem button onClick={handleLogout}>
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
        <Box sx={{ width: '80%', p: 3, overflowY: 'auto' }}>
          {activeView === 'dashboard' && <DashboardCharts projects={mergedProjects} tasks={mergedTasks} />}
          {activeView === 'projects' && (
        <>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Button variant="contained" onClick={() => setProjectDialogOpen(true)}>+ Add Project</Button>
          </Paper>

          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Project List</Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Created By</TableCell>
                    <TableCell>Members</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mergedProjects?.map((proj) => (
                    <TableRow key={proj._id}>
                      <TableCell>{proj.title}</TableCell>
                      <TableCell>{proj.description}</TableCell>
                      <TableCell>{proj.createdBy?.email || 'N/A'}</TableCell>
                      <TableCell>{proj.members?.map((m, i) => <Chip key={i} label={m?.email || m} size="small" sx={{ mr: 0.5 }} />)}</TableCell>
                      <TableCell align="center">
                        <IconButton onClick={() => {
                          setProjectToEdit(proj);
                          setEditProjectDialogOpen(true);
                        }}>
                          <MoreVertIcon />
                        </IconButton>
                        <Button color="error" onClick={() => handleDeleteProject(proj._id)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </>
      )}
          {activeView === 'tasks' && (
            <>
              <Paper sx={{ p: 2, mb: 3 }}>
                <Button variant="contained" onClick={() => setTaskDialogOpen(true)}>+ Add Task</Button>
              </Paper>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">All Tasks</Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Due Date</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Assigned To</TableCell>
                        <TableCell>Project</TableCell>
                        <TableCell align="center">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {mergedTasks.map((task) => {
                        const project = mergedProjects.find((p) => p._id === task.projectId || p.title === task.projectId);
                        return (
                          <TableRow key={task._id}>
                            <TableCell>{task.title}</TableCell>
                            <TableCell>{task.description}</TableCell>
                            <TableCell>{task.dueDate?.slice(0, 10)}</TableCell>
                            <TableCell>{task.status}</TableCell>
                           <TableCell>
                              {task.assignedTo && typeof task.assignedTo === 'object'
                                ? task.assignedTo.email
                                : task.assignedTo || 'N/A'}
                            </TableCell>

                            <TableCell>{project?.title || 'N/A'}</TableCell>
                            <TableCell align="center">
                              <IconButton onClick={(e) => handleMenuClick(e, task._id, 'task')}><MoreVertIcon /></IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </>
          )}
        </Box>
      </Box>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => {
          if (selectedProjectId) {
            const proj = mergedProjects.find((p) => p._id === selectedProjectId);
            setProjectToEdit(proj);
            setEditProjectDialogOpen(true);
          } else if (selectedTaskId) {
            const task = mergedTasks.find((t) => t._id === selectedTaskId);
            setTaskToEdit(task);
            setEditTaskDialogOpen(true);
          }
          handleMenuClose();
        }}>Edit</MenuItem>
        {selectedProjectId && <MenuItem onClick={handleDeleteProject}>Delete</MenuItem>}
        {selectedTaskId && <MenuItem onClick={handleDeleteTask}>Delete</MenuItem>}
      </Menu>
     <ProjectUpdate
        open={editProjectDialogOpen}
        project={projectToEdit}
        onClose={() => setEditProjectDialogOpen(false)}
        onSave={(data) => {
          dispatch(updateProject(data));
          setEditProjectDialogOpen(false);
        }}
      />
      <TaskUpdate
  open={editTaskDialogOpen}
  task={taskToEdit}
  onClose={() => setEditTaskDialogOpen(false)}
  onSave={(data) => {
    dispatch(updateTask(data));
    setEditTaskDialogOpen(false);
  }}
/>
      <Dialog open={projectDialogOpen} onClose={() => setProjectDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add New Project</DialogTitle>
        <DialogContent dividers>
          <TextField fullWidth label="Title" value={newProject.title} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} sx={{ mb: 2 }} />
          <TextField fullWidth multiline rows={3} label="Description" value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} sx={{ mb: 2 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProjectDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddProject}>Add</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={taskDialogOpen} onClose={() => setTaskDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent dividers>
          <TextField fullWidth label="Title" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} sx={{ mb: 2 }} />
          <TextField fullWidth multiline rows={3} label="Description" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} sx={{ mb: 2 }} />
          <TextField fullWidth type="date" label="Due Date" value={newTask.dueDate} onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} sx={{ mb: 2 }} />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select value={newTask.status} onChange={(e) => setNewTask({ ...newTask, status: e.target.value })} label="Status">
              <MenuItem value="Todo">Todo</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <TextField fullWidth label="Assigned To" value={newTask.assignedTo} onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })} sx={{ mb: 2 }} />
          <FormControl fullWidth>
            <InputLabel>Project</InputLabel>
            <Select value={newTask.projectId} onChange={(e) => setNewTask({ ...newTask, projectId: e.target.value })} label="Project">
              {mergedProjects?.map((proj) => (
                <MenuItem key={proj._id} value={proj.title}>{proj.title}</MenuItem>
              ))}
            </Select>
            <TextField
            fullWidth
            type="file"
            onChange={(e) => setNewTask({ ...newTask, file: e.target.files[0] })}
            sx={{ mb: 2 }}
            inputProps={{ accept: '.pdf,.doc,.docx,.png,.jpg,.jpeg' }}
          />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTaskDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddTask}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
