import React, { useState, useEffect } from "react";
import LeftIcon from "../assets/images/left-arrow.png";
import DeleteIcon from "../assets/images/delete.png";
import "./EditMyBio.css";

const EditMyBio = () => {
  const aboutMe =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.";

  const [about, setAbout] = useState(aboutMe);
  const [bloodGroup, setBloodGroup] = useState("A+");
  const [openAlert, setOpenAlert] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [editedData, setEditedData] = useState();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleShowConfirmationModal = () => {
    setShowConfirmationModal(true);
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  useEffect(() => {
    const editedData = JSON.parse(localStorage.getItem("EditData"));
    console.log(editedData);
    setEditedData(editedData);
  }, []);

  const handleChangeValue = (e) => {
    setAbout(e.target.value);
  };

  const handleChangeGroup = (e) => {
    console.log(e.target.value);
    setBloodGroup(e.target.value);
  };

  const backToBIo = () => {
    window.location.href = "/";
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      console.log(file, URL.createObjectURL(file));
      setPdfFile(URL.createObjectURL(file));
    } else {
      setPdfFile(null);
    }
  };

  const handleDeleteFile = () => {
    setPdfFile(null);
    handleCloseConfirmationModal()
  };

  const SaveData = () => {
    const data = {
      bloodGroup: bloodGroup,
      about: about,
      pdfFile: pdfFile,
    };

    console.log(data);

    localStorage.setItem("EditData", JSON.stringify(data));
  };

  return (
    <div className="bioScreen">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100vh",
          margin: "0 15px 0 15px",
        }}
      >
        <div className="topsection">
          <p>My Bio</p>
          <img
            src={LeftIcon}
            alt="error"
            className="leftIcon"
            onClick={backToBIo}
          />
        </div>

        <div className="aboutSection">
          <p>Write Something about yourself ?</p>
        </div>

        <div>
          <textarea
            type="text"
            value={editedData?.about || about}
            className="inputTextEdit"
            onChange={handleChangeValue}
          />
        </div>

        <div className="resumeSectionEdit">
          <div
            style={{
              margin: "0 auto",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {!pdfFile ? (
              <>
                <span>Upload Image</span>

                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                />
              </>
            ) : null}
          </div>

          {pdfFile && (
            <>
              <div>
                <iframe
                  title="PDF Preview"
                  src={pdfFile}
                  width="100%"
                  height="200px"
                />
              </div>
              <img
                src={DeleteIcon}
                alt="err"
                style={{ height: "30px" }}
                onClick={handleShowConfirmationModal}
                className="deleteIcon"
              />
            </>
          )}
        </div>

        <div className="bloodGroup">
          <p>
            <b>Blood Group</b>
          </p>

          <select
            className="option"
            value={editedData?.bloodGroup || bloodGroup}
            onChange={handleChangeGroup}
          >
            <option value="">Select blood group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB">AB</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        <button
          type="submit"
          onClick={SaveData}
          style={{
            marginTop: "60px",
            height: "50px",
            borderRadius: "6px",
            background: "lightcoral",
          }}
        >
          Save
        </button>
      </div>

      {showConfirmationModal && (
  <div className="confirmation-modal">
    <div className="confirmation-text">
      Do you really want to delete this file?
    </div>
    <div className="button-container">
      <button
        className="cancel-button"
        onClick={handleCloseConfirmationModal}
      >
        Cancel
      </button>
      <button
        className="confirmation-button"
        onClick={() => {
          handleDeleteFile();
        }}
      >
        Delete
      </button>
    </div>
  </div>
)}

    </div>
  );
};
export default EditMyBio;
