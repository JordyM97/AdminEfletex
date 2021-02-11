import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MenuproveedorComponent} from './pages/menuproveedor/menuproveedor.component';
import {MenuusuarioComponent} from './pages/menuusuario/menuusuario.component';
import {EmpresaComponent} from './pages/empresa/empresa.component';
import { ChatComponent } from './pages/chat/chat.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import { ProvWebComponent } from './pages/prov-web/prov-web.component';
import { RegistroProvComponent } from './pages/registro-prov/registro-prov.component';
import { LoginComponent } from './pages/login/login.component';
import {FormservicioComponent} from './pages/formservicio/formservicio.component';
import {HistorialComponent} from './pages/historial/historial.component';
import {HistorialproveedorComponent} from './pages/historialproveedor/historialproveedor.component';
import {HistorialclienteComponent} from './pages/historialcliente/historialcliente.component';
import {HistorialservicioComponent} from './pages/historialservicio/historialservicio.component';
import {AdminComponent} from './pages/admin/admin.component';

//Guard para la pantalla de login en authentication
import { AuthGuard } from './guards/auth.guard';
//Guard para la pantalla de login en authentication
import { NotloginGuard } from './guards/notlogin.guard'
const routes: Routes = [
  {
    path: '',
    redirectTo: '/inicioProv',
    pathMatch: 'full',
    canActivate:[NotloginGuard],
    
  },
  {
    path:'proveedor',
    component:MenuproveedorComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'usuarios',
    component:MenuusuarioComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'empresa',
    component:EmpresaComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'chat',
    component:ChatComponent,
    canActivate: [AuthGuard]
  },
  {  
    path:'dashboard',
    component:DashboardComponent,
    canActivate: [AuthGuard]
  },
  {  
    path:'registroProv',
    component:RegistroProvComponent,
    
  },
  {  
    path:'inicioProv',
    component:ProvWebComponent,
    
  },
  {  
    path:'login',
    component:LoginComponent,
    canActivate:[NotloginGuard],
  },
    
  {
    path:'servicio',
    component:FormservicioComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'historial',
    component:HistorialComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'administrador',
    component:AdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'historialproveedor',
    component:HistorialproveedorComponent,
    canActivate: [AuthGuard]
    
  },
  {
    path:'historialcliente',
    component:HistorialclienteComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'historialservicio',
    component:HistorialservicioComponent,
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
