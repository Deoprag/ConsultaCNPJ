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
import {NgForOf} from "@angular/common";

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
    DividerModule,
    NgForOf
  ],
  template: `
    <p-toast/>
    <div class="flex justify-content-center">
      <p-dialog header="Dados do CPNJ" [modal]="true" [(visible)]="visible" [style]="{
      width: '400px',
      padding: '2rem',
      background: 'white'}">
        <div class="flex align-items-center gap-2 mt-3 mb-3 flex-wrap">
          <label for="cnpj" class="font-semibold">CNPJ</label>
          <label id="cnpj" class="text-md w-full">{{ formatCNPJ(consulta.cnpj) }}</label>
        </div>
        <p-divider></p-divider>
        <div class="flex align-items-center gap-2 mt-3 mb-3 flex-wrap">
          <label for="razao_social" class="font-semibold">Razão Social</label>
          <label id="razao_social" class="text-md w-full">{{ consulta.razao_social }}</label>
        </div>
        <p-divider></p-divider>
        <div class="flex align-items-center gap-2 mt-3 mb-3 flex-wrap">
          <label for="nome_fantasia" class="font-semibold">Nome Fantasia</label>
          <label id="nome_fantasia" class="text-md w-full">{{ (consulta.nome_fantasia == null ? '-' : consulta.nome_fantasia) }}</label>
        </div>
        <p-divider></p-divider>
        <div class="flex align-items-center gap-2 mt-3 mb-3 flex-wrap">
          <label for="situacao" class="font-semibold">Situação</label>
          <label id="situacao" class="text-md w-full">{{ consulta.situacao }}</label>
        </div>
        <p-divider></p-divider>
        <div class="flex align-items-center gap-2 mt-3 mb-3 flex-wrap">
          <label for="data_situacao" class="font-semibold">Data Situação</label>
          <label id="data_situacao" class="text-md w-full">{{ formatDate(consulta.data_situacao) }}</label>
        </div>
        <p-divider></p-divider>
        <div class="flex align-items-center gap-2 mt-3 mb-3 flex-wrap">
          <label for="telefone" class="font-semibold">Telefone</label>
          <label id="telefone" class="text-md w-full">{{ (consulta.telefone.length < 9 ? '-' : formatNumber(consulta.telefone)) }}</label>
        </div>
        <p-divider></p-divider>
        <div class="flex align-items-center gap-2 mt-3 mb-3 flex-wrap">
          <label for="email" class="font-semibold">Email</label>
          <label id="email" class="text-md w-full">{{ consulta.email == null ? '-' : consulta.email }}</label>
        </div>
        <p-divider></p-divider>
        <div class="flex align-items-center gap-2 mt-3 mb-3 flex-wrap">
          <label for="porte" class="font-semibold">Porte</label>
          <label id="porte" class="text-md w-full">{{ consulta.porte }}</label>
        </div>
        <p-divider></p-divider>
        <div class="flex align-items-center gap-2 mt-3 mb-3 flex-wrap">
          <label for="tipo" class="font-semibold">Tipo</label>
          <label id="tipo" class="text-md w-full">{{ consulta.tipo }}</label>
        </div>
        <p-divider></p-divider>
        <div class="flex align-items-center gap-2 mt-3 mb-3 flex-wrap">
          <label for="atividade_principal" class="font-semibold">Atividade Principal</label>
          <label id="atividade_principal" class="text-md w-full">{{ consulta.atividade_principal }}</label>
        </div>
        <p-divider></p-divider>
        <div class="flex align-items-center gap-2 mt-3 mb-3 flex-wrap">
          <label for="atividades_secundarias" class="font-semibold">Atividades Secundárias</label>
          <ul id="atividades_secundarias" class="text-md w-full">
            <li class="mt-2" *ngFor="let atividade of consulta.atividades_secundarias">
              <i class="pi pi-angle-right"></i>
              {{ atividade + ';' }}
            </li>
          </ul>
        </div>
        <p-divider></p-divider>
        <div class="flex align-items-center gap-2 mt-3 mb-3 flex-wrap">
          <label for="endereco" class="font-semibold">Endereço</label>
          <label id="endereco" class="text-md w-full">{{ consulta.endereco }}</label>
        </div>
        <p-divider></p-divider>
        <div class="flex align-items-center gap-2 mt-3 mb-3 flex-wrap">
          <label for="data_abertura" class="font-semibold">Data de Abertura</label>
          <label id="data_abertura" class="text-md w-full">{{ formatDate(consulta.data_abertura) }}</label>
        </div>
        <p-divider></p-divider>
        <div class="flex align-items-center gap-2 mt-3 mb-3 flex-wrap">
          <label for="ultima_atualizacao" class="font-semibold">Última Atualização</label>
          <label id="ultima_atualizacao" class="text-md w-full">{{ formatDateTime(consulta.ultima_atualizacao) }}</label>
        </div>
      </p-dialog>
      <div class="flex flex-column gap-5 text-white bg-white-alpha-70 border-1 p-5 text-center border-round-lg">
        <div>
          <label class="text-7xl font-bold text-pink-500" for="cnpj">Consultar CNPJ</label>
        </div>
        <div class="flex flex-column">
          <p-inputMask
            mask="99.999.999/9999-99"
            id="cnpj"
            type="text"
            aria-describedby="cnpj-help"
            [(ngModel)]="cnpj"
            [style]="{
              'max-width':'80%',
              'min-height':'45px',
              'font-size':'20px',
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
  backgrounds: string[] = ['../assets/barbie-fairy.jpg', '../assets/barbie-princess-power.jpg', '../assets/barbie-secret-door.jpg', '../assets/barbie-three-musketeers.jpg',  '../assets/barbie-magic-pegasus.jpg',  '../assets/barbie-diamond-castle.jpg', '../assets/barbie.jpg', '../assets/barbie-swan-lake.jpg'];
  i: number = 0;

  constructor(private messageService: MessageService, private consultaService: ConsultaService) {
    this.startAnimation();
  }

  startAnimation() {
    setInterval(() => {
      if (this.i === this.backgrounds.length) {
        this.i = 0
      }
      this.changeBackground(this.backgrounds[this.i]);
      this.i++;
    }, 10 * 1000);
  }

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
    if (this.cnpj.length < 13) {
      this.showWarning('Preencha o campo inteiro.');
      this.loading = false;
    } else if (this.validateCnpj(this.cnpj)) {
      try {
        this.consulta = await this.consultaService.consultar(this.cnpj, this.messageService);
        this.showDialog();
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    } else {
      this.showError('CNPJ inválido.');
      this.loading = false;
    }
  }

  changeBackground(background: string) {
    document.body.style.background = `#f542ad url(${background})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.transition = '3.0s ease-in-out';
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
    const digitos = phone.replace(/\D/g, ''); // Remove qualquer caracter que não seja um dígito

    if (digitos.length === 12) {
      return `(${digitos.slice(0, 3)}) ${digitos.slice(3, 8)}-${digitos.slice(8)}`;

    } else if (digitos.length === 11) {
      if (digitos.charAt(0) === '0') {
        return `(${digitos.slice(0, 3)}) ${digitos.slice(3, 7)}-${digitos.slice(7)}`;

      } else {
        return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7)}`;

      }
    } else if (digitos.length === 10) {
      if (digitos.charAt(0) === '0') {
        return `(${digitos.slice(0, 3)}) ${digitos.slice(3, 7)}-${digitos.slice(7)}`;
      } else {
        return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 6)}-${digitos.slice(6)}`;
      }

    } else {
      return phone;
    }
  }

  formatCNPJ(cnpj: string): string {
    cnpj = cnpj.replace(/\D/g, '');

    return cnpj.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      '$1.$2.$3/$4-$5'
    );
  }
}
