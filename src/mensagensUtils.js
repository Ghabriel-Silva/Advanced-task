import { toaster } from "@/components/ui/toaster";
import { createToaster } from "@chakra-ui/react";


export function  mensagemSucesso(mensagem){



    toaster.create({
        title: mensagem || "Tarefa adicionada com sucesso!", 
        type: "success",
    
        
    })
    console.log("função funcionando sucesso")
}

export function mensagemAviso(mensagem){
    toaster.create({
        title: mensagem || "Por Favor preencha todos os campos!",
        type:"warning",
        max: true,
    })
    console.log("função funcionando")
}