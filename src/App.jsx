import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Input, Box, Flex, Heading, Text, Button, NativeSelect } from "@chakra-ui/react"



function App() {

  //Estado para mostrar a prioridade
  const  [prioridade, setPrioridade ] = useState('')

  //Executa 1 vez, faz referencia para o Input inicial
  const refInput = useRef(null)
  useEffect(() => {
    refInput.current.focus()
  }, [])

  return (
    <Box as="main" h="90vh"  maxW="680px" display="flex" flexDirection="column" alignItems="center" margin="auto">
      <Flex background="red" gap="4" justify="space-between" w="100%"  justifyItems="center"  pl="16px" pr="16px" >
        <Heading pl="3" fontSize={{base: 'sm', md:'md', lg:'2xl'}}>Add Task</Heading>
        <Text pr="3" textStyle="md">Numero</Text>
      </Flex>
      <Flex h="auto" gap="4" justify="space-evenly" align="center" wrap="wrap" background="blue" w="100%" pt="10px">
        <Input w={{
            base: '100%',
            md: '300px',
            lg: '400px',
        }}
          h="36px"
          type="text"
          placeholder='Task...'
          ref={refInput}
        />
        <Flex direction="row" gap="4"  wrap="w"  background="pink" >
          <NativeSelect.Root   value={prioridade} onChange={(e) => setPrioridade(e.target.value)} >
            <NativeSelect.Field placeholder="Priority" h="36px" w="130px" >
              <option value="alta">High </option>
              <option value="normal"> Normal</option>
              <option value="baixa">Low </option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
          <Button
            variant="solid"
            h="34px"
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
