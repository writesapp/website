import styled from "styled-components";

const PageContent = styled.div`
  background: #fff;
  padding: 24px;
  min-height: 280px;
  overflow: auto;

  @media (max-width: 800px) {
    padding: 0;
  }
`;

export default PageContent;
