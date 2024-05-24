export class Consulta {                       //  CNPJ.ws                         //  ReceitaWS
  cnpj?: string;                              //                                  //
  razao_social?: string;                      //  razao_social                    //  nome
  nome_fantasia?: string;                     //  nome_fantasia                   //  fantasia
  tipo?: string;                              //  tipo                            //  tipo
  atividade_principal?: string;               //  atividade_principal.descricao   //  atividade_principal.text
  atividades_secundarias?: string[];          //  atividade_secundaria.descricao  //  atividade_secundaria.text
  cep?: string;                               //  cep                             //  cep
  endereco?: string;                          //  tipo_logradouro + logradouro    //  logradouro + numero + bairro
                                              //  + numero + bairro + cep         //  + cep + municipio + uf
                                              //  + cidade.nome + estado.nome     //
  telefone?: string;                          //  telefone1 e telefone2           //  telefone
  email?: string;                             //  email                           //  email
  situacao?: string;                          //  situacao_cadastral              //  situacao
  data_situacao?: string;                     //  data_situacao_cadastral         //  data_situacao
  data_abertura?: string;                     //  data_inicio_atividade           //  abertura
  porte?: string;                             //  porte.descricao                 //  porte
  ultima_atualizacao?: string;                //  atualizado_em                   //  ultima_atualizacao
}
