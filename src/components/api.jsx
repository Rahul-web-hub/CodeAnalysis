import React, { useState, useEffect } from 'react';
import { 
  AppBar, Toolbar, Typography, Container, TextField, Select, MenuItem,
  FormControl, InputLabel, Grid, CircularProgress, Box, Chip, Avatar,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from './navbar';
import LeetCodeChart from './StatsChart';

// LeetCode-inspired theme
const leetCodeTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffa116',
    },
    background: {
      default: '#1a1a1a',
      paper: '#282828',
    },
    text: {
      primary: '#ffffff',
      secondary: '#8a8a8a',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

const ProblemList = ({ problems }) => (
  <TableContainer component={Paper} sx={{ marginTop: '20px', backgroundColor: 'background.paper', color: 'text.primary' }}>
    <Table sx={{ minWidth: 650 }}>
      <TableHead>
        <TableRow>
          <TableCell sx={{ color: 'primary.main', fontWeight: 'bold' }}>ID</TableCell>
          <TableCell sx={{ color: 'primary.main', fontWeight: 'bold' }}>Title</TableCell>
          <TableCell sx={{ color: 'primary.main', fontWeight: 'bold' }}>Difficulty</TableCell>
          <TableCell sx={{ color: 'primary.main', fontWeight: 'bold' }}>Company</TableCell>
          <TableCell sx={{ color: 'primary.main', fontWeight: 'bold' }}>Description</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {problems.map((problem) => (
          <TableRow
            key={problem.id}
            sx={{
              '&:last-child td, &:last-child th': { border: 0 },
              '&:hover': {
                backgroundColor: 'rgba(255, 161, 22, 0.08)',
                cursor: 'pointer',
              },
            }}
            onClick={() => window.open(problem.leetcode_link, '_blank')}
          >
            <TableCell>
              <Chip
                label={problem.id}
                size="small"
                sx={{
                  backgroundColor: 'background.paper',
                  color: 'text.primary',
                  border: '1px solid',
                  borderColor: 'text.secondary'
                }}
              />
            </TableCell>
            <TableCell sx={{ color: 'primary.main', fontWeight: 'medium' }}>{problem.title}</TableCell>
            <TableCell>
              <Chip
                label={problem.difficulty}
                size="small"
                sx={{
                  backgroundColor:
                    problem.difficulty === 'Easy' ? '#00b8a3' :
                    problem.difficulty === 'Medium' ? '#ffc01e' : '#ff375f',
                  color: '#ffffff',
                }}
              />
            </TableCell>
            <TableCell>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  src={`/logos/${problem.company.toLowerCase()}.png`}
                  alt={problem.company}
                  sx={{ width: 24, height: 24, marginRight: '8px' }}
                />
                <Typography variant="body2" sx={{ color: 'text.primary' }}>
                  {problem.company}
                </Typography>
              </Box>
            </TableCell>
            <TableCell sx={{ color: 'text.secondary' }}>{problem.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

const Api = () => {
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/problems/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProblems(data);
        setFilteredProblems(data);
        const uniqueCompanies = [...new Set(data.map(problem => problem.company))];
        setCompanies(uniqueCompanies);
      } catch (e) {
        setError('Failed to fetch problems: ' + e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  useEffect(() => {
    const filtered = problems.filter((problem) => {
      const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDifficulty = !difficultyFilter || problem.difficulty === difficultyFilter;
      const matchesCompany = !companyFilter || problem.company === companyFilter;
      return matchesSearch && matchesDifficulty && matchesCompany;
    });
    setFilteredProblems(filtered);
  }, [searchTerm, difficultyFilter, companyFilter, problems]);

  return (
    <ThemeProvider theme={leetCodeTheme}>
      <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
        <Navbar />
        <Container sx={{ paddingTop: '20px' }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'primary.main' }}>
            LeetCode Problem List
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Search problems"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputLabelProps={{
                  style: { color: leetCodeTheme.palette.text.secondary },
                }}
                InputProps={{
                  style: { color: leetCodeTheme.palette.text.primary },
                }}
                sx={{
                  backgroundColor: 'background.paper',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'text.secondary',
                    },
                    '&:hover fieldset': {
                      borderColor: 'text.primary',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth variant="outlined" sx={{ backgroundColor: 'background.paper' }}>
                <InputLabel sx={{ color: 'text.secondary' }}>Difficulty</InputLabel>
                <Select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                  label="Difficulty"
                  sx={{ 
                    color: 'text.primary',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'text.secondary',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'text.primary',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                  }}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Easy">Easy</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Hard">Hard</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth variant="outlined" sx={{ backgroundColor: 'background.paper' }}>
                <InputLabel sx={{ color: 'text.secondary' }}>Company</InputLabel>
                <Select
                  value={companyFilter}
                  onChange={(e) => setCompanyFilter(e.target.value)}
                  label="Company"
                  sx={{ 
                    color: 'text.primary',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'text.secondary',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'text.primary',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                  }}
                >
                  <MenuItem value="">All</MenuItem>
                  {companies.map((company) => (
                    <MenuItem key={company} value={company}>
                      {company}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error" sx={{ mt: 4 }}>{error}</Typography>
          ) : (
            <>
            <LeetCodeChart problems={problems} />
            <ProblemList problems={filteredProblems} />
            </>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Api;