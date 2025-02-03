// frontend/src/features/emailVerification/components/ValidationStats.jsx
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';

function ValidationStats({ results }) {
  const stats = {
    total: results.length,
    valid: results.filter(r => r.isValid).length,
    invalid: results.filter(r => !r.isValid).length,
    disposable: results.filter(r => r.details?.disposable?.isDisposable).length
  };

  const statCards = [
    { label: 'Total Emails', value: stats.total, color: 'primary.main' },
    { label: 'Valid', value: stats.valid, color: 'success.main' },
    { label: 'Invalid', value: stats.invalid, color: 'error.main' },
    { label: 'Disposable', value: stats.disposable, color: 'warning.main' }
  ];

  return (
    <Box sx={{ mb: 3 }}>
      <Grid container spacing={2}>
        {statCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  {stat.label}
                </Typography>
                <Typography variant="h4" component="div" sx={{ color: stat.color }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {((stat.value / stats.total) * 100).toFixed(1)}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ValidationStats;
