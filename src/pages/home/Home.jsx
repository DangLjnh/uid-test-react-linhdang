// import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../../states/actions/counterActions';

const Home = () => {
  const count = useSelector(state => state.counter.count);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Welcome to Our Store</h1>
      <p>Counter: {count}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <nav>
        <ul>
          <li><Link to="/products">View Products</Link></li>
          <li><Link to="/create-product">Create New Product</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;