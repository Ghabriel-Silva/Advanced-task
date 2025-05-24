import { Table, Box, Text } from "@chakra-ui/react"
import { useBreakpointValue } from "@chakra-ui/react";



const SectionTarefas = ({ dadosTarefas, deleteTask }) => {

    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <Box  w="100%" mt="22px">
            {isMobile ? (
                dadosTarefas.map((e) => (
                    <Box key={e.id} p="16px" border="1px" borderRadius="md" mb={2}>
                        <Text><b>Tarefa:</b> {e.tarefa}</Text>
                        <Text><b>Prioridade:</b> {e.prioridade}</Text>
                        <Text><b>Categoria:</b> {e.categoria}</Text>
                    </Box>
                ))
            ) : (
                <Table.Root  >
                    {/* Cabeçalho da tabela */}
                    <Table.Header>
                        <Table.Row>
                            {/* Título da coluna */}
                            <Table.ColumnHeader fontSize="md">Tarefa</Table.ColumnHeader>
                            <Table.ColumnHeader fontSize="md">Prioridade</Table.ColumnHeader>
                            <Table.ColumnHeader fontSize="md" textAlign="end">Categoria</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    {/* Corpo da tabela onde ficam os dados */}
                    <Table.Body>
                        {dadosTarefas.map((e) => (
                            <Table.Row key={e.id}>
                                {/* Celula de cada linha */}
                                <Table.Cell>{e.tarefa}</Table.Cell>
                                <Table.Cell >{e.prioridade}</Table.Cell>
                                <Table.Cell textAlign="end">{e.categoria}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            )}
        </Box>


    )
}

export default SectionTarefas