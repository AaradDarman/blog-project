import React, { useState, useEffect } from "react";

import { WithContext as ReactTags } from "react-tag-input";
import { useLocation } from "react-router-dom";

const TagsInput = ({ values, onChange, tagStyle, intent }) => {
  const [tags, setTags] = useState(values);
  const location = useLocation();
  const KeyCodes = {
    enter: [10, 13],
  };

  useEffect(() => {
    if (location.pathname.includes("/edit-post")) setTags(values);
  }, [values]);

  const delimiters = [...KeyCodes.enter, KeyCodes.comma];

  const handleDelete = (i) => {
    setTags((prev) => prev.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    if (tags) {
      setTags((prev) => [...prev, tag]);
    } else {
      setTags([tag]);
    }
  };

  const handleDrag = (tag, currPos, newPos) => {
    const cloneTags = [...tags];
    const newTags = cloneTags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    setTags(newTags);
  };

  useEffect(() => {
    onChange(tags);
  }, [tags]);
  return (
    <ReactTags
      tags={tags}
      classNames={{
        tagInput: "bp3-form-group",
        tagInputField: `${intent} bp3-input`,
        tag: `${tagStyle}`,
      }}
      handleDelete={handleDelete}
      handleAddition={handleAddition}
      handleDrag={handleDrag}
      delimiters={delimiters}
      inputFieldPosition="top"
      placeholder=""
    />
  );
};
export default TagsInput;
