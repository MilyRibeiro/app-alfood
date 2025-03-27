import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import AdminRestaurantes from './paginas/Admin/Restaurantes/AdminRestaurantes';
import FormularioRestaurante from './paginas/Admin/Restaurantes/FormularioRestaurante';
import PaginaBasedoAdmin from './paginas/Admin/Restaurantes/PaginaBaseAdmin';
import AdminPratos from './paginas/Pratos/AdminPratos';
import FormularioPratos from './paginas/Pratos/FormularioPratos';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path='/admin/' element={<PaginaBasedoAdmin />}>
        <Route path="restaurantes" element={<AdminRestaurantes />} />
        <Route path="restaurantes/novo" element={<FormularioRestaurante />} />
        <Route path="restaurantes/:id" element={<FormularioRestaurante />} />
        <Route path="pratos" element={<AdminPratos />}></Route>
        <Route path="pratos/novo" element={<FormularioPratos />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
