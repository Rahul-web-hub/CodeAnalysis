import React, { useState } from 'react';
import { 
  Box, Container, Typography, TextField, Button, CircularProgress, Alert 
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { submitCode, fetchAnalysisResults } from '../services/api';

// LeetCode-inspired theme
const leetCodeTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#ffa116' },
    background: { default: '#1a1a1a', paper: '#282828' },
    text: { primary: '#ffffff', secondary: '#8a8a8a' },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

const CodeSubmission = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    setAnalysisResult(null);

    try {
      // Submit the code
      const data = await submitCode(code);
      setSuccessMessage('Code submitted successfully!');

      // Fetch the analysis result
      const result = await fetchAnalysisResults(data.submission_id);
      setAnalysisResult(result);
    } catch (err) {
      setError(err.message || 'Failed to process submission. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={leetCodeTheme}>
      <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="md">
          <Typography variant="h4" sx={{ color: 'primary.main', mb: 4 }}>
            Submit Your Code
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              multiline
              rows={10}
              variant="outlined"
              placeholder="Paste your code here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              InputProps={{
                style: { color: leetCodeTheme.palette.text.primary },
              }}
              InputLabelProps={{
                style: { color: leetCodeTheme.palette.text.secondary },
              }}
              sx={{
                mb: 2,
                backgroundColor: 'background.paper',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'text.secondary' },
                  '&:hover fieldset': { borderColor: 'text.primary' },
                  '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading || !code.trim()}
              sx={{ textTransform: 'none', fontWeight: 'bold' }}
            >
              {loading ? <CircularProgress size={24} /> : 'Submit'}
            </Button>
          </form>
          {successMessage && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {successMessage}
            </Alert>
          )}
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          {analysisResult && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" sx={{ color: 'primary.main', mb: 2 }}>
                Analysis Result
              </Typography>
              <pre style={{ backgroundColor: '#333', color: '#fff', padding: '1em', borderRadius: '5px' }}>
                {JSON.stringify(analysisResult, null, 2)}
              </pre>
            </Box>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default CodeSubmission;
