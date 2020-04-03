import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { FiPlus } from 'react-icons/fi';

import api from '~/services/api';

import {
  Container,
  DeliveriesTable,
  DeliverymanName,
  DeliveryStatus,
} from './styles';
import DeliveryMoreOptions from './DeliveryMoreOptions';
import Modal from './Modal';

export default function Deliveries() {
  const [search, setSearch] = useState('');
  const [deliveries, setDeliveries] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [currentDelivery, setCurrentDelivery] = useState({
    recipient: {},
    deliveryman: {},
    signature: {},
  });

  const getRandomColor = useCallback(() => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }, []);

  useEffect(() => {
    (async () => {
      const response = await api.get(`/deliveries?search=${search}`);

      const data = response.data.map(delivery => {
        const [firstName, secondName] = delivery.deliveryman.name.split(' ');
        const firstLetter = firstName ? firstName[0] : '';
        const secondLetter = secondName ? secondName[0] : '';

        return {
          ...delivery,
          deliveryman: {
            ...delivery.deliveryman,
            twoFirstLetters: `${firstLetter}${secondLetter}`,
            twoFirstLettersColor: getRandomColor(),
          },
        };
      });

      setDeliveries(data);
    })();
  }, [search, getRandomColor]);

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

  function handleClickView(delivery) {
    setModalShow(!modalShow);
    setCurrentDelivery(delivery);
  }

  return (
    <>
      <Container>
        <main>
          <h1>Gerenciando encomendas</h1>

          <div>
            <input
              type="text"
              placeholder="Buscar por encomendas"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />

            <Link to="/deliveries/new">
              <FiPlus color="#fff" size={26} />
              <span>Cadastrar</span>
            </Link>
          </div>

          <DeliveriesTable>
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
                <React.Fragment key={String(delivery.id)}>
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
                    <DeliveryStatus status={getDeliveryStatus(delivery)}>
                      <span>{getDeliveryStatus(delivery)}</span>
                    </DeliveryStatus>
                    <DeliveryMoreOptions
                      onClickView={() => handleClickView(delivery)}
                      delivery={delivery}
                    />
                  </tr>
                  <br />
                </React.Fragment>
              ))}
            </tbody>
          </DeliveriesTable>
        </main>
      </Container>
      <Modal
        show={modalShow}
        setShow={setModalShow}
        delivery={currentDelivery}
      />
    </>
  );
}
