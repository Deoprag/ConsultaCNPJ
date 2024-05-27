import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {InputMaskModule} from "primeng/inputmask";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ConsultaService} from "./service/consultaService";
import {HttpClientModule} from "@angular/common/http";
import {ToastModule} from 'primeng/toast';
import {MessageService} from "primeng/api";
import {provideAnimations} from "@angular/platform-browser/animations";
import {DialogModule} from "primeng/dialog";
import {Consulta} from "./model/consulta";
import {DividerModule} from "primeng/divider";

@Component({
  selector: 'main-component',
  standalone: true,
  imports: [
    FormsModule,
    InputMaskModule,
    ButtonModule,
    RippleModule,
    HttpClientModule,
    ToastModule,
    DialogModule,
    DividerModule
  ],
  template: `
    <p-toast/>
    <div class="flex justify-content-center">
      <p-dialog header="Dados do CPNJ" [modal]="true" [(visible)]="visible" [style]="{ width: '35rem', padding: '2rem', background: 'white'}">
        <div class="flex align-items-center gap-3 m-3">
          <label for="cnpj" class="font-semibold w-9rem">CNPJ</label>
          <label id="cnpj" class="text-md w-full">{{ consulta.cnpj }}</label>
        </div>
        <p-divider></p-divider>
        <div class="flex align-items-center gap-3 m-3">
          <label for="razao_social" class="font-semibold w-9rem">Razão Social</label>
          <label id="razao_social" class="text-md w-full">{{ consulta.razao_social }}</label>
        </div>
        <p-divider></p-divider>
        <div class="flex align-items-center gap-3 m-3">
          <label for="nome_fantasia" class="font-semibold w-9rem">Nome Fantasia</label>
          <label id="nome_fantasia" class="text-md w-full">{{ consulta.nome_fantasia }}</label>
        </div>
        <p-divider></p-divider>
        <div class="flex align-items-center gap-3 m-3">
          <label for="situacao" class="font-semibold w-9rem">Situação</label>
          <label id="situacao" class="text-md w-full">{{ consulta.situacao }}</label>
        </div>
        <p-divider></p-divider>
        <div class="flex align-items-center gap-3 m-3">
          <label for="data_situacao" class="font-semibold w-9rem">Data Situação</label>
          <label id="data_situacao" class="text-md w-full">{{ formatDate(consulta.data_situacao) }}</label>
        </div>
        <p-divider></p-divider>
        <div class="flex align-items-center gap-3 m-3">
          <label for="telefone" class="font-semibold w-9rem">Telefone</label>
          <label id="telefone" class="text-md w-full">{{ formatNumber(consulta.telefone) }}</label>
        </div>
        <p-divider></p-divider>
        <div class="flex align-items-center gap-3 m-3">
          <label for="telefone" class="font-semibold w-9rem">Email</label>
          <label id="telefone" class="text-md w-full">{{ consulta.email }}</label>
        </div>
        <p-divider></p-divider>
        <div class="flex align-items-center gap-3 m-3">
          <label for="porte" class="font-semibold w-9rem">Porte</label>
          <label id="porte" class="text-md w-full">{{ consulta.porte }}</label>
        </div>
        <p-divider></p-divider>
        <div class="flex align-items-center gap-3 m-3">
          <label for="tipo" class="font-semibold w-9rem">Tipo</label>
          <label id="tipo" class="text-md w-full">{{ consulta.tipo }}</label>
        </div>
        <p-divider></p-divider>
        <div class="flex align-items-center gap-3 m-3">
          <label for="atividade_principal" class="font-semibold w-9rem">Atividade Principal</label>
          <label id="atividade_principal" class="text-md w-full">{{ consulta.atividade_principal }}</label>
        </div>
        <p-divider></p-divider>
        <div class="flex align-items-center gap-3 m-3">
          <label for="atividades_secundarias" class="font-semibold w-9rem">Atividades Secundárias</label>
          <label id="atividades_secundarias" class="text-md w-full">{{ consulta.atividades_secundarias }}</label>
        </div>
        <p-divider></p-divider>
        <div class="flex align-items-center gap-3 m-3">
          <label for="endereco" class="font-semibold w-9rem">Endereço</label>
          <label id="endereco" class="text-md w-full">{{ consulta.endereco }}</label>
        </div>
        <p-divider></p-divider>
        <div class="flex align-items-center gap-3 m-3">
          <label for="data_abertura" class="font-semibold w-9rem">Data de Abertura</label>
          <label id="data_abertura" class="text-md w-full">{{ formatDate(consulta.data_abertura) }}</label>
        </div>
        <p-divider></p-divider>
        <div class="flex align-items-center gap-3 m-3">
          <label for="ultima_atualizacao" class="font-semibold w-9rem">Última Atualização</label>
          <label id="ultima_atualizacao" class="text-md w-full">{{ formatDateTime(consulta.ultima_atualizacao) }}</label>
        </div>
      </p-dialog>
      <div class="flex flex-column gap-5 text-white bg-black-alpha-60 border-3 w-4 p-5 text-center border-round-lg">
        <div>
          <label class="text-7xl font-bold text-pink-500" for="cnpj">Consultar CNPJ</label>
        </div>
        <div class="flex flex-column">
          <p-inputMask
            mask="99.999.999/9999-99"
            id="cnpj"
            aria-describedby="cnpj-help"
            [(ngModel)]="cnpj"
            [style]="{
              'max-width':'80%',
              'min-height':'45px',
              'font-size':'24px',
              'text-align':'center',
              'color':'#f542ad',
              'font-weight':'bold'}">
          </p-inputMask>
          <small class="text-2xl mt-2 font-bold" id="cnpj-help" [style]="{'color':'#f542ad'}">
            Insira o CNPJ da empresa
          </small>
        </div>
        <div class="card flex justify-content-center">
          <p-button
            pRipple
            label="Consultar"
            icon="pi pi-search"
            [loading]="loading"
            (onClick)="load()"
            [raised]="true"
            [style]="{
              'font-family':'Smooch Sans',
              'font-size':'24px',
              'min-width':'140px',
              'min-height':'30px',
              'padding':'12px',
              'display':'flex',
              'justify-content':'around'}"/>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.css'],
  providers: [MessageService, ConsultaService, provideAnimations()],
})

export class AppComponent {
  cnpj: string = '';
  loading: boolean = false;
  visible: boolean = false;
  consulta: Consulta = new Consulta();

  constructor(private messageService: MessageService, private consultaService: ConsultaService) {}

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'ERRO...', detail: message });
  }

  showWarning(message: string) {
    this.messageService.add({ severity: 'warn', summary: 'OPS...', detail: message });
  }

  showDialog() {
    this.visible = true;
  }

  async load() {
    this.cnpj = this.cnpj.replace(/[^\d]/g, ''); // Remove caracteres não numéricos

    this.loading = true;
    if (this.validateCnpj(this.cnpj)) {
      try {
        this.consulta = await this.consultaService.consultar(this.cnpj);
        this.showDialog();
        this.loading = false;
      } catch (error) {
        this.showWarning('Aguarde 1 minuto para consultar novamente');
        this.loading = false;
      }
    } else {
      this.showError('CNPJ inválido.');
      this.loading = false;
    }
  }

  validateCnpj(cnpj: string) {

    if (cnpj.length !== 14) {
      return false;
    }

    if (/^([0-9])\1*$/.test(cnpj)) {
      return false;
    }

    const weights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const digits = cnpj.split('').map(Number);

    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += digits[i] * weights[i];
    }
    let mod = sum % 11;
    let digit1 = mod < 2 ? 0 : 11 - mod;

    weights.unshift(6);
    sum = 0;
    for (let i = 0; i < 13; i++) {
      sum += digits[i] * weights[i];
    }
    mod = sum % 11;
    let digit2 = mod < 2 ? 0 : 11 - mod;

    return digits[12] === digit1 && digits[13] === digit2;
  }

  formatDateTime(dateString: string): string {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  formatDate(data: string): string {
    const partes = data.split('-');
    const ano = partes[0];
    const mes = partes[1];
    const dia = partes[2];

    return `${dia}/${mes}/${ano}`;
  }

  formatNumber(phone: string): string {
    const digitos = phone.replace(/\D/g, '');

    if (digitos.length === 11) {
      return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7)}`;
    } else {
      return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 6)}-${digitos.slice(6)}`;
    }
  }
}
