import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { LoadingController, AlertController, ActionSheetController } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';


let apiUrl = "http://192.168.178.20/phoenixExpress/app/api/"; //http://www.phoenixexpress.org/app/api/
@Injectable()
export class TransactionServiceProvider {

  private myAccBalance  = new BehaviorSubject<string>(""); //for storing the user's account balance
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
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });

    this.presentLoading("show",loader).then(()=>{
      this.postData(this.account, "getAcc")
      .then(result => {
        this.presentLoading("dismiss",loader);
        this.myAccount.next(result);
          this.getAccountBalance();        
      }, (err) => {
        this.presentLoading("dismiss",loader);
        this.showAlert("Connection Error", "Please check your internet settings");
      })
    })
  }

  //get account balance
  getAccountBalance(){
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });

    this.presentLoading("show",loader).then(()=>{
      this.postData(this.account, "getAccBal").then(result => {
        this.presentLoading("dismiss",loader);
        this.myBalance = result;
        this.myAccBalance.next(this.myBalance.balance);
        this.getRecentTransactions();
      }, (err) => {
        this.presentLoading("dismiss",loader);
        this.showAlert("Connection Error", "Please check your internet settings");
      })
    })
  }
  //get most recent transactions
  getRecentTransactions(){
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });

    this.presentLoading("show",loader).then(()=>{
      this.postData(this.account, "getTrans")
      .then(result => {
        this.presentLoading("dismiss",loader);
        this.transactions.next(result);
        }, (err) => {
        this.presentLoading("dismiss",loader);
        this.showAlert("Connection Error", "Please check your internet settings");
      })
    })
  }

  postData(content, command){
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
  presentLoading(action, loader_name) {
    if(action == "show"){
      return loader_name.present();
    }else{
      return loader_name.dismiss();
    }
  }

    presentActionSheet(params) {
      let actionSheet = this.actionSheetCtrl.create({
        title: params.title,
        buttons: params.buttons
      });
      actionSheet.present();
    }
}
