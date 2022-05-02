# Sistema de Gerenciamento de Eventos e Ingressos
O software de gerenciamento de eventos é um produto online que facilitará a criação de eventos e palestras, melhorando a organização para realizações de eventos. A finalidade deste sistema é simplificar o gerenciamento tanto para os responsáveis pelo evento, quanto para os palestrantes e clientes.

## Ferramentas necessárias
- nodeJS
- npm ou yarn para instalar as dependências do nodeJS (foi utilizado npm durante todo projeto e por isso ele será utilizado para o tutorial abaixo)

## Como executar
Após baixar o software
- instalar as dependências do node com "npm install"
- ao termino das instalações, executar o sistema com "npm run dev"
- o script "dev" utiliza o framework "concurrently" para executar simultaneamente o script de execução do sistema "start" e o script de execução do servidor da API "nodes". Caso algum problema ocorra com o script "dev" ou o "concurrently", será preciso executar os scripts "start" e "nodes" manualmente em diferentes terminais, ou seja, executar "npm run start" em um terminal e "npm run nodes" em outro.