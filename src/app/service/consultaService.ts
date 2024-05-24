import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Consulta} from "../model/consulta";

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  url1: string = 'https://publica.cnpj.ws/cnpj/';
  url2: string = 'https://www.receitaws.com.br/v1/cnpj/';

  constructor(private http: HttpClient) {}

  consultar(cnpj: string): Consulta {
    this.http.get(`${this.url1 + cnpj}`).subscribe((data: any) => {
        let consulta = new Consulta();
        console.log(data)
        consulta.cnpj = cnpj;
        consulta.razao_social = data.razao_social;
        consulta.nome_fantasia = data.nome_fantasia;
        consulta.tipo = data.tipo;
        // consulta.atividade_principal = data.atividade_principal.descricao;
        // consulta.atividades_secundarias = data.atividades_secundarias.map((atividade: any) => atividade.descricao);
        consulta.cep = data.cep;
        consulta.endereco = `${data.tipo_logradouro} ${data.logradouro}, N° ${data.numero}, ${data.bairro}, ${data.cidade.nome} - ${data.estado.nome}, CEP: ${data.cep}`;
        consulta.telefone = `${data.telefone1} / ${data.telefone2 === '' ? '-' : data.telefone2}`;
        consulta.email = data.email;
        consulta.situacao = data.situacao_cadastral;
        consulta.data_situacao = data.data_situacao_cadastral;
        consulta.data_abertura = data.data_inicio_atividade;
        consulta.porte = data.porte.descricao;
        consulta.ultima_atualizacao = data.atualizado_em;
        return consulta;
      },
      error => {
        if (error.status === 429) {
          this.http.get(`${this.url2 + cnpj}`).subscribe((data: any) => {
              let consulta = new Consulta();
              console.log(data)
              consulta.cnpj = cnpj;
              // consulta.razao_social = data.nome;
              consulta.nome_fantasia = data.fantasia;
              consulta.tipo = data.tipo;
              consulta.atividade_principal = data.atividade_principal.text;
              consulta.atividades_secundarias = data.atividades_secundarias.map((atividade: any) => atividade.text);
              consulta.cep = data.cep;
              consulta.endereco = `${data.logradouro}, N° ${data.numero}, ${data.bairro}, ${data.municipio} - ${data.uf}, CEP: ${data.cep}`;
              consulta.telefone = data.telefone;
              consulta.email = data.email;
              consulta.situacao = data.situacao;
              consulta.data_situacao = data.data_situacao;
              consulta.data_abertura = data.abertura;
              consulta.porte = data.porte;
              consulta.ultima_atualizacao = data.ultima_atualizacao;
              return consulta;
            },
            error => {
              if (error.status === 429) {
                return alert('Aguarde para realizar uma nova consulta.');
              } else if (error.status === 504) {
                return alert('Serviço indisponível no momento.');
              }
            });
        }
      });
    return new Consulta();
  }
}
