import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import { Input, Box, Flex, Heading, Text, Button, NativeSelect, For, HStack } from "@chakra-ui/react"
import { mensagemAviso, mensagemSucesso, mensagemDelete } from './mensagensUtils';
import { v4 as uuidv4 } from 'uuid';
import SectionTarefas from './components/ui/SectionTarefas';
import { Toaster } from "@/components/ui/toaster"

function App() {


  //Executa 1 vez, faz referencia para o Input inicial
  const refInput = useRef(null)
  useEffect(() => {
    refInput.current.focus()
  }, [])

  const [buttonBlock, setButtonBlock] = useState(false)


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

  //Estado para guarda valor das tarefas

  const [totalTask, setTotalTask] = useState()


  //Caregar sempre que tiver alteração no array
  useEffect(() => {
    localStorage.setItem("tarefa", JSON.stringify(allTask))
  }, [allTask])



  //Pega valores dos inputs e lança para o objeto e depois retorna para o conponente
  const lidaComInput = useCallback((e) => {
    const { name, value } = e.target
    setDadosTask((prev) => ({
      ...prev,
      [name]: value,
    }))

  }, [])



  //

  //Quando clicar no botão envie os dados salvos no objeto para o array, e limpe o id eos inputs, e adcione mensagem erro e sucesso
  const handleToSend = () => {
    const dadosPrenchidos = dadosTask.tarefa && dadosTask.categoria && dadosTask.prioridade

    if (dadosPrenchidos) {
      const task = dadosTask
      setAllTask(prev => [...prev, task])
      setDadosTask((prev) => ({
        ...prev,
        id: uuidv4(),
        tarefa: "",
        prioridade: '',
        categoria: "",
      })
      )
      mensagemSucesso()

    } else {
      setButtonBlock(true)
      setTimeout(() => {
        setButtonBlock(false)
      }, 2000)
      mensagemAviso()
    }

  }

  //function para observar quantas tarefas tenho dentro de um array
  useEffect(() => {
    const total = allTask.length
    setTotalTask(total)
    console.log(total)
  }, [allTask])


  //Excluir tarefas do meu array de objetos
  const deleteTask = (id, index) => {
    mensagemDelete("", index, () => {
      setAllTask((prev) => prev.filter((atual) => atual.id !== id))
    })
  }

  return (
    <Box as="main" h="90vh" maxW="680px" display="flex" flexDirection="column" alignItems="center" margin="auto" >
      <Toaster />
      <Flex gap="4" w="100%" justifyItems="center" alignItems="center" direction="column" >
        <Heading fontSize={{ base: '18px', md: '22px', lg: '32px' }}>Tarefas</Heading>
        <Box display="flex" gap="6" w="100%" justifyContent="center" alignItems="center" flexWrap="wrap">
          <Text fontSize={{ base: '12px', md: '14px', lg: '16px' }} > Total: {totalTask}  </Text>
          <Text fontSize={{ base: '12px', md: '14px', lg: '16px' }}  >Concluidas: {totalTask}  </Text>
          <Text fontSize={{ base: '12px', md: '14px', lg: '16px' }}  >Pendentes: {totalTask}  </Text>
        </Box>
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
            disabled={buttonBlock}
            variant="solid"
            h="36px"
            w="80px"
            colorScheme="blue"
          >
            add
          </Button>
        </Flex>
      </Flex>

      {totalTask === 0 ? (
        <Text mt="40px"  width="100%"  fontSize="22">Comece adicionando Tarefas!</Text>
      ) : (
        <SectionTarefas dadosTarefas={allTask} deleteTask={deleteTask} />
      )}
    </Box>
  )
}

export default App
