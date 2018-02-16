import { Component } from '@angular/core';
import { /*IonicPage,*/ NavController, NavParams, AlertController } from 'ionic-angular';
import { TransactionServiceProvider } from '../../providers/transaction-service/transaction-service';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  bankingId: string;
  password: string;
  loginStatus:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, public transactService: TransactionServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    if(this.bankingId != undefined){
      if(this.password != undefined){
      let credentials = {
          "user_id": this.bankingId,
          "password": this.password
        };
        let loader = this.transactService.loadingCtrl.create({
          content: "Please wait..."
        });
        this.transactService.presentLoading("show",loader).then(()=>{
          this.transactService.postData(credentials, "login").then(result => {
              this.loginStatus = result;
              this.transactService.presentLoading("dismiss",loader);
              if(this.loginStatus.status == 0){
                this.transactService.showAlert("Alert", this.loginStatus.message);
              }else{
                this.transactService.setAccountBalance(this.loginStatus.acc_bal)                
                this.transactService.account = {
                  "user_id": this.loginStatus.user_id,
                  "token": this.loginStatus.token
                }
                localStorage.setItem("token", this.loginStatus.token);
                this.navCtrl.push(TabsPage);
              }
              localStorage.setItem("loginStatus", this.loginStatus.status);
            }, (err) => {
            this.transactService.presentLoading("dismiss",loader);
            this.transactService.showAlert("Connection Error", "Please check your internet settings");
          })
        })
    
      }else{
        this.transactService.showAlert("Alert", "Please enter your password");
      }
    }else{
      this.transactService.showAlert("Alert", "Please enter your Internet Banking ID");
    }
  }


}
