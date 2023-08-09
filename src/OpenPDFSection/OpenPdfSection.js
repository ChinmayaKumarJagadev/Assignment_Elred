import React, { useState, useEffect } from "react";

const OpenPDF = () => {
  const [pdfDataUrl, setPdfDataUrl] = useState(null);
  const [editedData, setEditedData] = useState();

  const fetchBlob = async () => {
    try {
      const response = await fetch(editedData?.pdfFile);

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const blob = await response.blob();
      const dataUrl = URL.createObjectURL(blob);
      console.log("Data URL:", dataUrl);
      setPdfDataUrl(dataUrl);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchBlob();
    const editedData = JSON.parse(localStorage.getItem("EditData"));
    console.log(editedData);
    setEditedData(editedData);
  }, []);

  return (
    <div>
      <>
        <iframe
          title="Resume PDF"
          src={pdfDataUrl}
          width="100%"
          height="500px"
          frameBorder="0"
        />
      </>
    </div>
  );
};
export default OpenPDF;
