import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Game from './panels/Game';
import PlayersForm from './panels/PlayersForm';

const App = () => {
	const [scheme, setScheme] = useState('bright_light')
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

	const [locations, setLocations] = useState([
		{ id: 1, title: 'Стройплощадка', status: 'Прораб', owner: '' },
		{ id: 2, title: 'Метро', status: 'Машинист', owner: '' },
		{ id: 3, title: 'Стадион', status: 'Бегун', owner: '' },
		{ id: 4, title: 'Музей', status: 'Посетитель', owner: '' },
		{ id: 5, title: 'Экскурсионный автобус', status: 'Водитель', owner: '' },
		{ id: 6, title: 'Рок-концерт', status: 'Фанат', owner: '' },
		{ id: 7, title: 'Заправочная станция', status: 'Кассир', owner: '' },
		{ id: 8, title: 'Парламент', status: 'Депутат', owner: '' },
		{ id: 9, title: 'Дом престарелых', status: 'Дед', owner: '' },
		{ id: 10, title: 'Шахта', status: 'Шахтер', owner: '' },
		{ id: 11, title: 'Библиотека', status: 'Читатель', owner: '' },
		{ id: 12, title: 'Шоколадная фабрика', status: 'Кондитер', owner: '' },
	])

	const [playersCount, setPlayersCount] = useState('');

	const [deck, setDeck] = useState([]);

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
								<Home id='home' fetchedUser={fetchedUser} go={go} locations={locations} playersCount={playersCount} setPlayersCount={setPlayersCount} setDeck={setDeck} setLocations={setLocations} />
								<PlayersForm id='playersform' deck={deck} setDeck={setDeck} go={go} />
								<Game id='game' deck={deck} playersCount={playersCount} setPlayersCount={setPlayersCount} go={go} />
							</View>
						</SplitCol>
					</SplitLayout>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;
