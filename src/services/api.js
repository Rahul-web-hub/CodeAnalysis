export const submitCode = async (code) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api2/submit/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Submission failed');
  }

  return response.json(); // Assuming response includes submission_id
};
export const fetchAnalysisResults = async (submissionId) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api2/results/${submissionId}/`);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Failed to fetch analysis results');
  }

  return response.json(); // Assuming this returns the analysis results
};
