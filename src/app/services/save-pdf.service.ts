import { Injectable } from '@angular/core';
import  jsPDF from 'jspdf';
import  html2canvas from 'html2canvas';

export interface ISavePDF {
  title: string,
  id: string
}

@Injectable({
  providedIn: 'root'
})

export class SavePdfService {

  constructor () {
   }
  save(dataPDF: ISavePDF): void {
    const { id, title } = dataPDF
    const PDF = new jsPDF('p', 'mm', 'a4',true);
    let position = 0;

    for (let i = 1; i <=5; i++) {
  const DATA: any = document.getElementById(`${id}-${i}`);
  html2canvas(DATA).then((canvas) => {
    const fileWidth = 208;
    const fileHeight = (canvas.height * fileWidth) / canvas.width;
    const FileURL = canvas.toDataURL('image/png');
    PDF.addImage(FileURL, 'PNG', 0, position, fileWidth, fileHeight);
  });
}
  PDF.save(`${title}.pdf`);
}
}
