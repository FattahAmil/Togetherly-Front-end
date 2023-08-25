import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from "./component/login-page/login-page.component";
import { RegisterPageComponent } from "./component/register-page/register-page.component";
import { IndexPageComponent } from "./component/index-page/index-page.component";
import { AuthGuard } from "./guard/auth-guard.guard";
import { Auth2Guard } from "./guard/auth2.guard";

const routes: Routes = [
  { path: 'login', component: LoginPageComponent,canActivate: [Auth2Guard]  },
  { path: 'register', component: RegisterPageComponent,canActivate: [Auth2Guard] },
  { path: 'index', component: IndexPageComponent,canActivate: [AuthGuard] },
  {path:'',redirectTo:'login',pathMatch:'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
