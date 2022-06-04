import React, { useState } from 'react';

import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, FormLayout, FormItem, Input } from '@vkontakte/vkui';

const Home = ({ id, go, fetchedUser, playersCount, setPlayersCount }) => {
	const [locations, setLocations] = useState([
		{ id: 1, title: 'Стройплощадка', status: 'Прораб' },
		{ id: 2, title: 'Метро', status: 'Машинист' },
		{ id: 3, title: 'Стадион', status: 'Бегун' },
		{ id: 4, title: 'Музей', status: 'Посетитель' },
		{ id: 5, title: 'Экскурсионный автобус', status: 'Водитель' },
		{ id: 6, title: 'Рок-концерт', status: 'Фанат' },
		{ id: 7, title: 'Заправочная станция', status: 'Кассир' },
		{ id: 8, title: 'Парламент', status: 'Депутат' },
		{ id: 9, title: 'Дом престарелых', status: 'Дед' },
		{ id: 10, title: 'Шахта', status: 'Шахтер' },
		{ id: 11, title: 'Библиотека', status: 'Читатель' },
		{ id: 12, title: 'Шоколадная фабрика', status: 'Кондитер' },
	])

	const [disabled, setDisabled] = useState(true);

	const inputValidate = (value) => {
		if (value > 0 && value <= 12) {
			setPlayersCount(value);
			setDisabled(false);
		}
		else setDisabled(true);
	}

	return (
		<Panel id={id}>
			<PanelHeader>Локации</PanelHeader>
			{fetchedUser &&
			<Div>
				<Group>
					<FormLayout>
						<FormItem top="Введите количество игроков: ">
							<Input value={playersCount} onChange={e => inputValidate(e.target.value)} type="number"/>
						</FormItem>

						<Button stretched size="l" mode="secondary" onClick={go} data-to="game" disabled={disabled}>
							Играть!
						</Button>
					</FormLayout>
				</Group>

				<Group>
					{locations.map((location, idx) =>
						<Cell description={`Статус: ${location.status}`}>

						{location.title}
						</Cell>
					)}
				</Group>
			</Div>}
	
		</Panel>
	);
}


export default Home;
