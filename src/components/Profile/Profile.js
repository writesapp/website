import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Typography } from "antd";

import { UserContext } from "../../providers/UserProvider";
import { db } from "../../firebase";
import WritesTable from "../WritesTable/WritesTable";
import { useMountEffect } from "../../hooks/useMountEffect";

const { Title } = Typography;

const StyledAvatar = styled.img`
  margin: 25px auto 0px auto;
  width: 125px;
  border-radius: 50%;
  display: block;
`;

function Profile() {
  const { user } = useContext(UserContext);
  const [writes, setWrites] = useState([]);

  useMountEffect(() => {
    const writesRef = db.collection("writes").where("author", "==", user.uid);

    writesRef.onSnapshot(({ docs }) => {
      const allWrites = [];

      docs.map((obj) => allWrites.push({ ...obj.data(), id: obj.id }));

      setWrites(allWrites);
    });
  });

  return (
    <>
      <StyledAvatar src={user.photoURL} />
      <Title style={{ textAlign: "center", margin: 25 }} level={2}>
        {user.displayName}
      </Title>
      <Title level={4}>Your writes:</Title>
      <WritesTable dataSource={writes} />
    </>
  );
}

export default Profile;
