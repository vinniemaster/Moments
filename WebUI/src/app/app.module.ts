import { EnvironmentInjector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http'
import { ModulesService } from './services/modules.service';
import { AboutComponent } from './components/about/about.component';
import { HomerComponent } from './components/homer/homer.component';
import { SetupComponent } from './components/setup/setup.component';
import { NewMomentComponent } from './components/new-moment/new-moment.component';
import { MomentFormComponent } from './components/moment-form/moment-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MessagesComponent } from './components/messages/messages.component';
import { MomentComponent } from './components/moment/moment.component';
import { EditMomentComponent } from './components/edit-moment/edit-moment.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    HomerComponent,
    SetupComponent,
    NewMomentComponent,
    MomentFormComponent,
    MessagesComponent,
    MomentComponent,
    EditMomentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule {


 }
