import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {InputMaskModule} from "primeng/inputmask";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";

@Component({
  selector: 'main-component',
  standalone: true,
  imports: [
    FormsModule,
    InputMaskModule,
    ButtonModule,
    RippleModule
  ],
  template: `
    <div class="flex justify-content-center">
      <div class="flex flex-column gap-5 text-white bg-black-alpha-60 w-4 p-5 text-center border-round-lg">
        <div>
          <label class="text-7xl font-bold text-green-300" for="cnpj">Consultar CNPJ</label>
        </div>
        <div class="flex flex-column">
          <p-inputMask
            mask="99.999.999/9999-99"
            id="cnpj"
            aria-describedby="cnpj-help"
            [(ngModel)]="cnpj"
            [style]="{'min-width':'200px', 'min-height':'45px', 'font-size':'24px', 'text-align':'center'}">
          </p-inputMask>
          <small class="text-2xl mt-2" id="cnpj-help">
            Insira o CNPJ da empresa
          </small>
        </div>
        <div class="card flex justify-content-center">
          <p-button
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
})
export class AppComponent {
  cnpj: string = '';
  loading: boolean = false;

  load() {
    this.loading = true;
    this.searchCnpj(this.cnpj);
  }

  searchCnpj(cnpj: string) {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }
}
