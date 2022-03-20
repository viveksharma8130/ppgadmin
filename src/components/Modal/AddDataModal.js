import React from "react";
import { Modal } from "antd";

const AddDataModal = ({
  children,
  show,
  hide,
  title,
  afterclose,
  width,
  center,
}) => {
  const handleCancel = () => {
    hide(!show);
  };

  return (
    <>
      <Modal
        title={title}
        visible={show}
        destroyOnClose
        onCancel={handleCancel}
        footer={null}
        width={width ? width : "600px"}
        afterClose={afterclose}
        centered={center && center}
      >
        {children}
      </Modal>
    </>
  );
};
export default AddDataModal;
