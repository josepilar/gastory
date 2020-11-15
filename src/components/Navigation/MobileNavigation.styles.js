import styled from '@emotion/styled';

export const Wrapper = styled.div`
  @media only screen and (min-width: 992px) {
    display: none;
  }
  box-shadow: 0px 7px 22px 3px rgba(0,0,0,0.75);
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
  background-color: white;
  min-height: 10%;
  z-index: 3;
`;

export const NavItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-grow: 1;

  &:hover {
    background-color: #f2f2f2;
  }

  .anticon {
    font-size: 3em;
  }
`;