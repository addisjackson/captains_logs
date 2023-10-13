import React, { useState } from 'react';

function ImageUpload({ handleImageUpload }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    handleImageUpload(file);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {selectedImage && <img src={selectedImage} alt="Selected" />}
    </div>
  );
}

export default ImageUpload;
