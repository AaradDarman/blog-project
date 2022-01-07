import React from "react";

import styled from "styled-components";
import { InputGroup, Button } from "@blueprintjs/core";
import { darken } from "polished";

import BannerInput from "./BannerInput";
import RichTextEditor from "./RichTextEditor";
import { useCreatePost } from "../../context/post-context";

const Wraper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .cp-container {
    background-color: ${({ theme }) => theme.primary};
  }
  .post-title-container,
  .post-subtitle-container {
    padding: 0.7rem 1rem;
  }
  .publish-btn {
    background-color: ${({ theme }) => theme.button};
    color: #d2c8d0;
  }
  .publish-btn:hover {
    background-color: ${({ theme }) => darken(0.2, theme.button)};
  }
  .preview-btn {
    background-color: ${({ theme }) => theme.primary};
    border: 1px solid ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.secondary};
  }
  .preview-btn:hover {
    background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.primary};
  }
  .publish-btn,
  .preview-btn {
    background-image: none;
    transition: all 0.3s ease-in-out;
  }
`;

const CreatePost = () => {
  const { handleCreatePost, setPostTitle, setPostSubtitle } = useCreatePost();

  return (
    <Wraper>
      <div className="row w-100 justify-content-center align-items-center my-1">
        <div className="col-9 cp-container">
          <div className="post-title-container rtl">
            <h3>عنوان پست</h3>
            <InputGroup
              type="text"
              placeholder="عنوان"
              onChange={(e) => setPostTitle(e.target.value)}
            />
          </div>
          <div className="post-subtitle-container rtl">
            <h3>عنوان فرعی پست</h3>
            <InputGroup
              type="text"
              placeholder="عنوان فرعی"
              onChange={(e) => setPostSubtitle(e.target.value)}
            />
          </div>
          <BannerInput />
          <RichTextEditor />
          <div className="actions-btn rtl p-3">
            <Button className="publish-btn mr-1" onClick={handleCreatePost}>
              پابلیش
            </Button>
            <Button className="preview-btn ml-1">پیش نمایش</Button>
          </div>
        </div>
      </div>
    </Wraper>
  );
};

export default CreatePost;
