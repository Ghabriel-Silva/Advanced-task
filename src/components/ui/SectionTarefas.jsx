import { Table, Box, Text, Checkbox, CloseButton, Flex, Card } from "@chakra-ui/react"
import { useBreakpointValue } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";



const SectionTarefas = ({ dadosTarefas, deleteTask }) => {

    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <Box w="100%" mt="40px">
            {isMobile ? (
                dadosTarefas.map((e, index) => (
                    <Card.Root key={e.id} mb="15px" >
                        <Card.Body gap="2" >
                            <Card.Title fontSize="2xl" >Tarefa {index + 1} </Card.Title>
                            <Card.Description  >
                                <Text as="span" fontSize="md" fontWeight="bold" mr="3px">
                                    Tarefa:
                                </Text> {e.tarefa}
                            </Card.Description>
                            <Card.Description >
                                <Text as="span" fontSize="md" fontWeight="bold" mr="3px">
                                    Prioridade:
                                </Text> {e.prioridade}
                            </Card.Description>
                            <Card.Description >
                                <Text as="span" fontSize="md" fontWeight="bold" mr="3px">
                                    Categoria:
                                </Text> {e.categoria}
                            </Card.Description>
                        </Card.Body>
                        <Card.Footer justifyContent="flex-end" background="gray.800" height="50px" alignItems="center" pb="0" >
                            <CloseButton onClick={() => deleteTask(e.id, index)} color="red.600"><MdDelete /></CloseButton>
                            <CloseButton color="yellow.400"><AiFillEdit /></CloseButton>
                        </Card.Footer>
                    </Card.Root>
                ))
            ) : (
                <Table.Root  >
                    {/* Cabeçalho da tabela */}
                    <Table.Header>
                        <Table.Row>
                            {/* Título da coluna */}
                            <Table.ColumnHeader>
                                <Checkbox.Root>
                                    <Checkbox.HiddenInput />
                                    <Checkbox.Control></Checkbox.Control>
                                </Checkbox.Root>
                            </Table.ColumnHeader>
                            <Table.ColumnHeader fontSize="md">Tarefa</Table.ColumnHeader>
                            <Table.ColumnHeader fontSize="md">Prioridade</Table.ColumnHeader>
                            <Table.ColumnHeader fontSize="md" >Categoria</Table.ColumnHeader>
                            <Table.ColumnHeader fontSize="md" textAlign="center">Editar</Table.ColumnHeader>
                            <Table.ColumnHeader fontSize="md" textAlign="end">Deletar</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    {/* Corpo da tabela onde ficam os dados */}
                    <Table.Body>
                        {dadosTarefas.map((e, index) => (
                            <Table.Row key={e.id}>
                                {/* Celula de cada linha */}
                                <Table.Cell>
                                    <Checkbox.Root>
                                        <Checkbox.HiddenInput />
                                        <Checkbox.Control></Checkbox.Control>
                                    </Checkbox.Root>
                                </Table.Cell>
                                <Table.Cell>{e.tarefa}</Table.Cell>
                                <Table.Cell >{e.prioridade}</Table.Cell>
                                <Table.Cell >{e.categoria}</Table.Cell>
                                <Table.Cell textAlign="center"  > <CloseButton color="yellow.400"><AiFillEdit /></CloseButton> </Table.Cell>
                                <Table.Cell textAlign="end"  ><CloseButton onClick={() => deleteTask(e.id, index)} color="red.600"><MdDelete /></CloseButton> </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            )}
        </Box>


    )
}

export default SectionTarefas