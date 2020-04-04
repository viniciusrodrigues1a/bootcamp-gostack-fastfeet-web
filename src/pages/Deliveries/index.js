import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

import { FiPlus } from 'react-icons/fi';
import { GoEye, GoPencil, GoTrashcan } from 'react-icons/go';

import history from '~/services/history';
import api from '~/services/api';

import {
  ActionButtonsFlexWrapper,
  DeliverymanName,
  DeliveryStatus,
  ModalContent,
  InfoContainer,
  DatesInfoContainer,
  SignatureInfoContainer,
} from './styles';
import Container from '~/components/Container';
import Modal from '~/components/Modal';
import ActionButtons from '~/components/ActionButtons';
import Table from '~/components/Table';
import MoreOptions from '~/components/MoreOptions';
import PaginationButtons from '~/components/PaginationButtons';

export default function Deliveries() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [deliveries, setDeliveries] = useState([]);
  const [totalDeliveries, setTotalDeliveries] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [currentDelivery, setCurrentDelivery] = useState({
    recipient: {},
    deliveryman: {},
    signature: {},
  });
  const [filter, setFilter] = useState('all');

  const getRandomColor = useCallback(() => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }, []);

  const getDeliveryStatus = useCallback(delivery => {
    if (delivery.canceled_at) {
      return 'Cancelada';
    }
    if (delivery.end_date) {
      return 'Entregue';
    }
    if (delivery.start_date) {
      return 'Retirada';
    }
    return 'Pendente';
  }, []);

  useEffect(() => {
    (async () => {
      const response = await api.get(
        `/deliveries?search=${search}&page=${page}`,
      );

      setTotalDeliveries(response.data.total);

      let data;

      if (filter === 'problems') {
        const problemsResponse = await api.get('/problems');

        const deliveriesIdWithProblems = problemsResponse.data.payload.map(
          p => p.delivery.id,
        );

        data = response.data.payload.filter(
          d => deliveriesIdWithProblems.indexOf(d.id) >= 0,
        );
      } else {
        data = response.data.payload;
      }

      const filteredDeliveries = data.map(delivery => {
        const [firstName, secondName] = delivery.deliveryman.name.split(' ');
        const firstLetter = firstName ? firstName[0] : '';
        const secondLetter = secondName ? secondName[0] : '';

        return {
          ...delivery,
          status: getDeliveryStatus(delivery),
          deliveryman: {
            ...delivery.deliveryman,
            twoFirstLetters: `${firstLetter}${secondLetter}`,
            twoFirstLettersColor: getRandomColor(),
          },
        };
      });

      setDeliveries(filteredDeliveries);
    })();
  }, [search, getRandomColor, getDeliveryStatus, filter, page]);

  const timeZone = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone,
    [],
  );

  const startDate = useMemo(() => {
    if (!currentDelivery.start_date) return '';

    return format(
      utcToZonedTime(currentDelivery.start_date, timeZone),
      "d'/'MM'/'y",
    );
  }, [currentDelivery, timeZone]);

  const endDate = useMemo(() => {
    if (!currentDelivery.end_date) return '';
    return format(
      utcToZonedTime(currentDelivery.end_date, timeZone),
      "d'/'MM'/'y",
    );
  }, [currentDelivery, timeZone]);

  function handleCreateNewDelivery() {
    history.push('/deliveries/new');
  }

  function handleClickView(delivery) {
    setModalShow(!modalShow);
    setCurrentDelivery(delivery);
  }

  function handleClickEdit(deliveryId) {
    history.push(`/deliveries/edit/${deliveryId}`);
  }

  async function handleClickDelete(deliveryId) {
    const confirmation = window.confirm(`Deletar entrega #${deliveryId}?`);

    if (confirmation) {
      try {
        await api.delete(`/deliveries/${deliveryId}`);

        setDeliveries(deliveries.filter(d => d.id !== deliveryId));

        toast.success('Entrega deletada com sucesso!', {
          className: 'toast-custom-background',
        });
      } catch (err) {
        toast.error('Erro ao deletar entrega.', {
          className: 'toast-custom-background toast-custom-background-error',
        });
      }
    }
  }

  const options = useMemo(
    () => [
      { value: 'all', label: 'Todas as encomendas', select: true },
      { value: 'problems', label: 'Somente encomendas com problemas' },
    ],
    [],
  );

  const cantGoToNextPage = useMemo(() => page * 10 >= totalDeliveries, [
    page,
    totalDeliveries,
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
          <ActionButtons.Title>Gerenciando encomendas</ActionButtons.Title>

          <ActionButtons.FlexContainer>
            <ActionButtons.SearchInput
              placeholder="Buscar por encomendas"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <ActionButtonsFlexWrapper>
              <div style={{ width: '15rem' }}>
                <Select
                  defaultValue={options[0]}
                  placeholder="Selecione"
                  options={options}
                  onChange={e => setFilter(e.value)}
                />
              </div>
              <ActionButtons.ConfirmButton onClick={handleCreateNewDelivery}>
                <FiPlus color="#fff" size={22} /> Cadastrar
              </ActionButtons.ConfirmButton>
            </ActionButtonsFlexWrapper>
          </ActionButtons.FlexContainer>
        </ActionButtons.Container>

        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Destinatário</th>
              <th>Entregador</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map(delivery => (
              <React.Fragment key={delivery.id}>
                <tr>
                  <td>#{delivery.id}</td>
                  <td>{delivery.recipient.name}</td>
                  <DeliverymanName
                    color={delivery.deliveryman.twoFirstLettersColor}
                  >
                    <span>{delivery.deliveryman.twoFirstLetters}</span>
                    {delivery.deliveryman.name}
                  </DeliverymanName>
                  <td>{delivery.recipient.city}</td>
                  <td>{delivery.recipient.state}</td>
                  <DeliveryStatus status={delivery.status}>
                    <span>{delivery.status}</span>
                  </DeliveryStatus>
                  <td>
                    <MoreOptions.Container>
                      <MoreOptions.Button
                        onClick={() => handleClickView(delivery)}
                      >
                        <GoEye color="#8E5BE8" size={18} /> Visualizar
                      </MoreOptions.Button>
                      <MoreOptions.Button
                        onClick={() => handleClickEdit(delivery.id)}
                      >
                        <GoPencil color="#4D85EE" size={18} /> Editar
                      </MoreOptions.Button>
                      <MoreOptions.Button
                        onClick={() => handleClickDelete(delivery.id)}
                      >
                        <GoTrashcan color="#DE3B3B" size={18} /> Deletar
                      </MoreOptions.Button>
                    </MoreOptions.Container>
                  </td>
                </tr>
                <br />
              </React.Fragment>
            ))}
          </tbody>
        </Table>

        {!search && (
          <PaginationButtons
            nextFunc={nextPage}
            prevFunc={prevPage}
            cantGoBack={cantGoToPrevPage}
            cantGoForward={cantGoToNextPage}
          />
        )}
      </Container>
      <Modal show={modalShow} setShow={setModalShow}>
        <ModalContent>
          <InfoContainer>
            <p>Informações da encomenda</p>
            <div>
              <span>
                {currentDelivery.recipient.street},{' '}
                {currentDelivery.recipient.house_number}
              </span>
              <span>{currentDelivery.recipient.state}</span>
              <span>{currentDelivery.recipient.cep_code}</span>
              <span>{currentDelivery.product}</span>
            </div>
          </InfoContainer>
          <DatesInfoContainer>
            <p>Datas</p>
            <div>
              <span>
                <span>Retirada:</span> {startDate}
              </span>
              <span>
                <span>Entrega:</span> {endDate}
              </span>
            </div>
          </DatesInfoContainer>
          <SignatureInfoContainer>
            <p>Assinatura do destinatário</p>
            <div>
              {currentDelivery.signature && (
                <img
                  src={currentDelivery.signature.url_path}
                  alt="Assinatura"
                />
              )}
            </div>
          </SignatureInfoContainer>
        </ModalContent>
      </Modal>
    </>
  );
}
