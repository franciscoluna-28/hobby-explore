/* "use client"








import React, { useState } from "react";
import EasyCrop from "@/components/user/Profile";

function App() {
  const [image, setImage] = useState<any>(null);

  const handleImageUpload = async (e: any) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="App">
      <header className="App-header">
        <label className="_coverImage-holder">
          Upload Image
          <input
            type="file"
            name="cover"
            onChange={handleImageUpload}
            accept="img/*"
            style={{ display: "none" }}
          />
        </label>
        <EasyCrop image={image}  />
      </header>
    </div>
  );
}

export default App; */

// Use client

function App () {
  return (
    <h1>Hi</h1>
  )
}