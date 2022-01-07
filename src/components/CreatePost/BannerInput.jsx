import React, { useEffect } from "react";
import styled from "styled-components";
import { useCreatePost } from "../../context/post-context";

const Wraper = styled.div`
  background-color: ${({ theme }) => theme.primary};
  padding: 1rem;
  .banner-upload-wraper {
    width: 100%;
    background: inherit;
    color: inherit;
    cursor: pointer;
    display: flex;
    border: 1px solid ${({ theme }) => theme.secondary};
    font-size: 15px;
    align-items: center;
    justify-content: center;
    outline: 2px dashed gray;
    outline-offset: -10px;
    margin: 10px 0;
    padding: 9px 0;
  }
  .banner-upload-label {
    cursor: pointer;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
  }
  .banner-upload-input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
  .banner-preview {
    width: 100%;
    max-height: 60vh;
  }
`;

const BannerInput = () => {
  const { bannerImage, setBannerImage } = useCreatePost();

  const handleImageUpload = (event) => {
    if (event.target.files[0]) {
      setBannerImage(event.target.files[0]);
    }
  };

  return (
    <Wraper className="rtl">
      <h3>تصویر بنر پست</h3>
      <form enctype="multipart/form-data">
        <div className="banner-upload-wraper">
          <label for="post-banner" className="banner-upload-label">
            {bannerImage ? (
              <img
                src={URL.createObjectURL(bannerImage)}
                alt="banner"
                className="banner-preview"
              />
            ) : (
              "Drop the file or click to upload"
            )}
          </label>
        </div>
        <input
          type="file"
          id="post-banner"
          accept=".png, .jpg, .jpeg"
          name="postBanner"
          aria-describedby="postBanner"
          accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
          className="banner-upload-input"
          onChange={handleImageUpload}
        />
      </form>
    </Wraper>
  );
};

export default BannerInput;
