import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { AlertController, Platform } from '@ionic/angular';
 
export interface AppUpdate {
  current: string;
  enabled: boolean;
  msg?: {
    title: string;
    msg: string;
    btn: string;
  };
  majorMsg?: {
    title: string;
    msg: string;
    btn: string;
  };
  minorMsg?: {
    title: string;
    msg: string;
    btn: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  updateExample = 'https://devdactic.fra1.digitaloceanspaces.com/tutorial/version.json';
  maintenanceExample = 'http://devdactic.fra1.digitaloceanspaces.com/tutorial/maintenance.json';

  constructor(
    private http: HttpClient,
    private alertCtrl: AlertController,
    private alertController: AlertController,
    private appVersion: AppVersion,
    // private iab: InAppBrowser,
    private platform: Platform
  ) {
  }

  checkForUpdate() {

    console.log('%%%%%', )
    this.http.get(this.updateExample)
      .subscribe(async (info: AppUpdate) => {
        console.log('result: ', JSON.stringify(info));

        // this.presentAlert2();
  
        if (!info.enabled) {
          console.log('###0', )
          this.presentAlert(
            info.msg.title,
            info.msg.msg,
            info.msg.btn
          );

        } else {
          console.log('###1', )

          // android build.gradle
          // not working on web environment
          this.appVersion.getVersionNumber()
            .then(e => {
              const splittedVersion = e.split('.');
    
              const serverVersion = info.current.split('.');
    
              console.log('splittedVersion', splittedVersion);
              console.log('serverVersion', serverVersion);
    
              if (serverVersion[0] > splittedVersion[0]) {
                this.presentAlert(
                  info.majorMsg.title,
                  info.majorMsg.msg,
                  info.majorMsg.btn
                );
              } else if ((serverVersion[1] > splittedVersion[1])) {
                this.presentAlert(
                  info.minorMsg.title,
                  info.minorMsg.msg,
                  info.minorMsg.btn,
                  true
                );
              }
              
            })
        }

      })
  }

  openAppstoreEntry() {
    console.log('OPEN ME', );
    if (this.platform.is('android')) {
      // NativeMarket.openStoreListing({
      //   appId: 'com.devdatuc.igcompanion',
      // })
      window.open('android');
    } {
      window.open('iOS');
      // this.iab.create('itms-apps://itunes.apple.com/app/id1469563885', '_blank');
    }
  }

  async presentAlert2() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
    // const { role } = await alert.onDidDismiss();
    // console.log('onDidDismiss resolved with role', role);
  }

  async presentAlert(header, message, buttonText = '', allowClose = false) {

    const buttons: any = [];

    if (buttonText != '') {
      buttons.push({
        text: 'buttonText',
        handler: () => {
          this.openAppstoreEntry();
        },
        role: 'cancel'
      });
    }

    if (allowClose) {
      buttons.push({
        text: 'Close',
        role: 'cancel'
      });
    }
   
    const alert = await this.alertCtrl
      .create({
        header,
        message,
        buttons: buttons,
        backdropDismiss: allowClose
      })
      // .then(alertEl => {
      //   alertEl.present();
      // });
      await alert.prepend();

      // const alert = await this.alertCtrl.create({
      //     header,
      //     message,
      //     buttons: [buttons],
      //     backdropDismiss: allowClose
      // )

      // console.log('alert: ', alert)

      // await alert.prepend();
  }
}
