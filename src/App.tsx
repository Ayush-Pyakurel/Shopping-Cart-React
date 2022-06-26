//libraries imports
import { Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';

//component import from Page folder
import { Home } from './Pages/Home';
import { Store } from './Pages/Store';
import { About } from './Pages/About';

function App(): JSX.Element {
  return (
    <Container>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/store' element={<Store />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </Container>
  );
}

export default App;
