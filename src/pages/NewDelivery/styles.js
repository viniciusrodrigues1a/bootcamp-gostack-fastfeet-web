import styled from 'styled-components';

import FormPage from '~/components/FormPage';

export const Form = styled(FormPage.Form)`
  > div {
    display: flex;
    justify-content: space-between;

    > div {
      width: 46%;

      > div {
        margin: 0.6rem 0;
      }
    }
  }

  span {
    color: #444;
    font-weight: bold;
  }
`;
