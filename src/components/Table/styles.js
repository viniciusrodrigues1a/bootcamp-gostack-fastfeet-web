import styled from 'styled-components';

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;

  tbody tr {
    background-color: #fff;
  }

  th {
    text-align: start;
    color: #444;
  }

  td {
    color: #666;
    position: relative;
  }

  td,
  th {
    padding: 1.25rem;
  }
`;
