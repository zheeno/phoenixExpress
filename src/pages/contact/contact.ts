import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TransactionServiceProvider } from '../../providers/transaction-service/transaction-service'

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  
  myTransactions:any;
  account:any;

  constructor(public navCtrl: NavController, public transactService: TransactionServiceProvider) {
  }

 ngOnInit(){
  this.transactService.castAcc.subscribe(result => this.account = result);
  this.getAllTransactions();
  }
  
  //get most recent transactions //
  getAllTransactions(){
    let loader = this.transactService.loadingCtrl.create({
    content: "Please wait..."
    });
    this.transactService.presentLoading("show",loader).then(()=>{
      this.transactService.postData(this.account[0], "getAllTrans")
      .then(result => {
          this.transactService.presentLoading("dismiss",loader);
          this.myTransactions = result;
      }, (err) => {
        this.transactService.presentLoading("dismiss",loader);
        this.myTransactions.showAlert("Connection Error", "Please check your internet settings");
      })
    })
  }

}
