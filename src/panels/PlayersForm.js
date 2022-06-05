import React, { useEffect, useState } from 'react';

import { Panel, PanelHeader, Div, Button, Group, FormLayout, FormItem, Input } from '@vkontakte/vkui';

const PlayersForm = ({ id, go, deck, setDeck }) => {

    const changeCardOwners = (value, idx) => {
        let items = [...deck];
		let item = {...items[idx], owner: value};

		items[idx] = item;

		setDeck(items);
    }

    return (
        <Panel id={id}>
            <PanelHeader>
                Введите имена игроков
            </PanelHeader>

            <Div>
                <Group>
                    <FormLayout>
                        {deck.map((card, idx) =>
                            <FormItem top="Введите количество игроков: " key={idx}>
                                <Input onChange={e => changeCardOwners(e.target.value, idx)} />
                            </FormItem>
                        )}

                        <Button onClick={go} data-to="game">Играть!</Button>

                    </FormLayout>
                </Group>
            </Div>

        </Panel>
    )
}

export default PlayersForm