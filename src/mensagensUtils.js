import { toaster } from "@/components/ui/toaster";



export function mensagemSucesso(mensagem) {
    toaster.create({
        title: mensagem || "Tarefa adicionada com sucesso!",
        type: "success",
        duration: 2000,

    })
}

export function mensagemAviso(mensagem) {
    toaster.create({
        title: mensagem || "Por Favor preencha todos os campos!",
        type: "info",
        duration: 2000,

    })
}

export function mensagemDelete(mensagem, index, onConfirm) {
    toaster.create({
        title: mensagem || `Tem certeza que quer deletar a tarefa ${index + 1} ?`,
        type: "warning",
        duration: 4000,
        action: {
            label: "Sim",
            onClick: () => {
                onConfirm()
            },
        }
    })
}