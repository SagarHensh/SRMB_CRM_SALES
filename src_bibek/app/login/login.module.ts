import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotifierModule, NotifierOptions} from 'angular-notifier';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';


const notifierDefaultOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12,
    },
    vertical: {
      position: 'top',
      distance: 12,
      gap: 10,
    },
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: false,
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4,
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease',
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50,
    },
    shift: {
      speed: 300,
      easing: 'ease',
    },
    overlap: 150,
  },
};

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    NotifierModule.withConfig(notifierDefaultOptions),
    ReactiveFormsModule,
    FormsModule,
    

  ]
})
export class LoginModule {
}
