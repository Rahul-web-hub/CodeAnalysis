import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Box, Typography, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const LeetCodeChart = ({ problems }) => {
  const [selectedCompany, setSelectedCompany] = useState('All');
  const [filteredProblems, setFilteredProblems] = useState(problems);

  useEffect(() => {
    if (selectedCompany === 'All') {
      setFilteredProblems(problems);
    } else {
      setFilteredProblems(problems.filter(problem => problem.company === selectedCompany));
    }
  }, [selectedCompany, problems]);

  const difficultyCounts = {
    Easy: 0,
    Medium: 0,
    Hard: 0
  };

  filteredProblems.forEach(problem => {
    difficultyCounts[problem.difficulty]++;
  });

  const chartData = {
    labels: ['Easy', 'Medium', 'Hard'],
    datasets: [
      {
        data: [difficultyCounts.Easy, difficultyCounts.Medium, difficultyCounts.Hard],
        backgroundColor: ['#00b8a3', '#ffc01e', '#ff375f'],
        hoverBackgroundColor: ['#00a192', '#e6ac1b', '#e63254'],
      },
    ],
  };

  const companies = ['All', ...new Set(problems.map(problem => problem.company))];

  return (
    <Paper
      elevation={3}
      sx={{
        margin: '20px 0',
        padding: "20px",
        borderRadius: '8px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#282828',
        color: '#ffffff',
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#ffa116' }}>
        Problem Difficulty Distribution
      </Typography>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="company-select-label" sx={{ color: '#8a8a8a' }}>Company</InputLabel>
        <Select
          labelId="company-select-label"
          id="company-select"
          value={selectedCompany}
          label="Company"
          onChange={(e) => setSelectedCompany(e.target.value)}
          sx={{
            color: '#ffffff',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#8a8a8a',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#ffffff',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#ffa116',
            },
          }}
        >
          {companies.map((company) => (
            <MenuItem key={company} value={company}>
              {company}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ height: 400, width: '100%' }}>
        <Doughnut
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'right',
                labels: {
                  color: '#ffffff',
                },
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    let label = context.label || '';
                    if (label) {
                      label += ': ';
                    }
                    if (context.parsed !== null) {
                      label += context.parsed + ' problems';
                    }
                    return label;
                  }
                }
              }
            }
          }}
        />
      </Box>
    </Paper>
  );
};

export default LeetCodeChart;