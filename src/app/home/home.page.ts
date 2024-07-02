import { Component, inject } from '@angular/core';
import {DocumentViewer, DocumentViewerOptions} from '@awesome-cordova-plugins/document-viewer/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { Platform, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private alertController = inject(AlertController);
  private documentViewer = inject(DocumentViewer);
  private file = inject(File);
  private platform = inject(Platform);
  constructor(
  ) {}

  async ngOnInit() {
    const info = await this.documentViewer.getSupportInfo();
    console.log("ngOnInit ngOnInit", info);
      const alert = await this.alertController.create({
        header: 'Document Viewer Info',
        message: JSON.stringify(info),
      });
  
      await alert.present();
  }

  canViewDocument() {
    const options: DocumentViewerOptions = {
      title: 'Adrian Avila Atencio – Medium'
    };

    const filePath = this.file.applicationDirectory + 'public/assets/adrian_avila_atencio_medium.pdf';
    this.documentViewer.canViewDocument(filePath, 'application/pdf', options, async () => {
      const alert = await this.alertController.create({
        header: 'Document Viewer',
        message: "Can be opened",
      });
      await alert.present();
    }, undefined, () => {
      console.log("Can't be opened!!");
    });
  }
  openDocument() {
    this.platform.ready().then(() => {
      const options: DocumentViewerOptions = {
        title: 'Adrian Avila Atencio – Medium',
        search: {enabled: true},
        bookmarks: {enabled: true},
        documentView: {closeLabel: "x"},
        print: {enabled: true},
        openWith: {enabled: true}

      };
  
      const filePath = this.file.applicationDirectory + 'public/assets/adrian_avila_atencio_medium.pdf';
      this.documentViewer.viewDocument(filePath, 'application/pdf', options);
  });
  
  }
   
}
