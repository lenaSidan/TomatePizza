import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PizzaTypeList from './features/pizza_type/PizzaTypeList';
import PizzasList from './features/pizzas/PizzasList';
import Layout from './Layouts.tsx/Layouts';
import PizzaSizeList from './features/pizza_size/PizzaSizeList';
import IngredientsList from './features/ingredients/IngredientsList';

function App(): JSX.Element {
  return (
    <Router>
      <div className="mainContent">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="pizzas" element={<PizzasList />} />
            <Route path="pizza_type" element={<PizzaTypeList />} />
            <Route path="pizza_size" element={<PizzaSizeList />} />
            <Route path="ingredients" element={<IngredientsList />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
