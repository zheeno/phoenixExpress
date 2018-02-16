import { Component } from '@angular/core';
import { /*IonicPage,*/ NavController, NavParams } from 'ionic-angular';
import { TransactionServiceProvider } from '../../providers/transaction-service/transaction-service'
/**
 * 
 * Generated class for the Transfer2_1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-transfer2-1',
  templateUrl: 'transfer2-1.html',
})
export class Transfer2_1Page {
  data: any;
  wireStatus: any;
  recId:any;
  wire = {
    amount: null,
    notes: "",
    token: this.transactService.account.token,
    saveBen: false
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public transactService: TransactionServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Transfer2_1Page');
    this.data = this.navParams.get("data");
    if(this.data != undefined){
      this.recId = this.data[0].id;
    }
  }

  wireSmBankPrompt(){
    let params:any = {
      title: "Do you wish to proceed with this transaction",
      buttons:[
        {
          text: 'Proceed',
          handler: () => {
            this.wireSameBank();
          }
        },{
          text: 'Cancel',
          role: 'cancel',
        }
    ]
    }
    //verify that the amount to be transfered is greater than 0
    if(this.wire.amount > 0 && this.wire.notes.toString.length > 0){
      this.transactService.presentActionSheet(params);
    }else{
      this.transactService.showAlert("Alert", "Please fill out all required fields");
    }
  }

  wireSameBank(){
    let temp;
    if(this.wire.saveBen == false){
      temp = "false";
    }else{
      temp = "true";
    }
    let wireParams = {
      id: this.recId,
      amount: this.wire.amount,
      notes: this.wire.notes,
      token: this.wire.token,
      saveBen: temp
    }
    let loader = this.transactService.loadingCtrl.create({
      content: "Please wait..."
    });
    console.log(wireParams); //
    this.transactService.presentLoading("show",loader).then(()=>{
      this.transactService.postData(wireParams, "transferSmBnkNow")
      .then(result => {
          this.transactService.presentLoading("dismiss",loader);
          this.wireStatus = result;
          if(this.wireStatus.length == 0){
            this.transactService.showAlert("Alert", "Error encountered");
          }
          else if(this.wireStatus.status == "404" || this.wireStatus.status == "405"){
            this.transactService.showAlert("Alert", this.wireStatus.Description);
          }
          else if(this.wireStatus.status == "200"){
            this.transactService.showAlert("Success", this.wireStatus.Description);
            this.transactService.setAccountBalance(this.wireStatus.balance);
            this.transactService.getRecentTransactions();
            setTimeout(()=>{
              this.goBack();
            },3000);
          }
      }, (err) => {
        //alert error
        this.transactService.presentLoading("dismiss",loader);
        this.transactService.showAlert("Connection Error", "Please check your internet settings");
      })
    })
  }
  
  togBenSave(){//
    if(this.wire.saveBen == false){
      this.wire.saveBen = true;
    }else{
      this.wire.saveBen = false;
    }
  }

  goBack(){
    this.navCtrl.popToRoot();
    let inputs = document.getElementsByTagName("ion-input");
    console.log(inputs.length);
  }

}
