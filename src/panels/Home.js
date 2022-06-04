import React, { useState } from 'react';

import { Panel, PanelHeader, Button, Group, Cell, Div, FormLayout, FormItem, Input } from '@vkontakte/vkui';

const Home = ({ id, go, fetchedUser, locations, playersCount, setPlayersCount, setDeck }) => {

	const [disabled, setDisabled] = useState(true);

	const createDeck = (e) => {
		const values = [...locations];

		// Формируем колоду карт локаций
		let rawDeck = [...Array(playersCount)].map(() => values.splice(Math.floor(Math.random() * values.length), 1)[0]);

		const deckItemsIdxs = [...Array(playersCount)].map((_, i) => i);

		let spyesIdxs;

		// Создаем массив индексов deckItems в массиве, которые надо заменить на шпионов
		if (playersCount <= 6) spyesIdxs = [...Array(1)].map(() => deckItemsIdxs.splice(Math.floor(Math.random() * deckItemsIdxs.length), 1)[0]);
		else spyesIdxs = [...Array(2)].map(() => deckItemsIdxs.splice(Math.floor(Math.random() * deckItemsIdxs.length), 1)[0]);

		// Заменяем 
		rawDeck = rawDeck.map((item, idx) => {
			if (idx === spyesIdxs[0] || idx === spyesIdxs[1]) return { title: '', status: 'Шпион' }
			else return item
		})

		setDeck(rawDeck);

		go(e);
	}

	const inputValidate = (value) => {
		value = +value;

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
							<Input value={playersCount} onChange={e => inputValidate(e.target.value)} type="number" />
						</FormItem>

						<Button stretched size="l" mode="secondary" onClick={createDeck} data-to="game" disabled={disabled}>
							Играть!
						</Button>

					</FormLayout>
				</Group>

				<Group>
					{locations.map((location, idx) =>
						<Cell description={`Статус: ${location.status}`} key={location.id}>

						{location.title}
						</Cell>
					)}
				</Group>
			</Div>}
	
		</Panel>
	);
}


export default Home;
