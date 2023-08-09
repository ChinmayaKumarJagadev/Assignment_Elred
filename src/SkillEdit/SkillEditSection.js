import React, { useEffect, useState } from "react";
import LeftIcon from "../assets/images/left-arrow.png";
import DeleteIcon from "../assets/images/remove.png";
import "./SkillEdit.css";
import axios from "axios";
import Select from "react-select";

const fetchData = (url, setData, category) => {
  axios
    .get(url)
    .then((res) => {
      setData(res.data.result[0][category]);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};


const SkillEditSection = () => {
  const aboutMe =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.";

  const [about, setAbout] = useState(aboutMe);
  const [showDetails, setShowSetails] = useState(false);
  const [skill, setSkill] = useState([]);
  const [addNewSkill, setAddNewSkill] = useState("");

  const [hobby, setHobby] = useState([]);
  const [addNewHobby, setAddNewHobby] = useState("");

  const [subject, setSubject] = useState([]);
  const [addNewSubject, setAddNewSubject] = useState("");
  const [editedSkill, setEditedSkill] = useState();

  useEffect(() => {
    fetchData(
      "https://newpublicbucket.s3.us-east-2.amazonaws.com/reactLiveAssignment/JsonFiles/GetProfessionalSkillsResponse.json",
      setSkill, 
      "skills"
    );
    fetchData(
      "https://newpublicbucket.s3.us-east-2.amazonaws.com/reactLiveAssignment/JsonFiles/GetHobbiesResponse.json",
      setHobby,
      'hobbies'
    );
    fetchData(
      "https://newpublicbucket.s3.us-east-2.amazonaws.com/reactLiveAssignment/JsonFiles/GetSubjectsResponse.json",
      setSubject,
      'subjects'
    );

    const editedSkills = JSON.parse(localStorage.getItem("AllSkill"));
    setEditedSkill(editedSkills)
  }, []);

  const handleEditBio = () => {
    window.location.href = "editBio";
  };

  const BackArrow = () => {
    window.location.href = "/";
  };

  const handleSkillChange = (selectedOptions) => {
    if (editedSkill) {
      setEditedSkill({
        ...editedSkill,
        skill: selectedOptions,
      });
    } else {
      setAddNewSkill(selectedOptions);
    }
  };

  const handleHobbyChange = (selectedOptions) => {
    if (editedSkill) {
      setEditedSkill({
        ...editedSkill,
        hobby: selectedOptions,
      });
    } else {
      setAddNewHobby(selectedOptions);
    }
  };

  const handleSubjectChange = (selectedOptions) => {
    if (editedSkill) {
      setEditedSkill({
        ...editedSkill,
        subject: selectedOptions,
      });
    } else {
      setAddNewSubject(selectedOptions);
    }
  };


  const handelSaveData = () => {
    const data = {
      skill: addNewSkill,
      hobby: addNewHobby,
      subject: addNewSubject,
    };

    localStorage.setItem('AllSkill', JSON.stringify(data))
  };

  return (
    <div className="skillEdit">
      <div style={{ margin: "25px 25px" }}>
        <div style={{ marginTop: "20px", display: "flex" }}>
          <img
            src={LeftIcon}
            alt="error"
            className="leftIcon"
            onClick={BackArrow}
          />
          <p>
            <b>Skills</b>
          </p>
        </div>

        <div>
          <p>I am Increadible at these skills/professionally great at</p>
          <Select
            options={skill?.map((i) => ({ value: i.value, label: i.value }))}
            value={editedSkill?.skill || addNewSkill}
            onChange={handleSkillChange}
            isMulti
          />
        </div>

        <div style={{ marginTop: "50px", display: "flex" }}>
          <p>
            <b>Hobbies</b>
          </p>
        </div>

        <Select
          options={hobby?.map((i) => ({ value: i.value, label: i.value }))}
          value={editedSkill?.hobby || addNewHobby}
          onChange={handleHobbyChange}
          isMulti
          
        />

        <div style={{ marginTop: "30px", display: "flex" }}>
          <p>
            <b>My Favoriute Subjects are</b>
          </p>
        </div>

        <div>
          <Select
            options={subject?.map((i) => ({ value: i.value, label: i.value }))}
            value={editedSkill?.subject || addNewSubject}
            onChange={handleSubjectChange}
            isMulti
          />
        </div>

        <button onClick={handelSaveData} className="saveSkill">
          Save
        </button>
      </div>
    </div>
  );
};
export default SkillEditSection;
