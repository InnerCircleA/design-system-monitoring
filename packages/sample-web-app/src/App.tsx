import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainPage from './routes/MainPage';
import DetailPage from './routes/DetailPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/detail",
    element: <DetailPage />
  }
]);

const App: React.FC = () => <RouterProvider router={router} />

export default App;
