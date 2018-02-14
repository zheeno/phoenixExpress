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
    console.log(this.account);
    this.transactService.postData(this.account[0], "getAllTrans")
    .then(result => {
        this.myTransactions = result;
    }, (err) => {
      this.myTransactions.showAlert("Connection Error", "Please check your internet settings");
    })
  }

}
