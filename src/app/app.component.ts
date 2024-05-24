import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {InputMaskModule} from "primeng/inputmask";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ConsultaService} from "./service/consultaService";
import {HttpClientModule} from "@angular/common/http";
import {Consulta} from "./model/consulta";

@Component({
  selector: 'main-component',
  standalone: true,
  imports: [
    FormsModule,
    InputMaskModule,
    ButtonModule,
    RippleModule,
    HttpClientModule
  ],
  template: `
    <div class="flex justify-content-center">
      <div class="flex flex-column gap-5 text-white bg-pink-800 border-3 w-4 p-5 text-center border-round-lg">
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
  providers: [ConsultaService]
})
export class AppComponent {
  cnpj: string = '';
  loading: boolean = false;

  constructor(private consultaService: ConsultaService) {}

  load() {
    this.cnpj = this.cnpj.replace(/[^\d]/g, ''); // Remove caracteres não numéricos

    this.loading = true;
    if(this.validateCnpj(this.cnpj)) {
      this.searchCnpj(this.cnpj);
    } else {
      this.loading = false;
    }
  }

  searchCnpj(cnpj: string): Promise<Consulta> {
    return new Promise((resolve, reject) => {
      let consulta: Consulta = this.consultaService.consultar(cnpj);
      if (consulta.cnpj !== '') {
        resolve(consulta);
      } else {
        reject('Não foi possível obter os dados do CNPJ.');
      }
    });
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
}
