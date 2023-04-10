import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface ISavePDF{
  title:string,
  id:string
}

@Injectable({
  providedIn: 'root'
})

export class SavePdfService {

  constructor() { }
  save(dataPDF:ISavePDF): void {
    const {id,title} =dataPDF
    let DATA: any = document.getElementById(id);
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FileURL = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FileURL, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save(`${title}.pdf`);
    });
  }
}
