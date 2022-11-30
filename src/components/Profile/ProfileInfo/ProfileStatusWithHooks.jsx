import React, { useEffect } from "react";
import { useState } from "react";

const ProfileStatusWithHooks = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);
  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  };

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <div>
      {!editMode && (
        <div>
          <span onDoubleClick={activateEditMode}>{props.status || "----"}</span>
        </div>
      )}
      {editMode && (
        <div>
          <input
            onBlur={deactivateEditMode}
            autoFocus={true}
            onChange={onStatusChange}
            value={status}
          ></input>
        </div>
      )}
    </div>
  );
};
export default ProfileStatusWithHooks;
