import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Input, Box, Flex, Heading, Text, Button, NativeSelect } from "@chakra-ui/react"
import { v4 as uuidv4 } from 'uuid';
import SectionTarefas from './components/ui/SectionTarefas';


function App() {
  //Executa 1 vez, faz referencia para o Input inicial
  const refInput = useRef(null)
  useEffect(() => {
    refInput.current.focus()
  }, [])

  //Estado para salvar dados 
  const [dadosTask, setDadosTask] = useState({
    id: uuidv4(),
    tarefa: "",
    prioridade: "",
    categoria: "",
  })

  //Estado para armazenar as task criadas e armazenar no locall storge / Imita o useEffect atualiza apenas na criação do component
  const [allTask, setAllTask] = useState(() => {
    const dadosSalvos = localStorage.getItem("tarefa") // busca dados salvos no localStorage
    return dadosSalvos ? JSON.parse(dadosSalvos) : [] // se tiver dados, retorna eles, senão retorna array vazio
  })

  //Estado para armazenar o erro de inputs
  const [erroInput, setErroInput] = useState(false)




  //Caregar sempre que tiver alteração no array
  useEffect(() => {
    localStorage.setItem("tarefa", JSON.stringify(allTask))
  }, [allTask])



  //Pega valores dos inputs e lança para o objeto e depois retorna para o conponente
  const lidaComInput = (e) => {
    const { name, value } = e.target
    setDadosTask((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  console.log(dadosTask)


  //Quando clicar no botão envie os dados salvos no objeto para o array, e limpe o id eos inputs
  const handleToSend = () => {
    if (dadosTask.tarefa && dadosTask.categoria && dadosTask.prioridade) {
      const task = dadosTask
      setAllTask(prev => [...prev, task])
      setDadosTask((prev) => ({
        ...prev,
        id: uuidv4(),
        tarefa: "",
        prioridade: '',
        categoria: "",
      }))
    } else {
      setErroInput(true)
      setTimeout(() => {
        setErroInput(false)
      }, 2000)
    }
  }

  //Excluir tarefas do meu array de objetos
  const deleteTask = (id) => {
    setAllTask((prev) => prev.filter((atual) => atual.id !== id))
    console.log("erro")
  }

  return (
    <Box as="main" h="90vh" maxW="680px" display="flex" flexDirection="column" alignItems="center" margin="auto" >
      <Flex gap="4" justify="space-between" w="100%" justifyItems="center" alignItems="center"  >
        <Heading fontSize={{ base: '16px', md: '16px', lg: '22px' }}>Add Task</Heading>
        <Text fontSize={{ base: '12px', md: '12px', lg: '14px' }} >Numero</Text>
      </Flex>
      <Flex h="auto" gap="4" justify="space-evenly" align="center" wrap="wrap" w="100%" pt="10px">
        <Input maxLength="30" value={dadosTask.tarefa} name='tarefa' onChange={lidaComInput} w={{
          base: '100%',
          sm: "500px",
          md: '600px',
          lg: '600px',
        }}
          h="36px"
          type="text"
          placeholder='Task...'
          ref={refInput}
        />
        <Flex direction="row" gap="4" wrap="wrap" alignItems="center" justifyContent="center" pt="2px" pb="2px" w="100%" >
          <Box>
            <NativeSelect.Root  >
              <NativeSelect.Field name="prioridade" onChange={lidaComInput} value={dadosTask.prioridade} placeholder="Prioridade" h="36px" w="130px"  >
                <option value="alta">Alta </option>
                <option value="normal">Normal</option>
                <option value="baixa">Baixa</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Box>
          <Box>
            <NativeSelect.Root  >
              <NativeSelect.Field name='categoria' onChange={lidaComInput} value={dadosTask.categoria} placeholder="Categoria" h="36px" w="130px">
                <option value="pessoal">✅ Pessoal </option>
                <option value="profissional">💼 Profissional</option>
                <option value="casa">🏠 Casa  </option>
                <option value="saude">💪 Saúde  </option>
                <option value="lazer">🎉 Lazer  </option>
                <option value="ideias">💡 Ideias </option>
                <option value="compras">🛒 Compras </option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Box>
          <Button
            onClick={handleToSend}
            variant="solid"
            h="36px"
            w="80px"
            colorScheme="blue"
          >
            add
          </Button>
        </Flex>
      </Flex>

        {erroInput && (
          <Flex mt="16px" fontSize="xm" w="100%"  align="center" justify="center" color="red">Por favor digite todos os campos!</Flex>
        )}
      
      <SectionTarefas dadosTarefas={allTask} deleteTask={deleteTask} />
    </Box>
  )
}

export default App
