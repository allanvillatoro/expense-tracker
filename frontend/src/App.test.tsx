import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';

test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <App/>
    </Provider>
  );
  screen.debug();

  //it will work only if it's logged in
  //expect(screen.getByRole("navigation")).toBeInTheDocument()
  //expect(screen.getAllByRole("link").length).toBe(4);
  //expect(screen.findByRole("link", { name: "Home"})).toBeInTheDocument();
  //expect(screen.findByRole("link", { name: "Expenses"})).toBeInTheDocument();
  //expect(screen.findByRole("link", { name: "Categories"})).toBeInTheDocument();
  //expect(screen.findByRole("link", { name: "About"})).toBeInTheDocument();
});
