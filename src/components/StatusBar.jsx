import { Checkbox, FormControlLabel, Typography, Box } from '@mui/material';

const StatusBar = ({ problem, onStatusChange }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
    <FormControlLabel
      control={
        <Checkbox
          checked={problem.done}
          onClick={(e) => e.stopPropagation()} // Stop click event propagation
          onChange={(e) => onStatusChange(problem.id, e.target.checked)}
          sx={{ color: 'primary.main' }}
        />
      }
      label={
        <Typography sx={{ color: 'text.primary' }}>
          Mark as Done
        </Typography>
      }
    />
  </Box>
);

export default StatusBar;
