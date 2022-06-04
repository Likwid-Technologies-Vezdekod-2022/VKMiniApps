import React, { useState } from 'react';

import { Panel, PanelHeader, PanelHeaderBack, Div, Group, CardGrid, Card, Header, ContentCard, Button } from '@vkontakte/vkui';

import './Game.css';

const Game = ({id, go, deck, setPlayersCount}) => {
	const [currentCardIdx, setCurrentCardIdx] = useState(0);
	const [isBlock, setBlock] = useState(false);

	const currentCard = deck[currentCardIdx];

	const goToHome= (e) => {
		setPlayersCount('');
		go(e);
	}

	const block = () => {
		setBlock(true);
		setCurrentCardIdx(currentCardIdx + 1);
	}	

	const changeIdx = () => {
		setBlock(false);
	}

	return (
		<Panel id={id}>
			<PanelHeader
				left={<PanelHeaderBack onClick={goToHome} data-to="home"/>}>
					
				Game
			</PanelHeader>

			<Div>
				{!isBlock && currentCardIdx !== deck.length && <Div>
					<Group mode="plain"
						header={<Header mode="secondary">Ваша карта: </Header>}>
							
						<CardGrid size="l">
							<ContentCard
								subtitle={currentCard.title && `Локация: ${currentCard.title}`}
								header={`Статус: ${currentCard.status}`}
							/>
						</CardGrid>

						<Button stretched size="l" mode="secondary" onClick={block} className="game__btn">
							Дальше
						</Button>
					</Group>
				</Div>}

				{isBlock && currentCardIdx !== deck.length && <Div>
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

				{currentCardIdx === deck.length && <Div>
					<Group mode="plain">
						<CardGrid size="l">
							<ContentCard
								header="Игра окончена!"
							/>
						</CardGrid>
					</Group>
				</Div>}
			</Div>

		</Panel>
	)
};

export default Game;
