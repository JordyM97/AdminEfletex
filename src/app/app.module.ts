import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormproveedorComponent } from './pages/formproveedor/formproveedor.component';
import {FormservicioComponent} from './pages/formservicio/formservicio.component';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import {CdkStepperModule} from '@angular/cdk/stepper';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MenuComponent } from './pages/menu/menu.component';
import { MenuproveedorComponent } from './pages/menuproveedor/menuproveedor.component';
import {MatTabsModule} from '@angular/material/tabs';
import {HttpClientModule} from '@angular/common/http';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import{ProveedorService} from './services/proveedor.service';
import { MenuClienteComponent } from './pages/menuCliente/menuCliente.component';
import { EmpresaComponent } from './pages/empresa/empresa.component';
import {AngularFireStorageModule} from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { ChatComponent } from './pages/chat/chat.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthService } from '../app/services/auth.service';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {ShowHidePasswordModule} from 'ngx-show-hide-password';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {HistorialComponent} from './pages/historial/historial.component';
import {HistorialproveedorComponent} from './pages/historialproveedor/historialproveedor.component';
import {HistorialclienteComponent} from './pages/historialcliente/historialcliente.component';
import {HistorialservicioComponent} from './pages/historialservicio/historialservicio.component';
import { MapaComponent } from './pages/mapa/mapa.component';
import { ComentariosSugerenciasComponent } from './pages/comentarios-sugerencias/comentarios-sugerencias.component'
import { DetallesComentariosComponent } from './pages/detalles-comentarios/detalles-comentarios.component';
import { DetallesSugerenciasComponent } from './pages/detalles-sugerencias/detalles-sugerencias.component'
import { PeticionesComponent } from './pages/peticiones/peticiones.component';
import { NotificacionesComponent } from './pages/notificaciones/notificaciones.component';

import {ChatService} from './services/chat.service';
import { ProvWebComponent } from './pages/prov-web/prov-web.component';
import { RegistroProvComponent } from './pages/registro-prov/registro-prov.component';
import { FormtarifasComponent } from './pages/formtarifas/formtarifas.component';
import { FormeditservicioComponent } from './pages/formeditservicio/formeditservicio.component';
import { FormedittarifaComponent } from './pages/formedittarifa/formedittarifa.component';
import { FiltroservicioPipe } from './pipes/filtroservicio.pipe';
import { FiltroproveedorPipe } from './pipes/filtroproveedor.pipe';
import { FiltrotarifaPipe } from './pipes/filtrotarifa.pipe';
import { FiltrousuarioPipe } from './pipes/filtrousuario.pipe';
import { PoliticasComponent } from './modals/politicas/politicas.component';
import { AdminComponent } from './pages/admin/admin.component';
import { FormadminComponent } from './pages/formadmin/formadmin.component';
import { FormempresaComponent } from './pages/formempresa/formempresa.component';

import { HighchartsChartModule } from 'highcharts-angular';
import { AgmCoreModule } from '@agm/core';
import { NotificacionEnviadaComponent } from './pages/notificacion-enviada/notificacion-enviada.component';
import { FirstFormComponent } from './pages/first-form/first-form.component';
import { ModalEnvioExitosoComponent } from './pages/modal-envio-exitoso/modal-envio-exitoso.component';
import { ModalDetallesPreregistroComponent } from './pages/modal-detalles-preregistro/modal-detalles-preregistro.component';


@NgModule({
  declarations: [
    AppComponent,
    FormproveedorComponent,
    FormservicioComponent,
    MenuComponent,
    MenuproveedorComponent,
    MenuClienteComponent,
    EmpresaComponent,
    ChatComponent,
    LoginComponent,
    DashboardComponent,
    ProvWebComponent,
    RegistroProvComponent,
    FormtarifasComponent,
    FormeditservicioComponent,
    FormedittarifaComponent,
    FiltroservicioPipe,
    FiltroproveedorPipe,
    FiltrotarifaPipe,
    FiltrousuarioPipe,
    HistorialComponent,
    HistorialproveedorComponent,
    HistorialclienteComponent,
    HistorialservicioComponent,
    PoliticasComponent,
    AdminComponent,
    FormadminComponent,
    FormempresaComponent,
    MapaComponent,
    ComentariosSugerenciasComponent,
    DetallesComentariosComponent,
    DetallesSugerenciasComponent,
    PeticionesComponent,
    NotificacionesComponent,
    NotificacionEnviadaComponent,
    FirstFormComponent,
    ModalEnvioExitosoComponent,
    ModalDetallesPreregistroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    CdkStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatCardModule,
    HttpClientModule,
    MatSlideToggleModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    ShowHidePasswordModule ,
    MatListModule,
    MatGridListModule,
    MatSidenavModule,
    MatCheckboxModule,
    HighchartsChartModule,
    MatFormFieldModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD1yk1QZHkYQWxO-JZ5idDHcfHpkKzf0tg'
    })
  ],
  providers: [ProveedorService,AuthService, ChatService, MenuComponent],
  entryComponents:[MatDialogModule,MatSelectModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}
