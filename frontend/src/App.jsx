// // frontend/src/App.jsx

// import { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import FileUpload from './features/emailVerification/components/FileUpload';
// import './App.css';

// function App() {
//   return (
//     <Router>
//       <div className="container">
//         <Routes>
//           <Route path="/" element={
//             <div className="content">
//               <h1>Email Validator</h1>
//               <FileUpload />
//             </div>
//           } />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


// code 2
// // frontend/src/App.jsx
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import FileUpload from './features/emailVerification/components/FileUpload';
// import './App.css';

// function App() {
//   return (
//     <Router>
//       <div className="container">
//         <Routes>
//           <Route path="/" element={
//             <div className="content">
//               <h1>Email Validator</h1>
//               <FileUpload />
//             </div>
//           } />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;



// code 3
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FileUpload from './features/emailVerification/components/FileUpload';

function App() {
  return (
    <div className="container">
      <h1 className="title">Email Validator</h1>
      <div className="upload-section">
        <FileUpload />
      </div>
    </div>
  );
}

export default App;