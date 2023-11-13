import './App.css';
import {SongContainer} from './components/SongContainer.jsx'




const categorySelector = document.querySelector('#categorySelector')


function App() {

  
  return (
    <div className="App">
      <header>
      <img src='./img/logo.jpg' alt="Cover de l'instrumental"/>
        <h1>Manatee production</h1>
      </header>
      <main>
        <SongContainer/>
      </main>
     <footer>
        <ul>
          <li>Need a custom beat ?</li>
          <li><a href='mailto:manatee.prod@protonmail.com'>manatee.prod@protonmail.com</a></li>
        </ul>
        
        <a href="#songContainer"><i class="fa-solid fa-arrow-up"></i></a>
     </footer>
    </div>
  );
}

export default App;
