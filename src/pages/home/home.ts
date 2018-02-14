import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TransactionServiceProvider } from '../../providers/transaction-service/transaction-service'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  account = {
    "user_id": "1",
    "name": "",
    "balance": 0,
    "number": "",
    "username": "zino",
    "password": "godisgood",
    "token": "kjcncjndwnkh23kjnj823ukjnwkjdwn3943jn"
  }
  myAccount: any;
  myBalance: any;
  transactions: any;

  constructor(public navCtrl: NavController, public transactService: TransactionServiceProvider) {

  }

  ngOnInit(){
    this.transactService.getAccountData();
    this.transactService.castBal.subscribe(myAccBalance => this.myBalance = myAccBalance);
    this.transactService.castAcc.subscribe(myAccount => this.myAccount = myAccount);//subscribe to myAccount
    this.transactService.castTransact.subscribe(transactions => this.transactions = transactions);//subscribe to transactions
  }

  getRecentTransactions(){
    this.transactService.getAccountBalance();//this is called first so as to update all account data variables
  }
}


