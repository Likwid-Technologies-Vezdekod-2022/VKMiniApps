import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Game from './panels/Game';

const App = () => {
	const [scheme, setScheme] = useState('bright_light')
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

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

	const [playersCount, setPlayersCount] = useState(0);

	const [cardsId, setCardsId] = useState([]);

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				setScheme(data.scheme)
			}
		});

		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	return (
		<ConfigProvider scheme={scheme}>
			<AdaptivityProvider>
				<AppRoot>
					<SplitLayout popout={popout}>
						<SplitCol>
							<View activePanel={activePanel}>
								<Home id='home' fetchedUser={fetchedUser} go={go} locations={locations} playersCount={playersCount} setPlayersCount={setPlayersCount} cardsId={cardsId} setCardsId={setCardsId} />
								<Game id='game' playersCount={playersCount} locations={locations} go={go} />
							</View>
						</SplitCol>
					</SplitLayout>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;
