import styled from "styled-components";

/* Define styled components */
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  height: 100%;
  max-width: 600px;
  margin: 0 auto;

  background: #fcf7f8;
`;

export const Header = styled.div`
  /* Flex Properties */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: sticky;

  padding: 0 20px;
  margin: 10px 0;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;

  max-height: 100%;
  overflow-y: auto; /* scrollbar */
  scrollbar-width: none; /** Firefox */

  background: var(--lightbluegray);
  padding: 0 20px;

  ::-webkit-scrollbar {
    display: none;
  }

  > Form {
    width: 50%;
    max-width: 100px;
    padding-top: 2em;
  }
`;
