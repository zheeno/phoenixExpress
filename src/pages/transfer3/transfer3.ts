import { Component } from '@angular/core';
import { /*IonicPage,*/ NavController, NavParams } from 'ionic-angular';
import { TransactionServiceProvider } from '../../providers/transaction-service/transaction-service';
import { OtherBeneficiariesPage } from '../other-beneficiaries/other-beneficiaries';

/**
 * Generated class for the Transfer3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-transfer3',
  templateUrl: 'transfer3.html',
})
export class Transfer3Page {

  bank = "";
  iban = "";
  swiftBIC = "";
  accName = "";
  amount:number = null;
  notes = "";
  saveBen = false ;

  benefs:any;
  wireStatus:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public transactService: TransactionServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Transfer3Page');
    let dataTemp = this.navParams.get("data");
    if(dataTemp != undefined){
      this.bank = dataTemp.bank;
      this.iban = dataTemp.iban;
      this.swiftBIC = dataTemp.swiftbic;
      this.accName = dataTemp.acc_name;
    }
  }

  wireOthBank(){
    let temp;
    if(this.saveBen == false){
      temp = "false";
    }else{
      temp = "true";
    }
    let intWire = {
    bank: this.bank,
    iban: this.iban,
    swiftBIC: this.swiftBIC,
    accName: this.accName,
    amount: this.amount,
    notes: this.notes,
    saveBen: temp, 
    token: this.transactService.account.token,
    }
    let loader = this.transactService.loadingCtrl.create({
      content: "Please wait..."
    });
    console.log(intWire);
    this.transactService.presentLoading("show",loader).then(()=>{      
      this.transactService.postData(intWire, "transferOthBnkNow")
      .then(result => {
          this.wireStatus = result;
          this.transactService.presentLoading("dismiss",loader);
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

  wireOthBankPrompt(){//
    let params:any = {
      title: "Do you wish to proceed with this transaction",
      buttons:[
        {
          text: 'Proceed',
          handler: () => {
            this.wireOthBank();
          }
        },{
          text: 'Cancel',
          role: 'cancel',
        }
    ]
    }
    //verify that the amount to be transfered is greater than 0
    if(this.notes.toString.length > 0 && this.amount > 0){
      this.transactService.presentActionSheet(params);
    }else{
      this.transactService.showAlert("Alert", "Please fill all required fields");
    }
  }

  beneficiaries(){//...check for beneficiaries for other banks
    let loader = this.transactService.loadingCtrl.create({
      content: "Please wait..."
    });
    this.transactService.presentLoading("show",loader).then(()=>{ 
      this.transactService.postData({"user_id": this.transactService.account.user_id}, "showOtheBenef")
      .then(result => {
        this.transactService.presentLoading("dismiss",loader);
          this.benefs = result;
          if(this.benefs.length == 0){
            this.transactService.showAlert("Info", "There are no beneficiaries associated with this account");
          }else{
            //navigate to beneficiaries page 
            console.log(this.benefs)
              this.navCtrl.push(OtherBeneficiariesPage, {"benefs": this.benefs});
          }
        }, (err) => {
        //alert error
        this.transactService.presentLoading("dismiss",loader);
        this.transactService.showAlert("Connection Error", "Please check your internet settings");
      })
    });
  }

  togBenSave(){
    if(this.saveBen == false){
      this.saveBen = true;
    }else{
      this.saveBen = false;
    }
  }
  
    goBack(){
      this.navCtrl.popToRoot();
    }

}
