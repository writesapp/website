import React, { useContext } from "react";
import { Modal, Typography } from "antd";
import styled from "styled-components";
import { UserContext } from "../../providers/UserProvider";

const { Title } = Typography;

const StyledAvatar = styled.img`
  margin: 0 auto;
  width: 125px;
  border-radius: 50%;
  display: block;
`;

export default function UserModal({ visible, setVisible }) {
  const { user } = useContext(UserContext);

  return (
    <Modal visible={visible} title="Profile" onCancel={() => setVisible(false)} footer={null}>
      <StyledAvatar src={user.photoURL} />
      <Title style={{ textAlign: "center", margin: 25 }} level={2}>
        {user.displayName}
      </Title>
    </Modal>
  );
}
