import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
  color: ${props => (props.active === 'true' ? '#444' : '#999')};
  text-transform: uppercase;
  font-weight: bold;
  transition: color 0.2s;

  & + & {
    margin-left: 2rem;
  }

  &:hover {
    color: ${props => (props.active === 'true' ? '#444' : '#777')};
  }
`;
