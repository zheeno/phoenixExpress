import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

import { TransactionServiceProvider } from '../../providers/transaction-service/transaction-service'
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(public transactService: TransactionServiceProvider, public navCtrl: NavController) {

  }

  Logout(val){
    console.log(val);
    if(val == 0){
      let params:any = {
        title: "Do you wish to log out?",
        buttons:[
          {
            text: 'Yes',
            handler: () => {
              this.Logout(1);
            }
          },{
            text: 'No',
            role: 'cancel',
          }
      ]
      }
      this.transactService.presentActionSheet(params);
      }else if(val == 1){
        this.navCtrl.popTo(LoginPage);
        localStorage.clear();
      }

    }
  
}
