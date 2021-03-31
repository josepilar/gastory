import React from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';

const NewTripDrawer = props => {
  let width = props.width || 720;
  if (window?.screen?.availWidth < 992) {
    width = '100%';
  }

  return <Drawer
          {...props}
          width={width}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={props.onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button onClick={props.onClose} type="primary">
                Submit
              </Button>
            </div>
          }
        ></Drawer>;
};

export default NewTripDrawer;