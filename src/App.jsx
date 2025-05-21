import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {

  //Estado para mostrar a prioridade
  const [prioridade, setPrioridade] = useState('')

  //Executa 1 vez, faz referencia para o Input inicial
  const refInput = useRef(null)
  useEffect(()=>{
    refInput.current.focus()
  }, [])

  return (
      <div>
        <div>
          <h1>Add Task</h1>
          <p>Numero</p>
        </div>

        <div>
          <input 
            type="text" 
            placeholder='Task...' 
            ref={refInput}
          />
          <div clas>
            <label htmlFor="select"  >Prioridade</label>
            <select id='select' value={prioridade} onChange={(e) => setPrioridade(e.target.value)} >
              <option value="" disabled hidden>Priority</option>
              <option value="alta">High </option>
              <option value="normal"> Normal</option>
              <option value="baixa">Low </option>
            </select>
            <button>add</button>
          </div>
        </div>

      </div>
  )
}

export default App
