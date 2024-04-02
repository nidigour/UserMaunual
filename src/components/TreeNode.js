import React, { useState } from 'react';
import './TreeNode.css'

// Import FontAwesomeIcon and the desired icon (faPlay)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { faFilm } from '@fortawesome/free-solid-svg-icons';

const TreeNode = ({ node, fileType }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const googleDocsUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(node.file_url)}&embedded=true`;
   

  const handleToggle = () => {
    setIsExpanded((prevIsExpanded) => !prevIsExpanded);
  };

 
    const handlePlayButtonClick = () => {

      if(fileType == 'MNL')
      {
      // window.open(googleDocsUrl, '_blank');
      window.open(node.file_url, '_blank');
      }
      else
      {
        window.open(node.file_url, '_blank');
      }
   
  };

    

   

  return (
    <div className="tree-node">
      <div className="node-content">
        {node.ChildTaken && node.ChildTaken.length > 0 && (
          <button onClick={handleToggle}>
            {isExpanded ? '−' : '+'}
          </button>
        )}
        {node.CChildTaken && node.CChildTaken.length > 0 && (
          <button onClick={handleToggle}>
            {isExpanded ? '−' : '+'}
          </button>
        )}
        <span>{node.topic_name}</span>
        {node.file_url && (
          <div onClick={handlePlayButtonClick} className="play-icon" style={{ marginLeft: '10px' }}>
            {fileType === 'MNL' ? (
              <FontAwesomeIcon icon={faFilePdf} />
            ) : (
              <FontAwesomeIcon icon={faFilm} />
            )}
          </div>
        )}
      </div>
      {isExpanded && node.ChildTaken && node.ChildTaken.length > 0 && (
        <div className="child-taken">
          {node.ChildTaken.map((child) => (
            <TreeNode key={child.usr_train_dtl_seq} node={child} fileType={fileType} />
          ))}
        </div>
      )}
      {isExpanded && node.CChildTaken && node.CChildTaken.length > 0 && (
        <div className="cchild-taken">
          {node.CChildTaken.map((cChild) => (
            <TreeNode key={cChild.usr_train_dtl_seq} node={cChild} fileType={fileType} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
