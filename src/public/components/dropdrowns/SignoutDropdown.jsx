import React, { memo, useState, useEffect } from "react";
import { Dropdown, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import {
  logoutUser,
  userDataOnLogin,
} from "../../../lib/services/firebaseService";

const SignoutDropdown = () => {
  const [items, setItems] = useState([
    {
      key: "1",
      label: <span>-</span>,
    },
    {
      key: "2",
      label: <span onClick={logoutUser}>Logout</span>,
    },
  ]);
  useEffect(() => {
    (async () => {
      const userData = await userDataOnLogin();
      setItems([
        {
          key: "1",
          label: <span>{userData.email}</span>,
        },
        {
          key: "2",
          label: (
            <p
              onClick={logoutUser}
            >
              Logout
            </p>
          ),
        },
      ]);
    })();
  }, []);

  return (
    <div>
      <Dropdown
        menu={{
          items,
        }}
        placement="bottomLeft"
      >
        <Button style={{ display: "flex", alignItems: "center", fontSize:"1.2em" }}>
          <UserOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};

export default memo(SignoutDropdown);
