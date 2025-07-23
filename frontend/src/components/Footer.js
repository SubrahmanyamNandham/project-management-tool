import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box component="footer" sx={{ textAlign: 'center', py: 5, bgcolor: 'grey' }}>
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} krisp. All rights reserved.
      </Typography>
    </Box>
  );
}
