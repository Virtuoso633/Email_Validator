// // frontend/src/features/emailVerification/components/FileUpload.jsx

// import { useState, useCallback } from 'react';
// import { 
//   Button, 
//   CircularProgress, 
//   Box, 
//   LinearProgress,
//   Typography,
//   Alert,
//   Card,
//   CardContent
// } from '@mui/material';
// import validationService from '../services/validationService';
// import ResultsDisplay from './ResultsDisplay';

// function FileUpload() {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [results, setResults] = useState(null);
//   const [error, setError] = useState(null);
//   const [progress, setProgress] = useState(0);
//   const [processingStats, setProcessingStats] = useState(null);

//   const handleProgress = useCallback((progressData) => {
//     if (progressData.complete) {
//       setResults(progressData.results);
//       setLoading(false);
//       setProgress(100);
//     } else {
//       setProgress(parseFloat(progressData.progress));
//       setProcessingStats({
//         processed: progressData.processed,
//         total: progressData.total
//       });
//     }
//   }, []);

//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     if (selectedFile && (selectedFile.type === 'text/csv' || selectedFile.type === 'text/plain')) {
//       setFile(selectedFile);
//       setError(null);
//       setResults(null);
//       setProgress(0);
//       setProcessingStats(null);
//     } else {
//       setError('Please select a valid CSV or TXT file');
//     }
//   };

//   const processEmails = async (text) => {
//     const emails = text.split(/[\n,]/)
//       .map(email => email.trim())
//       .filter(Boolean);

//     try {
//       await validationService.validateEmails(emails, handleProgress);
//     } catch (error) {
//       setError(error.message);
//       setLoading(false);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) return;

//     setLoading(true);
//     setError(null);
//     setProgress(0);
    
//     const reader = new FileReader();
//     reader.onload = (e) => processEmails(e.target.result);
//     reader.onerror = () => {
//       setError('Failed to read file');
//       setLoading(false);
//     };
//     reader.readAsText(file);
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       {error && (
//         <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
//       )}
      
//       <Card sx={{ mb: 3 }}>
//         <CardContent>
//           <Box sx={{ mb: 2 }}>
//             <input
//               accept=".csv,.txt"
//               style={{ display: 'none' }}
//               id="file-upload"
//               type="file"
//               onChange={handleFileChange}
//             />
//             <label htmlFor="file-upload">
//               <Button variant="contained" component="span">
//                 Select File
//               </Button>
//             </label>
//             {file && (
//               <Button
//                 onClick={handleUpload}
//                 variant="contained"
//                 color="primary"
//                 disabled={loading}
//                 sx={{ ml: 2 }}
//               >
//                 {loading ? <CircularProgress size={24} /> : 'Validate Emails'}
//               </Button>
//             )}
//           </Box>

//           {loading && (
//             <Box sx={{ width: '100%' }}>
//               <LinearProgress variant="determinate" value={progress} />
//               <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//                 Processing: {processingStats?.processed || 0} / {processingStats?.total || 0} emails
//               </Typography>
//             </Box>
//           )}
//         </CardContent>
//       </Card>

//       {results && <ValidationStats results={results} />}
//       {results && <ResultsDisplay results={results} />}
//     </Box>
//   );
// }

// export default FileUpload;



// //code2
// // frontend/src/features/emailVerification/components/FileUpload.jsx
// import { useState } from 'react';
// import { 
//   Button, 
//   Box, 
//   CircularProgress, 
//   Alert,
//   Typography,
//   Paper 
// } from '@mui/material';
// import ResultsDisplay from './ResultsDisplay';

// function FileUpload() {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [results, setResults] = useState(null);

//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     if (selectedFile && (selectedFile.type === 'text/csv' || selectedFile.type === 'text/plain')) {
//       setFile(selectedFile);
//       setError(null);
//       setResults(null);
//     } else {
//       setError('Please select a valid CSV or TXT file');
//       setFile(null);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) return;

//     setLoading(true);
//     setError(null);

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await fetch('http://localhost:5000/api/validate', {
//         method: 'POST',
//         body: formData
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Upload failed');
//       }

//       const data = await response.json();
//       if (data.success) {
//         setResults(data.results);
//       } else {
//         throw new Error(data.error);
//       }
//     } catch (err) {
//       setError(err.message);
//       setResults(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
//         {error && (
//           <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
//         )}

//         <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
//           <input
//             accept=".csv,.txt"
//             style={{ display: 'none' }}
//             id="file-upload"
//             type="file"
//             onChange={handleFileChange}
//           />
//           <label htmlFor="file-upload">
//             <Button variant="contained" component="span">
//               Select File
//             </Button>
//           </label>
          
//           {file && (
//             <Typography variant="body2">
//               Selected file: {file.name}
//             </Typography>
//           )}

//           {file && (
//             <Button
//               onClick={handleUpload}
//               variant="contained"
//               color="primary"
//               disabled={loading}
//             >
//               {loading ? (
//                 <>
//                   <CircularProgress size={24} sx={{ mr: 1 }} />
//                   Processing...
//                 </>
//               ) : (
//                 'Upload and Validate'
//               )}
//             </Button>
//           )}
//         </Box>
//       </Paper>

//       {results && <ResultsDisplay results={results} />}
//     </Box>
//   );
// }

// export default FileUpload;




// // code3
// import { useState } from 'react';
// import { 
//   Button, 
//   Box, 
//   CircularProgress, 
//   Alert,
//   Typography,
//   Paper 
// } from '@mui/material';
// import ResultsDisplay from './ResultsDisplay';

// function FileUpload() {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [results, setResults] = useState(null);

//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     if (selectedFile && (selectedFile.type === 'text/csv' || selectedFile.type === 'text/plain')) {
//       setFile(selectedFile);
//       setError(null);
//       setResults(null);
//     } else {
//       setError('Please select a valid CSV or TXT file');
//       setFile(null);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) return;

//     setLoading(true);
//     setError(null);

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await fetch('http://localhost:5000/api/validate', {
//         method: 'POST',
//         body: formData
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Upload failed');
//       }

//       const data = await response.json();
//       if (data.success) {
//         setResults(data.results);
//       } else {
//         throw new Error(data.error);
//       }
//     } catch (err) {
//       setError(err.message);
//       setResults(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDownload = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/download');
//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = 'valid_emails.csv';
//       document.body.appendChild(a);
//       a.click();
//       window.URL.revokeObjectURL(url);
//       document.body.removeChild(a);
//     } catch (error) {
//       setError('Failed to download valid emails');
//     }
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
//         {error && (
//           <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
//         )}

//         <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
//           <input
//             accept=".csv,.txt"
//             style={{ display: 'none' }}
//             id="file-upload"
//             type="file"
//             onChange={handleFileChange}
//           />
//           <label htmlFor="file-upload">
//             <Button variant="contained" component="span">
//               Select File
//             </Button>
//           </label>
          
//           {file && (
//             <Typography variant="body2">
//               Selected file: {file.name}
//             </Typography>
//           )}

//           {file && (
//             <Button
//               onClick={handleUpload}
//               variant="contained"
//               color="primary"
//               disabled={loading}
//             >
//               {loading ? (
//                 <>
//                   <CircularProgress size={24} sx={{ mr: 1 }} />
//                   Processing...
//                 </>
//               ) : (
//                 'Upload and Validate'
//               )}
//             </Button>
//           )}

//           {results && results.some(r => r.isValid) && (
//             <Button
//               variant="contained"
//               color="success"
//               onClick={handleDownload}
//             >
//               Download Valid Emails
//             </Button>
//           )}
//         </Box>
//       </Paper>

//       {results && <ResultsDisplay results={results} />}
//     </Box>
//   );
// }

// export default FileUpload;



// code4
import { useState } from 'react';
import ResultsDisplay from './ResultsDisplay';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && (selectedFile.type === 'text/csv' || selectedFile.type === 'text/plain')) {
      setFile(selectedFile);
      setError(null);
      setResults(null);
    } else {
      setError('Please select a valid CSV or TXT file');
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/api/validate', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const data = await response.json();
      setResults(data.results);
    } catch (err) {
      setError(err.message);
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/download');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'valid_emails.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      setError('Failed to download valid emails');
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {error && (
        <div className="w-full p-4 bg-red-500 bg-opacity-10 border border-red-500 rounded text-red-500">
          {error}
        </div>
      )}

      <label className="block">
        <span className="sr-only">Choose File</span>
        <input 
          type="file"
          accept=".csv,.txt"
          className="block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100"
          onChange={handleFileChange}
        />
      </label>

      {file && (
        <p className="text-sm text-gray-300">Selected file: {file.name}</p>
      )}

      <button
        onClick={handleUpload}
        disabled={loading}
        className={`${
          loading 
            ? 'bg-blue-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-700'
        } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
      >
        {loading ? 'Processing...' : 'Upload and Validate'}
      </button>

      {results && results.some(r => r.isValid) && (
        <button
          onClick={handleDownload}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Download Valid Emails
        </button>
      )}

      {results && <ResultsDisplay results={results} />}
    </div>
  );
}

export default FileUpload;
