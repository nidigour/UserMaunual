import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import TreeNode from './TreeNode'; // Import the TreeNode component
import './TreeView.css'

// Assuming the structure of your API response is an object with a property 'data'
const TreeView = () => {
    const location = useLocation();
    const { fileType, designation,sales_function } = location.state || {};
    const [apiData, setApiData] = useState(null);
    const navigate = useNavigate();
    
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          if (fileType) {
            const response = await fetch(
              `HPLSMSREP/rp-ss/UserManualPDF/DisplayPDF?desg_level=${designation}&file_type=${fileType}&sales_function=${sales_function}`
            );
  
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
  
            const data = await response.json();
            setApiData(data);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [fileType, designation]
    );
    
    
    const handleBackButtonClick = () => {
        // Use navigate to go back to the ButtonView page
        navigate(-1);
      };
  
    return (
      <div className="page-container">
        {apiData && apiData.Record && apiData.Record.length > 0 && (
          <h4 id='tv_hrad'>{apiData.Record[0].train_desc}</h4>
        )}
      <div id='BackButton'>
        <div className="back-arrow" onClick={handleBackButtonClick}>
          &#8592;
        </div>
      </div>

      {apiData && (
        <div className='treeholder'>
          {/* Map through apiData and render TreeNode components */}
          {apiData.Record.map((node) => (
            <TreeNode key={node.someUniqueIdentifier} node={node} fileType={fileType}/>
          ))}
        </div>
      )}
      {/* Add your TreeView content here */}
    </div>
    );
  };
  
  export default TreeView;
  