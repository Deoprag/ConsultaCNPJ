import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Consulta} from "../model/consulta";
import { MessageService } from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  url1: string = 'https://publica.cnpj.ws/cnpj/';
  url2: string = 'https://www.receitaws.com.br/v1/cnpj/';

  constructor(private http: HttpClient) {}

  async consultar(cnpj: string, messageService: MessageService): Promise<Consulta> {
    return await this.http.get(`${this.url1 + cnpj}`).toPromise()
      .then((data: any) => {
        let consulta = new Consulta();
        consulta.cnpj = cnpj;
        consulta.razao_social = data.razao_social;
        consulta.nome_fantasia = data.estabelecimento.nome_fantasia;
        consulta.tipo = data.estabelecimento.tipo;
        consulta.atividade_principal = data.estabelecimento.atividade_principal.descricao;
        consulta.atividades_secundarias = data.estabelecimento.atividades_secundarias.map((atividade: any) => '' + atividade.descricao);
        consulta.endereco = `${data.estabelecimento.tipo_logradouro} ${data.estabelecimento.logradouro}, N° ${data.estabelecimento.numero}, ${data.estabelecimento.bairro}, ${data.estabelecimento.cidade.nome} - ${data.estabelecimento.estado.nome}, CEP: ${data.estabelecimento.cep}`;
        consulta.telefone = `${data.estabelecimento.ddd1 != null ? data.estabelecimento.ddd1 : null}${data.estabelecimento.telefone1 != null ? data.estabelecimento.telefone1 : ''}`;
        consulta.email = data.estabelecimento.email;
        consulta.situacao = data.estabelecimento.situacao_cadastral;
        consulta.data_situacao = data.estabelecimento.data_situacao_cadastral;
        consulta.data_abertura = data.estabelecimento.data_inicio_atividade;
        consulta.porte = `${data.porte.descricao} - ${data.natureza_juridica.descricao}`;
        consulta.ultima_atualizacao = data.atualizado_em;
        return consulta;
      }).catch(error => {
        if (error.status === 404) {
          messageService.add({ severity: 'error', summary: 'ERRO...', detail: 'CNPJ Não encontrado!' });
        } else if (error.status === 429) {
          messageService.add({ severity: 'warn', summary: 'OPS...', detail: 'Aguarde para realizar uma nova consulta!' });
        } else if (error.status === 504) {
          messageService.add({ severity: 'error', summary: 'ERRO...', detail: 'Serviço indisponível no momento!' });
        } else {
          // return this.consultar2(cnpj, messageService);
        }
        throw error;
      });
  }

  async consultar2(cnpj: string, messageService: MessageService): Promise<Consulta> {
    return await this.http.get(`${this.url2 + cnpj}`).toPromise()
      .then((data: any) => {
        let consulta = new Consulta();
        consulta.cnpj = cnpj;
        consulta.razao_social = data.nome;
        consulta.nome_fantasia = data.fantasia;
        consulta.tipo = data.tipo;
        consulta.atividade_principal = data.atividade_principal.text;
        consulta.atividades_secundarias = data.atividades_secundarias.map((atividade: any) => '' + atividade.text);
        consulta.endereco = `${data.logradouro}, N° ${data.numero}, ${data.bairro}, ${data.cep} - ${data.municipio} - ${data.uf}`;
        consulta.telefone = data.telefone;
        consulta.email = data.email;
        consulta.situacao = data.situacao;
        consulta.data_situacao = data.data_situacao;
        consulta.data_abertura = data.abertura;
        consulta.porte = data.porte;
        consulta.ultima_atualizacao = data.ultima_atualizacao;
        return consulta;
      }).catch(error => {
        if (error.status === 429) {
          messageService.add({ severity: 'warn', summary: 'OPS...', detail: 'Aguarde para realizar uma nova consulta!' });
        } else if (error.status === 504) {
          messageService.add({ severity: 'error', summary: 'ERRO...', detail: 'Serviço indisponível no momento!' });
        }
        throw error;
      });
  }
}
