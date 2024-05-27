import { sampleProducts } from './data'

function App() {
  return (
    <div>
      <header>TS Arizona</header>
      <main>
        <ul>
          {sampleProducts.map((product) => (
            <li>
              <h2>{product.name}</h2>
            </li>
          ))}
        </ul>
      </main>
      <footer>All right reserved</footer>
    </div>
  )
}

export default App
