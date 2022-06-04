import React, { useState } from 'react';

import { Panel, PanelHeader, PanelHeaderBack, Div, Group, CardGrid, Card, Header, ContentCard, Button } from '@vkontakte/vkui';

import './Game.css';

const Game = ({id, go, deck}) => {
	const [currentCardIdx, setCurrentCardIdx] = useState(0);
	const [isBlock, setBlock] = useState(false);

	const currentCard = deck[currentCardIdx];

	const block = () => {
		setBlock(true);
	}	

	const changeIdx = () => {
		setCurrentCardIdx(currentCardIdx + 1);
		setBlock(false);
	}

	return (
		<Panel id={id}>
			<PanelHeader
				left={<PanelHeaderBack onClick={go} data-to="home"/>}>
					
				Game
			</PanelHeader>

			<Div>
				{!isBlock && <Div>
					<Group mode="plain"
						header={<Header mode="secondary">Ваша карта: </Header>}>
							
						<CardGrid size="l">
							<ContentCard
								subtitle={currentCard.title && `Локация: ${currentCard.title}`}
								header={`Статус: ${currentCard.status}`}
							/>
						</CardGrid>

						<Button stretched size="l" mode="secondary" onClick={block}>
							Дальше
						</Button>
					</Group>
				</Div>}

				{isBlock && <Div>
					<Group mode="plain"
						header={<Header mode="secondary">Не подглядывайте!</Header>}>
							
						<CardGrid size="l">
							<ContentCard
								header="Передайте телефон другому игроку!"
							/>
						</CardGrid>
					</Group>

					<Button stretched size="l" mode="secondary" onClick={changeIdx}>
						Все ок
					</Button>
				</Div>}
			</Div>

		</Panel>
	)
};

export default Game;
