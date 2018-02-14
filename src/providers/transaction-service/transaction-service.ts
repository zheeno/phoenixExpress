import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { LoadingController, AlertController, ActionSheetController } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';


let apiUrl = "http://192.168.43.1/phoenixExpress/app/api/"; //http://www.phoenixexpress.org/app/api/
@Injectable()
export class TransactionServiceProvider {

  private myAccBalance  = new BehaviorSubject<string>("0.00"); //for storing the user's account balance
  castBal = this.myAccBalance.asObservable();

  private myAccount = new BehaviorSubject<any>(""); //for storing the user's accout info
  castAcc = this.myAccount.asObservable();

  private transactions = new BehaviorSubject<any>(""); //for storing the user's transaction history
  castTransact = this.transactions.asObservable();

  
  account: any;
  myBalance: any;
  verified: any;
  constructor(
     public loadingCtrl: LoadingController,
     public http: Http,
     public actionSheetCtrl: ActionSheetController,
     public alertCtrl: AlertController
    ) {
    console.log('Hello TransactionServiceProvider is connected');
  }

  setAccountBalance(bal){
    this.myAccBalance.next(bal)
  }

  //get account details
  getAccountData(){
    this.postData(this.account, "getAcc")
    .then(result => {
        this.myAccount.next(result);
        this.getAccountBalance();        
    }, (err) => {
      this.showAlert("Connection Error", "Please check your internet settings");
    })
  }

  //get account balance
  getAccountBalance(){
    this.postData(this.account, "getAccBal")
    .then(result => {
        this.myBalance = result;
        this.myAccBalance.next(this.myBalance.balance);
        this.getRecentTransactions();
    }, (err) => {
      this.showAlert("Connection Error", "Please check your internet settings");
    })
  }
  //get most recent transactions
  getRecentTransactions(){
    this.postData(this.account, "getTrans")
    .then(result => {
        this.transactions.next(result);
    }, (err) => {
      this.showAlert("Connection Error", "Please check your internet settings");
    })
  }

  postData(content, command){
    this.presentLoading("show");
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      this.http.post(apiUrl+command, JSON.stringify(content), { headers: headers })
      .subscribe(res => {
        resolve(res.json())
      }, (err) => {
        reject(err)
      })
    })
  }
    
  showAlert(header, content) {
    let alert = this.alertCtrl.create({
      title: header,
      subTitle: content,
      buttons: ['OK']
    });
    alert.present();
  }

  presentLoading(action) {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000,
      showBackdrop: false,
      cssClass: "bg-grey-light see-through"
    });
    loader.present();
  }

    presentActionSheet(params) {
      let actionSheet = this.actionSheetCtrl.create({
        title: params.title,
        buttons: params.buttons
      });
      actionSheet.present();
    }
}
