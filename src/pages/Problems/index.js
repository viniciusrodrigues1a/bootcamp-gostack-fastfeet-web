import React, { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';

import { GoEye, GoTrashcan } from 'react-icons/go';

import api from '~/services/api';

import { ModalContent } from './styles';
import Container from '~/components/Container';
import ActionButtons from '~/components/ActionButtons';
import Table from '~/components/Table';
import MoreOptions from '~/components/MoreOptions';
import Modal from '~/components/Modal';
import PaginationButtons from '~/components/PaginationButtons';

export default function Problems() {
  const [problems, setProblems] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [currentProblem, setCurrentProblem] = useState({});
  const [totalProblems, setTotalProblems] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      const response = await api.get('/problems');

      setTotalProblems(response.data.total);
      setProblems(response.data.deliveryProblems);
    })();
  }, []);

  function handleClickView(problem) {
    setCurrentProblem(problem);
    setModalShow(!modalShow);
  }

  async function handleClickDelete(problemId) {
    const confirmation = window.confirm(
      `Cancelar encomenda do problema #${problemId}?`,
    );

    if (confirmation) {
      try {
        const problemResponse = await api.get(`/problems/${problemId}`);

        const deliveryId = problemResponse.data.delivery.id;

        await api.delete(`/problems/${deliveryId}/cancel-delivery`);

        await api.delete(`/problems/${problemId}`);

        setProblems(problems.filter(d => d.id !== problemId));

        toast.success('Encomenda cancelada com sucesso!', {
          className: 'toast-custom-background',
        });
      } catch (err) {
        toast.error('Erro ao cancelar encomenda.', {
          className: 'toast-custom-background toast-custom-background-error',
        });
      }
    }
  }

  const cantGoToNextPage = useMemo(() => page * 10 >= totalProblems, [
    page,
    totalProblems,
  ]);

  const cantGoToPrevPage = useMemo(() => page === 1, [page]);

  function nextPage() {
    if (cantGoToNextPage) return;

    setPage(page + 1);
  }

  function prevPage() {
    if (cantGoToPrevPage) return;

    setPage(page - 1);
  }

  return (
    <>
      <Container>
        <ActionButtons.Container>
          <ActionButtons.Title>Problemas na entrega</ActionButtons.Title>
        </ActionButtons.Container>

        <Table>
          <thead>
            <tr>
              <th>Encomenda</th>
              <th>Problema</th>
              <th style={{ textAlign: 'end' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {problems.map(problem => (
              <React.Fragment key={problem.id}>
                <tr>
                  <td>#{problem.id}</td>
                  <td>{problem.description}</td>
                  <td style={{ textAlign: 'end' }}>
                    <MoreOptions.Container align="end">
                      <MoreOptions.Button
                        onClick={() => handleClickView(problem)}
                      >
                        <GoEye color="#8E5BE8" size={18} /> Visualizar
                      </MoreOptions.Button>
                      <MoreOptions.Button
                        onClick={() => handleClickDelete(problem.id)}
                      >
                        <GoTrashcan color="#DE3B3B" size={18} /> Cancelar
                        encomenda
                      </MoreOptions.Button>
                    </MoreOptions.Container>
                  </td>
                </tr>
                <br />
              </React.Fragment>
            ))}
          </tbody>
        </Table>

        <PaginationButtons
          nextFunc={nextPage}
          prevFunc={prevPage}
          cantGoBack={cantGoToPrevPage}
          cantGoForward={cantGoToNextPage}
        />
      </Container>
      <Modal show={modalShow} setShow={setModalShow}>
        <ModalContent>
          <p>Visualizar problema</p>
          <span>{currentProblem.description}</span>
        </ModalContent>
      </Modal>
    </>
  );
}
