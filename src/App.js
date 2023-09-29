import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import MovieDetail from './pages/MovieDetail';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
    <Box>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/:original_title/:id' element={<MovieDetail/>}/>
        </Routes>
        <Footer/>
    </Box>
    </BrowserRouter>
  );
}

export default App;
