// ButtonView.js

import React, { } from 'react';
import './ButtonView.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import choice from '../Assets/choice.svg';

const ButtonView = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const loginResult = location.state && location.state.loginResult;
  const navigate = useNavigate();
  let deg = loginResult.sf_desg_cd;
  let sal_fun = loginResult.sales_function;


  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleButtonClick = (type, deg1, sal_fun) => {

    // Navigate to the TreeView page and pass data through state
    navigate('/TreeView', { state: { fileType: type, designation: deg1, sales_function: sal_fun } });
  };

  return (
    <div className="Blue_panel">
      <div className="Plane3">
        <div className="panel4 left-panel1">
          <div className="Plane5">
            <div className="logout-icon" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </div>
            <div>
              {loginResult && (
                <div>
                  <div id='name'>Welcome {loginResult.sf_short_name}</div>
                </div>
              )}
            </div>
            <h3>Please Select Option</h3>
          </div>
          <img src={choice} className="btn_img" alt="" />
        </div>
      </div>

      <div className="Plane2">
        <div className="Plane1">
          <div className="btn_title" onClick={() => handleButtonClick('MNL', deg, sal_fun)}>User Manual PDF</div>
          <div className="btn_title" onClick={() => handleButtonClick('VDO', deg, sal_fun)}>User Manual Video</div>
        </div>
      </div>
    </div>



    // <div>
    //   <div className="logout-icon" onClick={handleLogout}>
    //     <FontAwesomeIcon icon={faSignOutAlt} />
    //   </div>

    //   <div id="holder">
    //     <div>
    //       {loginResult && (
    //         <div>
    //           <div id='name'>Welcome {loginResult.sf_short_name}</div>
    //         </div>
    //       )}
    //     </div>

    //     <div className="button-container">
    //       <button onClick={() => handleButtonClick('MNL',deg)}>Open MNL</button>
    //       <button onClick={() => handleButtonClick('VDO',deg)}>Open VDO</button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default ButtonView;
