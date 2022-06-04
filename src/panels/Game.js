import React, { useEffect, useState } from 'react';

import bridge from "@vkontakte/vk-bridge";

import { Panel, PanelHeader, PanelHeaderBack, Div, Group, CardGrid, Card, Header, ContentCard, Button, Title } from '@vkontakte/vkui';

import './Game.css';

const Game = ({id, go, deck, playersCount, setPlayersCount}) => {

	const [flashlightData, setFlashlightData] = useState({});

	const [currentCardIdx, setCurrentCardIdx] = useState(0);
	const [isBlock, setBlock] = useState(false);

	const currentCard = deck[currentCardIdx];

	let intervalId;

	const [time, setTime] = useState(playersCount * 60000);

	const [timeTitle, setTimeTitle] = useState({ minutes: '', seconds: '' });

	const fetchFlashlight = async () => {
		bridge.send("VKWebAppFlashGetInfo").then(
            data => {
                console.log(data);
				setFlashlightData(data);
            }
        ).catch(
            error => {
                console.log(error);
                return false;
            }
        );
	}

	const updateTime = () => {
		intervalId = setInterval(() => {
			setTime(time => time - 1000);
		}, 1000);
	}

	useEffect(async () => {
		await fetchFlashlight();

		updateTime();
	}, [])

	useEffect(() => {
		setTimeTitle({ minutes: Math.floor(time / 60000), seconds: (time % 60000) / 1000 });

		if (time === 0) {
			intervalId = null;
			clearInterval(intervalId);

			setCurrentCardIdx(deck.length);
		}

		if (time < 10000 && time > 0 && flashlightData.is_available) {
			if (time % 2000 == 0) {
				bridge.send("VKWebAppFlashSetLevel", {"level": 1});
			}
			else {
				bridge.send("VKWebAppFlashSetLevel", {"level": 0});
			}
		}

	}, [time])

	const goToHome = (e) => {
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
				<Title>
					{time > 0 && `${timeTitle.minutes}:${timeTitle.seconds}`}
				</Title>

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
