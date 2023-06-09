import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { IEnsayos } from '@app/models/Ensayos.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SavePdfService {
  loading$ = new BehaviorSubject<boolean>(false);

  constructor () { }
  // loading:boolean=false
  async save(project: IEnsayos): Promise<void> {
    this.loading$.next(true);
    const idT = 'pdfEnsayo';
    const title = `${project.title.split(',')[0].split(' ').join('-').toLocaleLowerCase()}.pdf`;
    const pdf = new jsPDF('p', 'mm', 'a4', true);
    let pageCount = 1;
    try {
      for (const [indexSondeo, sondeo] of project.sondeos.entries()) {
        for (let indexMuestra = 0; indexMuestra < sondeo.muestras.length; indexMuestra++) {
          const Granulometria = sondeo.muestras[indexMuestra].ensayoGranulometria.data?.grava;
          const ensayoLiquido = sondeo.muestras[indexMuestra].ensayoLiquido?.limiteLiquido;
          const ensayoPlastico = sondeo.muestras[indexMuestra].ensayoPlastico?.primera?.Humidity;

          if (Granulometria && ensayoLiquido && ensayoPlastico) {
            const id = `${idT}-${indexSondeo}${indexMuestra}`;
            const elementToExport = document.getElementById(id) as HTMLElement;
            const canvas = await html2canvas(elementToExport);
            const image = new Image();
            const saveImagePromise = new Promise<void>((resolve, reject) => {
              image.onload = () => {
                pdf.addImage(image, 'PNG', 5, 12,200, 270);
                pdf.addPage();
                pageCount++;
                resolve();
              };
              image.onerror = reject;
              image.src = canvas.toDataURL('image/png');
            });

            await saveImagePromise;
          }
        }
      }
      pdf.deletePage(pageCount);
      pdf.save(title);
      this.loading$.next(false);
    } catch (error) {
      console.error('Error al guardar el archivo PDF:', error);
      this.loading$.next(false);
    }
  }

}
