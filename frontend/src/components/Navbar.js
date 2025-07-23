import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  Box,
  ListItem,
  ListItemText
} from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ListItemIcon from '@mui/material/ListItemIcon';

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    console.log('Logging out...');
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <ListItem >
        <ListItemIcon><ManageAccountsIcon /></ListItemIcon>
        <ListItemText primary="Krisp Management System" />
      </ListItem>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
