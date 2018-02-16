import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicPageModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { Transfer2Page } from '../pages/transfer2/transfer2';
import { Transfer3Page } from '../pages/transfer3/transfer3';
import { Transfer2_1Page } from '../pages/transfer2-1/transfer2-1';
import { BeneficiariesPage } from '../pages/beneficiaries/beneficiaries';
import { OtherBeneficiariesPage } from '../pages/other-beneficiaries/other-beneficiaries';
import { TabsPage } from '../pages/tabs/tabs';

import { TransactionServiceProvider } from '../providers/transaction-service/transaction-service';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    Transfer2Page,
    Transfer3Page,
    Transfer2_1Page,
    BeneficiariesPage,
    OtherBeneficiariesPage,
    TabsPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicPageModule.forChild(BeneficiariesPage),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    Transfer2Page,
    Transfer3Page,
    Transfer2_1Page,
    BeneficiariesPage,
    OtherBeneficiariesPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TransactionServiceProvider
  ]
})
export class AppModule {}
