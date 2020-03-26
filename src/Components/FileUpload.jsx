import React, { useRef } from 'react';
import { useAlert } from 'react-alert';

const BYTES_PER_MB = 1_000_000;

const FileUpload = (props) => {
  
    const alert = useAlert();
    const fileInput = useRef(null);

    const initHandleFileUpload = (e) => {
      e.preventDefault();

      if (fileInput.current.files[0]) {
        const fileSize = (fileInput.current.files[0].size / BYTES_PER_MB);

        if (fileSize > 2) {
          alert.show("I'm sorry, but currently only files smaller 2MB are accepted.");
        } else {
            readFile(fileInput.current.files[0])
              .then((response) => {
                props.setUploadedFile(response.dataURL)
              });
        }
      } else {
        alert.show("Hm... looks like something went wrong while you were uploading the file. Try again?")
      }
    }

    const readFile = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        // Read the image via FileReader API and save image result in state.
        reader.onload = function (e) {
          // Add the file name to the data URL
          let dataURL = e.target.result;
          dataURL = dataURL.replace(";base64", `;name=${file.name};base64`);
          resolve({file, dataURL});
        };

        reader.readAsDataURL(file);
    });
    }

    return (
        <div className="file-upload">
          <input 
            ref={fileInput}
            id="file-upload"
            type="file"
            name="uploaded-img" 
            accept="image/*" 
            onChange={initHandleFileUpload}
            />
          <label 
            htmlFor="file-upload"
            className="upload-file-label"
            >
              Load file...
            </label>
            <p className="generator-params">[max size: 2MB]</p>
        </div>
      )
    
} // end of FileUpload fn

export default FileUpload;