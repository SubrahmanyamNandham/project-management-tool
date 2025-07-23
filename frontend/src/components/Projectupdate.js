// components/TaskUpdate.js
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material';

export default function TaskUpdate({ open, onClose, task, onSave }) {
  const handleChange = (field, value) => {
    onSave({ ...task, [field]: value });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent dividers>
        <TextField
          fullWidth
          label="Title"
          value={task?.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Description"
          value={task?.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Due Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={task?.dueDate?.slice(0, 10) || ''}
          onChange={(e) => handleChange('dueDate', e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Status"
          value={task?.status || ''}
          onChange={(e) => handleChange('status', e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Assigned To (email)"
          value={typeof task?.assignedTo === 'object' ? task.assignedTo.email : task?.assignedTo || ''}
          onChange={(e) => handleChange('assignedTo', e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Project Title"
          value={task?.projectId?.title || task?.projectId || ''}
          onChange={(e) => handleChange('projectId', e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={() => onSave(task)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
