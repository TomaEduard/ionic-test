import { AppUpdate, UpdateService } from './update.service';
import { Component } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { AlertController, Platform } from '@ionic/angular';
// import { AndroidManifest } from 'app\src\main\AndroidManifest.xml'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  updateExample = 'https://devdactic.fra1.digitaloceanspaces.com/tutorial/version.json';
  maintenanceExample = 'http://devdactic.fra1.digitaloceanspaces.com/tutorial/maintenance.json';

  async presentAlert2(versionNumber: string, ultimaVersiune: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: `Versiunea aplicatiei este ${versionNumber} si ultima versiune este ${ultimaVersiune}`,
      buttons: ['OK'],
      backdropDismiss: ultimaVersiune === '0' ? true : false
    });

    await alert.present();
    // const { role } = await alert.onDidDismiss();
    // console.log('onDidDismiss resolved with role', role);
  }

  constructor(
    private appVersion: AppVersion,
    private platform: Platform,
    private http: HttpClient,
    private updateService: UpdateService,
    private alertController: AlertController,
  ) {

    console.log('#1 app.componnet', )

    this.http.get(this.updateExample)
      .subscribe(async (info: AppUpdate) => {
        
        console.log('result: ', JSON.stringify(info));

        // functioneaza doar in mediu mobile
        if (this.platform.is('hybrid')) {
          this.updateService.checkForUpdate();
    

          // alert window
          // var newLine = "\r\n"
      
          // let getAppName: string
          // let getPackageName: string
          // let getVersionCode: string
          // let getVersionNumber: string
      
          // this.appVersion.getAppName()
          //   .then(e => {
          //     getAppName = JSON.stringify(e);
      
          //     this.appVersion.getPackageName()
          //       .then(e => {
          //         getPackageName = JSON.stringify(e);
          
          //         this.appVersion.getVersionCode()
          //           .then(e => {
          //             getVersionCode = JSON.stringify(e);
              
          //             this.appVersion.getVersionNumber()
          //               .then(e => {
          //                 getVersionNumber = JSON.stringify(e);
      
          //                 window.alert(
          //                   `
          //                     AppName:${getAppName}${newLine} 
          //                     PackageName:${getPackageName}${newLine}
          //                     VersionCode:${getVersionCode}${newLine}
          //                     VersionNumber:${getVersionNumber}${newLine}${newLine}${newLine}
          //                     Ultima versiune: ${info.current ? info.current : '∞'}
          //                   `
          //                 )
          //               })
          //           })
          //       })
          //   })
        }
      })

  }

}
