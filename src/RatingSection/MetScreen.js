import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CloseIcon from '../assets/images/close.png';

const MetScreen = ({ metScreen, onCloseMet }) => {
  const [metData, setMetData] = useState([]);

  useEffect(() => {
    axios
      .get('https://newpublicbucket.s3.us-east-2.amazonaws.com/reactLiveAssignment/JsonFiles/RatingsVirtuallyMetResponse.json')
      .then((res) => {
        console.log(res);
        setMetData(res.data.result);
      });
  }, []);

  return (
    <>
      {metScreen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000, 
          }}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '10px',
              padding: '15px',
              width: '35%',
              maxHeight: '80%', 
              overflowY: 'auto', 
            }}
          >
            <div style={{ display: 'flex' }}>
              <span style={{ margin: '10px 0 25px 0' }}>
                {metData.length} Have met in real life/video call
              </span>
              <img
                src={CloseIcon}
                alt="error"
                width={'20px'}
                height={'20px'}
                style={{ margin: '10px 0px 0 auto', cursor: 'pointer' }}
                onClick={onCloseMet}
              />
            </div>

            {metData.map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  borderBottom: '1px solid darkgray',
                  marginBottom: '40px',
                }}
              >
                <img
                  src={item.dpURL}
                  alt="error"
                  width={'50px'}
                  height={'50px'}
                  style={{ borderRadius: '50%', objectFit: 'cover' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', margin: '0 0 50px 50px' }}>
                  <span>
                    {item?.firstname} {item?.lastname}
                  </span>
                  <span>{item?.title[0]?.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MetScreen;
