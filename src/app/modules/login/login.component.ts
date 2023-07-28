import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './services/login.service';
import { User } from './models/user.models';
import { BasePageComponent } from 'src/app/base-page.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BasePageComponent {

  public form: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  public habilitarLoginFake: boolean = false;

  constructor(
    public override toastr: ToastrService,
    public override router: Router,
    private fb: FormBuilder,
    public route: ActivatedRoute,
    public service: LoginService
  )
  {
    super(toastr, router);

  }

  override ngOnInit(): void 
  {
    this.stopLoading();
  }

  montarObjeto() {
    const obj: User = Object.assign(
      {},
      this.form.value
    );

    return obj;
  }

  public login() {
    this.startLoading();
    this.service.verifyLogin(this.montarObjeto())
      .subscribe(
        {
          next: (token: any) => {
            if (token){
              this.toastr.success(`Logado Com Sucesso`, '');
              localStorage.setItem("token", token.token);
              this.acessar();
            }
          },
          error: (fail: any) => {
            this.onError(fail);
          }
        }
      );
  }

  private acessar() {
    window.location.replace('/receita');
  }
}
