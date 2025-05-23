import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Input, Box, Flex, Heading, Text, Button, NativeSelect } from "@chakra-ui/react"
import { v4 as uuidv4 } from 'uuid';


function App() {
   //Executa 1 vez, faz referencia para o Input inicial
  const refInput = useRef(null)
  useEffect(() => {
    refInput.current.focus()
  }, [])

  //Estado para salvar dados 
  const [dadosTask, setDadosTask] = useState({
    Id: uuidv4(),
    tarefa: "",
    prioridade: "",
    categoria: "",
  })

  //Estado para armazenar as task criadas 
  const [allTask, setAllTask] = useState([])


  //Lida com valores dos inputs
  const lidaComInput = (e) => {
    const { name, value } = e.target
    setDadosTask((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  console.log(dadosTask)


  //Lida com envio, dos dados para o array
  const handleToSend = () => {
    const task = dadosTask
    setAllTask(prev => [...prev, task])
  }
  //Oberservar o conportamento das tarefas entrando no array
  useEffect(()=>{
    console.log('Tasks atualizadas:', allTask)
  }, [allTask])

 

  return (
    <Box as="main" h="90vh" maxW="680px" display="flex" flexDirection="column" alignItems="center" margin="auto">
      <Flex gap="4" justify="space-between" w="100%" justifyItems="center" alignItems="center" pl="16px" pr="16px" >
        <Heading pl="3" fontSize={{ base: '16px', md: '16px', lg: '22px' }}>Add Task</Heading>
        <Text pr="3" fontSize={{ base: '12px', md: '12px', lg: '14px' }} >Numero</Text>
      </Flex>
      <Flex h="auto" gap="4" justify="space-evenly" align="center" wrap="wrap" w="100%" pt="10px">
        <Input value={dadosTask.tarefa} name='tarefa' onChange={lidaComInput} w={{
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
        <Flex direction="row" gap="4" wrap="wrap" align="center" justifyContent="center" pt="10px">
          <Box>
            <NativeSelect.Root  >
              <NativeSelect.Field name="prioridade" onChange={lidaComInput} placeholder="Prioridade" h="36px" w="130px"  >
                <option value="alta">Alta </option>
                <option value="normal">Normal</option>
                <option value="baixa">Baixa</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Box>
          <Box>
            <NativeSelect.Root  >
              <NativeSelect.Field name='categoria' onChange={lidaComInput} placeholder="Categoria" h="36px" w="130px">
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
      
    
    </Box>
  )
}

export default App
