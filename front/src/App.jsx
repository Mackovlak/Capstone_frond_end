import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
// import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router';
import { HomePage } from './Pages/Home_Page';
import { LoginForm, RegisterForm } from './components/sc-form';
import { Navigation } from './components/navigation';
import { About } from './Pages/about';
import { Education } from './Pages/education';
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<HomePage />} />
            <Route path="/about" element={<About />} />
          </Route>
          <Route path='/education' element={<Education />} />
          <Route path='/login' element={<LoginForm />}></Route>
          <Route path='/register' element={<RegisterForm />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
