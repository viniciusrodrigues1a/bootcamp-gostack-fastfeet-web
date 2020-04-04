import styled from 'styled-components';

export const FormWrapper = styled.form`
  width: 100%;
  background-color: #fff;
  margin-top: 1.4rem;
  border-radius: 6px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
`;

export const RowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const LabelWrapper = styled.label`
  display: block;
  font-weight: bold;
  color: #444;
  margin: 0.8rem 0 0.6rem;
`;

export const InputWrapper = styled.input`
  width: 100%;
  padding: 0.65rem 0.6rem;
  border-radius: 4px;
  border: 1px solid hsl(0, 0%, 80%);
  -moz-appearance: textfield;

  &[type='number']::-webkit-inner-spin-button,
  &[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }
`;
