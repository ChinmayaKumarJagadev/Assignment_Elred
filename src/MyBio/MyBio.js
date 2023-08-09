import React, { useState } from "react";
import "./MyBio.css";
import LeftIcon from "../assets/images/left-arrow.png";
import EditIcon from "../assets/images/editIcon.png";
import DeleteIcon from "../assets/images/remove.png";
import { useEffect } from "react";
import axios from "axios";
import OpenPDF from "../OpenPDFSection/OpenPdfSection";
import Rating from "../RatingSection/Rating";

const MyBio = () => {
  const aboutMe =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.";

  const [about, setAbout] = useState(aboutMe);
  const [showDetails, setShowSetails] = useState(false);
  const [skill, setSkill] = useState([
    { value: "React JS", label: "React JS" },
    { value: "Javascript", label: "Javascript" },
    { value: "Coding", label: "Coding" },
    { value: "Could Computing", label: "Could Computing" },
  ]);
  const [hobby, setHobby] = useState([
    { value: "React JS", label: "React JS" },
    { value: "Javascript", label: "Javascript" },
    { value: "Coding", label: "Coding" },
    { value: "Could Computing", label: "Could Computing" },
  ]);

  const [subject, setSubject] = useState([
    { value: "React JS", label: "React JS" },
    { value: "Javascript", label: "Javascript" },
    { value: "Coding", label: "Coding" },
    { value: "Could Computing", label: "Could Computing" },
  ]);
  const [rating, setRating] = useState([]);
  const [editedData, setEditedData] = useState();
  const [editedSkills, setEditedSkills] = useState();
  const [resumeViewer, setResumeViewer] = useState(false);

  const handleEditBio = () => {
    window.location.href = "editBio";
  };

  const handleEditSkill = () => {
    window.location.href = "skillEdit";
  };

  useEffect(() => {
    const editedData = JSON.parse(localStorage.getItem("EditData"));
    const editedSkills = JSON.parse(localStorage.getItem("AllSkill"));
    console.log(editedData, editedSkills);
    setEditedData(editedData);
    setEditedSkills(editedSkills);
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://newpublicbucket.s3.us-east-2.amazonaws.com/reactLiveAssignment/JsonFiles/RatingsEthicalCodeResponse.json"
      )
      .then((res) => {
        console.log(res);
      });
  }, []);

  const [pdfDataUrl, setPdfDataUrl] = useState(null);

  const openPDF = async () => {
    setResumeViewer(true);
  };

  return (
    <div className="bioScreen">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          margin: "0 15px 200px 15px",
        }}
      >
        <div className="topsection">
          <p>My Bio</p>
          <img src={LeftIcon} alt="error" className="leftIcon" />
        </div>

        <div className="aboutSection">
          <p>
            <b>About Me</b>
          </p>
          <img
            src={EditIcon}
            alt="error"
            className="editIcon"
            onClick={handleEditBio}
          />
        </div>

        <div>
          <textarea class="inputText" value={editedData?.about || about} />
        </div>

        <div className="bloodGroup">
          <p>
            <b>Blood Group</b>
          </p>

          <select className="option" value={editedData?.bloodGroup || "A+"}>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB">AB</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        <div className="resumeSection">
          <p>
            <b>Resume</b>
          </p>

          {editedData?.pdfFile ? (
            <OpenPDF />
          ) : (
            <img src={LeftIcon} alt="error" className="rightIcon" />
          )}

          {editedData?.pdfFile ? <OpenPDF /> : null}
        </div>

        {editedData?.pdfFile !== undefined ? (
          <div>
            <div style={{ marginTop: "50px", display: "flex" }}>
              <p>
                <b>Skills</b>
              </p>
              <img
                src={EditIcon}
                alt="error"
                className="editIcon"
                onClick={handleEditSkill}
              />
            </div>

            <div>
              <p>I am Increadible at these skills/professionally great at</p>
              <p style={{ display: "flex", gap: "20px" }}>
                {(editedSkills?.skill || skill).map((i) => {
                  return (
                    <div className="itemsBio">
                      {i.value}
                      <img
                        src={DeleteIcon}
                        alt="Delete"
                        className="deleteIconSkill"
                        style={{ cursor: "pointer", marginLeft: "5px" }}
                      />
                    </div>
                  );
                })}
              </p>
            </div>

            <div style={{ marginTop: "50px", display: "flex" }}>
              <p>
                <b>Hobbies</b>
              </p>
            </div>

            <div>
              <p style={{ display: "flex", gap: "20px" }}>
                {(editedSkills?.hobby || hobby).map((i) => {
                  return (
                    <div className="itemsBio">
                      {i.value}
                      <img
                        src={DeleteIcon}
                        alt="Delete"
                        className="deleteIconSkill"
                        style={{ cursor: "pointer", marginLeft: "5px" }}
                      />
                    </div>
                  );
                })}
              </p>
            </div>

            <div style={{ marginTop: "30px", display: "flex" }}>
              <p>
                <b>My Favoriute Subjects are</b>
              </p>
            </div>

            <div>
              <p style={{ display: "flex", gap: "20px" }}>
                {(editedSkills?.subject || subject).map((i) => {
                  return (
                    <div className="itemsBio">
                      {i.value}
                      <img
                        src={DeleteIcon}
                        alt="Delete"
                        className="deleteIconSkill"
                        style={{ cursor: "pointer", marginLeft: "5px" }}
                      />
                    </div>
                  );
                })}
              </p>
            </div>
          </div>
        ) : null}

        {editedData?.pdfFile !== undefined ? (<Rating />) :null}
      </div>
    </div>
  );
};
export default MyBio;
