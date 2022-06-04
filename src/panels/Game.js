import React, { useState } from 'react';

import { Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';

import './Game.css';

const Game = ({id, go, deck}) => {
	return (
		<Panel id={id}>
			<PanelHeader
				left={<PanelHeaderBack onClick={go} data-to="home"/>}>
					
				Game
			</PanelHeader>

		</Panel>
	)
};

export default Game;
