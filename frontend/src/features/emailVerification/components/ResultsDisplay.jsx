
// // frontend/src/features/emailVerification/components/ResultsDisplay.jsx
// import { useState } from 'react';
// import {
//   Box,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   Chip,
//   IconButton,
//   Collapse,
//   Typography
// } from '@mui/material';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// function Row({ row }) {
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       <TableRow>
//         <TableCell>
//           <IconButton size="small" onClick={() => setOpen(!open)}>
//             {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//           </IconButton>
//         </TableCell>
//         <TableCell>{row.email}</TableCell>
//         <TableCell align="center">
//           <Chip
//             label={row.isValid ? 'Valid' : 'Invalid'}
//             color={row.isValid ? 'success' : 'error'}
//             size="small"
//           />
//         </TableCell>
//         <TableCell>{row.reason}</TableCell>
//       </TableRow>
//       <TableRow>
//         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
//           <Collapse in={open} timeout="auto" unmountOnExit>
//             <Box sx={{ margin: 1 }}>
//               <Typography variant="h6" gutterBottom component="div">
//                 Details
//               </Typography>
//               <Table size="small">
//                 <TableBody>
//                   {Object.entries(row.details).map(([key, value]) => (
//                     <TableRow key={key}>
//                       <TableCell component="th" scope="row">
//                         {key}
//                       </TableCell>
//                       <TableCell>
//                         {JSON.stringify(value, null, 2)}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </Box>
//           </Collapse>
//         </TableCell>
//       </TableRow>
//     </>
//   );
// }

// function ResultsDisplay({ results }) {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <Box>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell />
//               <TableCell>Email</TableCell>
//               <TableCell align="center">Status</TableCell>
//               <TableCell>Reason</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {results
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((row, index) => (
//                 <Row key={index} row={row} />
//               ))}
//           </TableBody>
//         </Table>
//         <TablePagination
//           rowsPerPageOptions={[10, 25, 50, 100]}
//           component="div"
//           count={results.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </TableContainer>
//     </Box>
//   );
// }

// export default ResultsDisplay;

// frontend/src/features/emailVerification/components/ResultsDisplay.jsx
import { 
    Box, 
    Paper, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow,
    TablePagination,
    Chip,
    Typography 
  } from '@mui/material';
  import { useState } from 'react';
  
  function ResultsDisplay({ results }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const validCount = results.filter(r => r.isValid).length;
    const invalidCount = results.length - validCount;
  
    return (
      <Box>
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom align="center">
            Validation Summary
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            gap: 3, 
            mb: 2,
            justifyContent: 'center' 
          }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="subtitle2">Total Emails</Typography>
              <Typography variant="h4">{results.length}</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="subtitle2">Valid</Typography>
              <Typography variant="h4" color="success.main">{validCount}</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="subtitle2">Invalid</Typography>
              <Typography variant="h4" color="error.main">{invalidCount}</Typography>
            </Box>
          </Box>
        </Paper>
  
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell>Reason</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.email}</TableCell>
                    <TableCell align="center">
                      <Chip 
                        label={row.isValid ? 'Valid' : 'Invalid'}
                        color={row.isValid ? 'success' : 'error'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{row.reason}</TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={results.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
    );
  }
  
  export default ResultsDisplay;
  