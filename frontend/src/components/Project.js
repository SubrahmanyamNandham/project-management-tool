// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import {
//   Box,
//   Paper,
//   Typography,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Chip,
//   Snackbar,
//   Alert,
//   IconButton
// } from '@mui/material';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

// export default function Project() {
//   const [projectDialogOpen, setProjectDialogOpen] = useState(false);
//   const [projects, setProjects] = useState([]);
//   const [newProject, setNewProject] = useState({
//     title: '',
//     description: '',
//     members: ''
//   });
//   const [snack, setSnack] = useState({
//     open: false,
//     message: '',
//     severity: 'success'
//   });

//   const token = localStorage.getItem('token');

//   const showSnackbar = (message, severity = 'success') => {
//     setSnack({ open: true, message, severity });
//   };

//   // Fetch projects on load
//   useEffect(() => {
//     fetchProjects();
//   });

//   const fetchProjects = async () => {
//     try {
//       const res = await axios.get('https://project-management-api-5d48.onrender.com/api/projects', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setProjects(res.data);
//     } catch (err) {
//       console.error('Failed to fetch projects:', err);
//       showSnackbar('Failed to load projects', 'error');
//     }
//   };

//   const handleAddProject = async () => {
//     const trimmedMembers = newProject.members
//       .split(',')
//       .map((m) => m.trim())
//       .filter((m) => m);

//     if (!newProject.title || !newProject.description || trimmedMembers.length === 0) {
//       return showSnackbar('Please fill in all fields', 'error');
//     }

//     try {
//       const res = await axios.post(
//         'https://project-management-api-5d48.onrender.com/api/projects',
//         {
//           title: newProject.title,
//           description: newProject.description,
//           members: trimmedMembers
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       setProjects([...projects, res.data]);
//       setNewProject({ title: '', description: '', members: '' });
//       setProjectDialogOpen(false);
//       showSnackbar('Project created successfully!');
//     } catch (err) {
//       console.error(err);
//       showSnackbar(err.response?.data?.message || 'Failed to create project', 'error');
//     }
//   };

//   return (
//     <Box p={3}>
//       <Paper sx={{ p: 2, mb: 3 }}>
//         <Typography variant="h6">Projects</Typography>
//         <Button variant="contained" onClick={() => setProjectDialogOpen(true)} sx={{ mt: 1 }}>
//           + Add Project
//         </Button>
//       </Paper>

//       <TableContainer component={Paper}>
//         <Table size="small">
//           <TableHead>
//             <TableRow>
//               <TableCell>Title</TableCell>
//               <TableCell>Description</TableCell>
//               <TableCell>Created By</TableCell>
//               <TableCell>Members</TableCell>
//               <TableCell align="center">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {projects.map((proj) => (
//               <TableRow key={proj._id}>
//                 <TableCell>{proj.title}</TableCell>
//                 <TableCell>{proj.description}</TableCell>
//                 <TableCell>{proj.createdBy?.email || 'N/A'}</TableCell>
//                 <TableCell>
//                   {proj.members.map((m, idx) => (
//                     <Chip key={idx} label={m.email || m} size="small" sx={{ mr: 0.5 }} />
//                   ))}
//                 </TableCell>
//                 <TableCell align="center">
//                   <IconButton>
//                     <MoreVertIcon />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Add Project Dialog */}
//       <Dialog open={projectDialogOpen} onClose={() => setProjectDialogOpen(false)} fullWidth maxWidth="sm">
//         <DialogTitle>Add New Project</DialogTitle>
//         <DialogContent dividers>
//           <TextField
//             fullWidth
//             label="Title"
//             value={newProject.title}
//             onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
//             sx={{ mb: 2 }}
//           />
//           <TextField
//             fullWidth
//             multiline
//             rows={3}
//             label="Description"
//             value={newProject.description}
//             onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
//             sx={{ mb: 2 }}
//           />
//           <TextField
//             fullWidth
//             label="Member Emails"
//             value={newProject.members}
//             onChange={(e) => setNewProject({ ...newProject, members: e.target.value })}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setProjectDialogOpen(false)}>Cancel</Button>
//           <Button variant="contained" onClick={handleAddProject}>Add</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Snackbar */}
//       <Snackbar
//         open={snack.open}
//         autoHideDuration={4000}
//         onClose={() => setSnack({ ...snack, open: false })}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert severity={snack.severity} onClose={() => setSnack({ ...snack, open: false })}>
//           {snack.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }

