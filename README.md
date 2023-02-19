**RF** => Requisitos funcionais 

**RNF** => Requisitos não funcionais

**RN** => Regra de negócio

# Cadastro de carro 

**RF** 
Deve ser possivel cadastrar um novo carro

**RN**
Não deve ser possivel cadastrar um carro com placa já existente.
Não deve ser possivel alterar a placa de um carro já cadastrado.
O carro deve ser cadastrado por padrão com disponibilidade = true.
*Apenas um usuario ADMINISTRADOR pode cadastrar novos veiculos.

# Listagem de carros

**RF**
Deve ser possivel listar todos os carros que estivem disponíveis

**RN**
O usuário não precisa estar logado no sistema.
Deve ser possivel listar todos os carros disponiveis por categoria
Deve ser possivel listar todos os carros disponiveis por nome do carro
Deve ser possivel listar todos os carros disponiveis por marca

# Cadastro de Especificação no carro

**RF**
Deve ser possivel cadastrar uma especificação para um carro.

**RN**
Não deve ser possivel cadastrar uma especificação para um carro não cadastrado.
Não deve ser possivel cadastrar uma especificação já existente para o mesmo carro.
Apenas um usuario ADMINISTRADOR pode cadastrar novos veiculos.


# Cadastro de imagem do carro

**RF**
Deve ser possivel cadastrar a imagem do carro

**RNF**
utilizar o multer para upload dos arquivos

**RN**
O usuario deve poder cadastrar mais de uma imagem para o mesmo carro
O usuario responsável pelo cadastro deve ser um usuario administrador

# Aluguel de carro

**RF**

Deve ser possivel cadastrar um aluguel

**RNF**

**RN**
O aluguel deve ter duracao minima de 24 horas
Não deve ser possivel cadastrar um novo aluguel caso já exista um aberto para o mesmo carro



