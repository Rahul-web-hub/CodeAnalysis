import React, { useState, useEffect, useMemo } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  CircularProgress,
  Box,
  Chip,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Modal,
  IconButton,
  Tooltip,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useDebounce } from "use-debounce";
import LeetCodeChart from "./StatsChart";
import StatusBar from "./StatusBar";
import { motion } from "framer-motion";

// Restored original LeetCode-inspired theme
const leetCodeTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffa116",
    },
    background: {
      default: "#1a1a1a",
      paper: "#282828",
    },
    text: {
      primary: "#ffffff",
      secondary: "#8a8a8a",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
});

const ProblemPreviewModal = ({ open, onClose, problem }) => {
  if (!problem) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "80%",
          maxWidth: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" sx={{ color: "primary.main", mb: 2 }}>
          {problem.title}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {problem.description}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Chip
            label={`Difficulty: ${problem.difficulty}`}
            sx={{
              backgroundColor:
                problem.difficulty === "Easy"
                  ? "#00b8a3"
                  : problem.difficulty === "Medium"
                  ? "#ffc01e"
                  : "#ff375f",
              color: "white",
            }}
          />
          <Tooltip title="Open in LeetCode">
            <IconButton
              color="primary"
              href={problem.leetcode_link}
              target="_blank"
              component="a"
            >
              <OpenInNewIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Modal>
  );
};

const ProblemList = ({
  problems,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  onStatusChange,
}) => {
  const [selectedProblem, setSelectedProblem] = useState(null);

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          marginTop: "20px",
          backgroundColor: "background.paper",
          color: "text.primary",
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow
              component={motion.tr} // Convert to motion component
              initial={{ opacity: 0 }} // Starting state
              animate={{ opacity: 1 }} // Ending state
              transition={{ duration: 0.5 }} // Animation duration
              whileHover={{ scale: 1.02 }}
            >
              {["ID", "Title", "Difficulty", "Company", "Description"].map(
                (header) => (
                  <TableCell
                    key={header}
                    sx={{ color: "primary.main", fontWeight: "bold" }}
                  >
                    {header}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {problems
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((problem) => (
                <TableRow
                  key={problem.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": {
                      backgroundColor: "rgba(255, 161, 22, 0.08)",
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => setSelectedProblem(problem)}
                  component={motion.tr} // Convert to motion component
                  initial={{ opacity: 0 }} // Starting state
                  animate={{ opacity: 1 }} // Ending state
                  transition={{ duration: 0.5 }} // Animation duration
                  whileHover={{ scale: 1.02 }}
                >
                  <TableCell>
                    <Chip
                      label={problem.id}
                      size="small"
                      sx={{
                        backgroundColor: "background.paper",
                        color: "text.primary",
                        border: "1px solid",
                        borderColor: "text.secondary",
                      }}
                    />
                  </TableCell>
                  <TableCell
                    sx={{ color: "primary.main", fontWeight: "medium" }}
                  >
                    {problem.title}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={problem.difficulty}
                      size="small"
                      sx={{
                        backgroundColor:
                          problem.difficulty === "Easy"
                            ? "#00b8a3"
                            : problem.difficulty === "Medium"
                            ? "#ffc01e"
                            : "#ff375f",
                        color: "#ffffff",
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        src={`/logos/${problem.company.toLowerCase()}.png`}
                        alt={problem.company}
                        sx={{ width: 24, height: 24, marginRight: "8px" }}
                      />
                      <Typography
                        variant="body2"
                        sx={{ color: "text.primary" }}
                      >
                        {problem.company}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: "text.secondary" }}>
                    {problem.description}
                    <StatusBar
                      problem={problem}
                      onStatusChange={onStatusChange}
                      onClick={(event) => event.stopPropagation()}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ProblemPreviewModal
        open={!!selectedProblem}
        onClose={() => setSelectedProblem(null)}
        problem={selectedProblem}
      />

      <TablePagination
        component="div"
        count={problems.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

const Api = () => {
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [companies, setCompanies] = useState([]);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/problems/`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProblems(data);
        setFilteredProblems(data);
        const uniqueCompanies = [
          ...new Set(data.map((problem) => problem.company)),
        ];
        setCompanies(uniqueCompanies);
      } catch (e) {
        setError("Failed to fetch problems: " + e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  const handleStatusChange = async (problemId, newStatus) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:4000/api/problems/${problemId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ done: newStatus }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorText}`
        );
      }

      const updatedProblem = await response.json();
      setProblems((prevProblems) =>
        prevProblems.map((problem) =>
          problem.id === updatedProblem.id ? updatedProblem : problem
        )
      );
    } catch (err) {
      console.error("Failed to update status:", err.message);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 20));
    setPage(0);
  };

  const filteredProblemsMemo = useMemo(() => {
    return problems.filter((problem) => {
      const matchesSearch = problem.title
        .toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase());
      const matchesDifficulty =
        !difficultyFilter || problem.difficulty === difficultyFilter;
      const matchesCompany =
        !companyFilter || problem.company === companyFilter;
      return matchesSearch && matchesDifficulty && matchesCompany;
    });
  }, [debouncedSearchTerm, difficultyFilter, companyFilter, problems]);

  return (
    <ThemeProvider theme={leetCodeTheme}>
      <Box sx={{ backgroundColor: "background.default", minHeight: "100vh" }}>
        <Box
          sx={{
            backgroundColor: "primary.main",
            padding: 2,
            textAlign: "center",
          }}
        >
          <Typography
            variant="body1"
            sx={{ color: "background.default", fontWeight: "bold" }}
          >
            Disclaimer: The company-related tags for problems are based on
            community-curated data and do not represent official affiliations
            with these companies.
          </Typography>
        </Box>

        <Container sx={{ paddingTop: "20px" }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ color: "primary.main" }}
          >
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
                  backgroundColor: "background.paper",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "text.secondary",
                    },
                    "&:hover fieldset": {
                      borderColor: "text.primary",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "primary.main",
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl
                fullWidth
                variant="outlined"
                sx={{ backgroundColor: "background.paper" }}
              >
                <InputLabel sx={{ color: "text.secondary" }}>
                  Difficulty
                </InputLabel>
                <Select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                  label="Difficulty"
                  sx={{
                    color: "text.primary",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "text.secondary",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "text.primary",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "primary.main",
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
              <FormControl
                fullWidth
                variant="outlined"
                sx={{ backgroundColor: "background.paper" }}
              >
                <InputLabel sx={{ color: "text.secondary" }}>
                  Company
                </InputLabel>
                <Select
                  value={companyFilter}
                  onChange={(e) => setCompanyFilter(e.target.value)}
                  label="Company"
                  sx={{
                    color: "text.primary",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "text.secondary",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "text.primary",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "primary.main",
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
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error" sx={{ mt: 4 }}>
              {error}
            </Typography>
          ) : (
            <>
              <LeetCodeChart problems={problems} />
              <ProblemList
                problems={filteredProblemsMemo}
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                onStatusChange={handleStatusChange}
              />
            </>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Api;
