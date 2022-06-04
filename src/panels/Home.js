import React, { useState } from 'react';

import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar } from '@vkontakte/vkui';

const Home = ({ id, go, fetchedUser }) => {
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

	return (
		<Panel id={id}>
			<PanelHeader>Локации</PanelHeader>
			{fetchedUser &&
			<Group>
				{locations.map((location, idx) =>
					<Cell description={`Статус: ${location.status}`}>

					{location.title}
					</Cell>
				)}
			</Group>}
	
			{/* <Group header={<Header mode="secondary">Navigation Example</Header>}>
				<Div>
					<Button stretched size="l" mode="secondary" onClick={go} data-to="persik">
						Show me the Persik, please
					</Button>
				</Div>
			</Group> */}
		</Panel>
	);
}


export default Home;