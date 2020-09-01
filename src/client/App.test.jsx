import React from 'react';
import { act, render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

global.fetch = jest.fn();
global.fetch.mockImplementation(() => ({
  ok: true,
  json: () => ({
    items: [
      {
        id: 1001,
        name: 'Test1',
        dietaries: ['dietary-a', 'dietary-b'],
      },
      {
        id: 1002,
        name: 'This is name!',
        dietaries: ['dietary-b', 'dietary-c'],
      },
      {
        id: 1003,
        name: 'Test3',
        dietaries: ['dietary-a'],
      },
    ],
  }),
}));

let container;
describe('App', () => {
  beforeEach(async () => {
    await act(async () => {
      ({ container } = await render(<App />));
    });
  });

  it('renders items for selection', () => {
    expect(container).toMatchSnapshot();
  });

  it('searches for items', () => {
    const input = screen.getByPlaceholderText('Name');

    fireEvent.change(input, { target: { value: 'Name' } });

    expect(screen.queryByText('Test1')).not.toBeInTheDocument();
    expect(screen.getByText('This is name!')).toBeInTheDocument();
    expect(screen.queryByText('Test3')).not.toBeInTheDocument();
  });

  it('selects item, show number of items, show selected dietaries', () => {
    expect(screen.queryAllByText('Test1')).toHaveLength(1);

    userEvent.click(screen.getByText('Test1'));

    expect(container).toMatchSnapshot();
    expect(screen.getByText('1 items')).toBeInTheDocument();
    expect(screen.queryAllByText('dietary-a')).toHaveLength(4);
    expect(screen.queryAllByText('Test1')).toHaveLength(2);
  });

  it('select multiple items and removes item', () => {
    userEvent.click(screen.getByText('Test1'));
    userEvent.click(screen.getByText('Test3'));
    userEvent.click(screen.queryAllByText('x')[0]);

    expect(container).toMatchSnapshot();
    expect(screen.queryAllByText('Test1')).toHaveLength(1);
  });

  it('does not add the same item twice', () => {
    userEvent.click(screen.getByText('Test1'));
    userEvent.click(screen.queryAllByText('Test1')[0]);

    expect(container).toMatchSnapshot();
    expect(screen.queryAllByText('Test1')).toHaveLength(2);
  });
});
