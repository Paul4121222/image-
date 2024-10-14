import styled from "styled-components";

const Toolbar = styled(({ left, right, className }) => {
  return (
    <div className={className}>
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
})`
  height: 50px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default Toolbar;
