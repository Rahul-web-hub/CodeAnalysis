import React, { useState } from 'react';
import { Box, Typography, Grid, Card, Button, Stack, Chip, Divider, IconButton, Collapse } from '@mui/material';
import { Code2, Filter, MessageCircle, BookOpen, Search, CheckCircle, TrendingUp, Star, ChevronDown, ChevronUp, Coffee, Brain, Timer, Trophy } from 'lucide-react';

const ExplorePage = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const trendingProblems = [
    { title: "Two Sum", difficulty: "Easy", submissions: 254 },
    { title: "Binary Search Trees", difficulty: "Medium", submissions: 187 },
    { title: "Dynamic Programming", difficulty: "Hard", submissions: 142 },
  ];

  const getDifficultyColor = (difficulty) => {
    const colors = {
      Easy: '#00b8a3',
      Medium: '#ffa116',
      Hard: '#ff375f'
    };
    return colors[difficulty] || '#666';
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      color: '#fff',
      padding: { xs: 2, md: 4 }
    }}>
      {/* Hero Section with Animated Background */}
      <Box sx={{ 
        position: 'relative',
        textAlign: 'center', 
        py: 8,
        background: 'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url("/api/placeholder/1200/400")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: 2,
        mb: 6,
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '200%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
          animation: 'shine 3s infinite',
        },
        '@keyframes shine': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        }
      }}>
        <Typography variant="h2" sx={{ 
          fontWeight: 800,
          background: 'linear-gradient(90deg, #FFA116 0%, #FF6B6B 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          mb: 2
        }}>
          Code. Learn. Grow.
        </Typography>
        <Typography variant="h5" sx={{ color: '#ccc', mb: 4 }}>
          Your journey to becoming a better programmer starts here
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button 
            variant="contained" 
            size="large"
            sx={{ 
              bgcolor: '#FFA116',
              '&:hover': { bgcolor: '#ff8c00' },
              px: 4,
              py: 1.5,
              borderRadius: 2
            }}
          >
            Start Coding Now
          </Button>
          <Button 
            variant="outlined"
            size="large"
            sx={{ 
              color: '#fff',
              borderColor: '#fff',
              '&:hover': { borderColor: '#FFA116', color: '#FFA116' },
              px: 4,
              py: 1.5,
              borderRadius: 2
            }}
          >
            Explore Features
          </Button>
        </Stack>
      </Box>

      {/* Quick Stats Bar */}
      <Grid container spacing={2} sx={{ mb: 6 }}>
        {[
          { icon: Brain, label: "Problem Solving" },
          { icon: Timer, label: "Time Management" },
          { icon: Trophy, label: "Skill Growth" },
          { icon: Coffee, label: "Learn at Your Pace" }
        ].map((item, index) => (
          <Grid item xs={6} md={3} key={index}>
            <Card sx={{ 
              bgcolor: 'rgba(255,255,255,0.05)',
              p: 2,
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <item.icon size={24} color="#FFA116" />
              <Typography sx={{ color: '#ccc', mt: 1 }}>{item.label}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Trending Problems Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ mb: 3, color: '#fff', fontWeight: 'bold' }}>
          🔥 Trending Problems
        </Typography>
        <Grid container spacing={2}>
          {trendingProblems.map((problem, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ 
                bgcolor: 'rgba(255,255,255,0.05)',
                p: 2,
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  bgcolor: 'rgba(255,255,255,0.08)'
                }
              }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography sx={{ color: '#fff' }}>{problem.title}</Typography>
                  <Chip 
                    label={problem.difficulty}
                    size="small"
                    sx={{ 
                      bgcolor: `${getDifficultyColor(problem.difficulty)}20`,
                      color: getDifficultyColor(problem.difficulty),
                      borderRadius: 1
                    }}
                  />
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Main Features Grid */}
      <Grid container spacing={4}>
        {[
          {
            icon: Search,
            title: "Smart Problem Search",
            description: "Find the perfect practice problems using our advanced filters",
            features: [
              "Search by difficulty level",
              "Filter by problem tags",
              "Sort by completion rate",
              "Company-wise problems"
            ],
            action: "Browse Problems"
          },
          {
            icon: Code2,
            title: "Code Review System",
            description: "Get detailed feedback on your solutions",
            features: [
              "Submit your code for review",
              "Receive optimization suggestions",
              "Learn best practices",
              "Multiple language support"
            ],
            action: "Submit Code"
          },
          {
            icon: MessageCircle,
            title: "Discussion Forum",
            description: "Engage with the community",
            features: [
              "Discuss different approaches",
              "Share your solutions",
              "Learn from others",
              "Get help when stuck"
            ],
            action: "Join Discussion"
          },
          {
            icon: CheckCircle,
            title: "Progress Tracking",
            description: "Monitor your improvement",
            features: [
              "Track solved problems",
              "View completion statistics",
              "Monitor your progress",
              "Earn achievements"
            ],
            action: "View Progress"
          }
        ].map((feature, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card sx={{ 
              bgcolor: 'rgba(255,255,255,0.05)',
              p: 4,
              height: '100%',
              border: '1px solid rgba(255,255,255,0.1)',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
              '&:hover': {
                transform: 'translateY(-5px)',
                bgcolor: 'rgba(255,255,255,0.08)',
                '& .hover-gradient': {
                  opacity: 1
                }
              }
            }}>
              {/* Hover Gradient Effect */}
              <Box
                className="hover-gradient"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(45deg, rgba(255,161,22,0.1) 0%, rgba(255,107,107,0.1) 100%)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease'
                }}
              />
              
              <Stack spacing={3}>
                <feature.icon size={32} color="#FFA116" />
                <Typography variant="h5" sx={{ color: '#fff', fontWeight: 'bold' }}>
                  {feature.title}
                </Typography>
                <Typography sx={{ color: '#999' }}>
                  {feature.description}
                </Typography>
                <Collapse in={expandedCard === index}>
                  <Stack spacing={1} sx={{ mt: 2 }}>
                    {feature.features.map((item, i) => (
                      <Typography key={i} sx={{ color: '#ccc' }}>• {item}</Typography>
                    ))}
                  </Stack>
                </Collapse>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Button 
                    variant="outlined"
                    sx={{ 
                      color: '#FFA116',
                      borderColor: '#FFA116',
                      '&:hover': {
                        bgcolor: 'rgba(255,161,22,0.1)',
                        borderColor: '#FFA116'
                      }
                    }}
                  >
                    {feature.action}
                  </Button>
                  <IconButton 
                    onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                    sx={{ color: '#FFA116' }}
                  >
                    {expandedCard === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </IconButton>
                </Stack>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Call to Action */}
      <Box sx={{ 
        textAlign: 'center', 
        mt: 8,
        p: 6,
        bgcolor: 'rgba(255,161,22,0.1)',
        borderRadius: 2,
        border: '1px solid rgba(255,161,22,0.2)'
      }}>
        <Typography variant="h4" sx={{ 
          fontWeight: 'bold',
          color: '#FFA116',
          mb: 2
        }}>
          Ready to Begin Your Journey?
        </Typography>
        <Typography sx={{ color: '#ccc', mb: 4 }}>
          Start solving problems and improving your coding skills today
        </Typography>
        <Button 
          variant="contained"
          size="large"
          sx={{ 
            bgcolor: '#FFA116',
            '&:hover': { bgcolor: '#ff8c00' },
            px: 6,
            py: 1.5,
            borderRadius: 2
          }}
        >
          Get Started Now
        </Button>
      </Box>
    </Box>
  );
};

export default ExplorePage;