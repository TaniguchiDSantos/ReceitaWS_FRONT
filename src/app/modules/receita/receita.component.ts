import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BasePageComponent } from 'src/app/base-page.component';
import { Receita } from './models/receita.model';
import { ReceitaService } from './services/receita.service';

@Component({
  selector: 'app-receita',
  templateUrl: './receita.component.html',
  styleUrls: ['./receita.component.css']
})
export class ReceitaComponent extends BasePageComponent {

  public pedidos: Receita[] = [];
  public searchTerm: string = '';
  public cnpj: string = '';
  public result: any;

  constructor(
    public override toastr: ToastrService,
    public override router: Router,
    private fb: FormBuilder,
    public route: ActivatedRoute,
    public service: ReceitaService
  ) {
    super(toastr, router);

  }

  override ngOnInit(): void {
    this.getAll();
  }

  searchCNPJ() {
    if(this.validarCNPJ()){
      this.startLoading();
      var cnpj = this.cnpj.replace(/[^a-zA-Z0-9 ]/g, '');
      this.service.searchCNPJ(cnpj)
      .subscribe(
        {
          next: (cnpjResult: any) => {
            this.getAll();
            this.stopLoading();
          },
          error: (fail: any) => {
            this.toastr.error(`CNPJ Não Encontrado`, '');
            this.stopLoading();
          }
        }
      );
    }
    else{
      this.toastr.error(`CNPJ Inválido`, '');
      this.cnpj = "";
    }
  }

  getAll() {
    this.startLoading();
    this.service.getAll()
    .subscribe(
      {
        next: (pedidosResult: any) => {
          this.pedidos = pedidosResult;
          this.stopLoading();
        },
        error: (fail: any) => {
          this.onError(fail);
        }
      }
    );
  }

  validarCNPJ():boolean {

    var cnpj = this.cnpj.replace(/[^\d]+/g, '');

    if (cnpj == '') return false;

    if (cnpj.length != 14)
      return false;

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
      cnpj == "11111111111111" ||
      cnpj == "22222222222222" ||
      cnpj == "33333333333333" ||
      cnpj == "44444444444444" ||
      cnpj == "55555555555555" ||
      cnpj == "66666666666666" ||
      cnpj == "77777777777777" ||
      cnpj == "88888888888888" ||
      cnpj == "99999999999999")
      return false;

    // Valida DVs
    var tamanho = cnpj.length - 2
    var numeros: any = cnpj.substring(0, tamanho);
    var digitos: any = cnpj.substring(tamanho);
    var soma = 0;
    var pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
        pos = 9;
    }
    var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
      return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
        pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
      return false;

    return true;
  }

}

