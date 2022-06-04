import React, { useState } from 'react';

import { Panel, PanelHeader, PanelHeaderBack, Div, Group, CardGrid, Card, Header, ContentCard } from '@vkontakte/vkui';

import './Game.css';

const Game = ({id, go, deck}) => {
	const [currentCardIdx, setCurrentCardIdx] = useState(0);
	const [isBlock, setBlock] = useState(false);


	return (
		<Panel id={id}>
			<PanelHeader
				left={<PanelHeaderBack onClick={go} data-to="home"/>}>
					
				Game
			</PanelHeader>

			<Div>
				{deck.map((card, idx) =>
					<Group mode="plain"
						header={<Header mode="secondary">Ваша карта: </Header>}>
							
						<CardGrid size="l">
							<ContentCard
								subtitle={card.title && `Локация: ${card.title}`}
								header={`Статус: ${card.status}`}
							/>

						</CardGrid>
					</Group>
				)}
			</Div>

		</Panel>
	)
};

export default Game;
