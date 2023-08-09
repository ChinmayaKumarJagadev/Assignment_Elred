import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Rating.css";
import EthicalScreen from "./EthicalScreen";
import MetScreen from "./MetScreen";
import Star from '../assets/images/star.png'

const fetchData = (url, setData, category) => {
  axios
    .get(url)
    .then((res) => {
      console.log(res);
      setData(res.data.result);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

const Rating = () => {
  const [ethical, seEthical] = useState([]);
  const [met, setMet] = useState([]);
  const [ethicalScreen, setEthicalScreen] = useState(false);
  const [metScreen, setMetScreen] = useState(false);

  useEffect(() => {
    fetchData(
      "https://newpublicbucket.s3.us-east-2.amazonaws.com/reactLiveAssignment/JsonFiles/RatingsEthicalCodeResponse.json",
      seEthical,
      "ethical"
    );
    fetchData(
      "https://newpublicbucket.s3.us-east-2.amazonaws.com/reactLiveAssignment/JsonFiles/RatingsVirtuallyMetResponse.json",
      setMet,
      "met"
    );
  }, []);

  const EthicalPost = () => {
    setEthicalScreen(!ethicalScreen);
  };

  const MetPost = () => {
    setMetScreen(!metScreen);
  };

  return (
    <>
    <img src={Star} alt=" err" className="star"/>
      <div className="mainRating">
        <h2>Rating</h2>
        <div className="block1">
          <p onClick={EthicalPost} style={{ cursor: "pointer" }}>
            {ethical?.length}
          </p>
          <p onClick={EthicalPost}>Say has ethical code of conduct and is safe to be business with</p>
        </div>

        <div className="block2">
          <p onClick={MetPost}>{met?.length}</p>
          <p onClick={MetPost}>Have met in real life/video call</p>
        </div>
      </div>

      {ethicalScreen ? (
        <EthicalScreen
          ethicalScreen={ethicalScreen}
          onClose={() => setEthicalScreen(false)}
        />
      ) : null}
      {metScreen ? <MetScreen  metScreen={metScreen}  onCloseMet={() => setMetScreen(false)}/> : null}
    </>
  );
};
export default Rating;
