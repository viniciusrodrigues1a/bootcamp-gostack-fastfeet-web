import React from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiCheck } from 'react-icons/fi';

import { ContainerWrapper, TitleWrapper, FormWrapper } from './styles';

function Container(props) {
  const { children } = props;
  return (
    <ContainerWrapper {...props}>
      <main>{children}</main>
    </ContainerWrapper>
  );
}

function Title(props) {
  const { message, goBackLink, handleConfirm } = props;

  return (
    <TitleWrapper {...props}>
      <h1>{message}</h1>

      <div>
        <Link to={goBackLink}>
          <button type="button">
            <span>
              <FiChevronLeft size={26} color="#fff" /> Voltar
            </span>
          </button>
        </Link>
        <button type="button" onClick={handleConfirm}>
          <span>
            <FiCheck size={26} color="#fff" /> Salvar
          </span>
        </button>
      </div>
    </TitleWrapper>
  );
}

function Form(props) {
  const { children } = props;

  return <FormWrapper {...props}>{children}</FormWrapper>;
}

const FormPage = {
  Container,
  Title,
  Form,
};

export default FormPage;
