
import { Component, ChangeDetectorRef } from '@angular/core';
import { ApiService, Projekt } from '../../services/api';

@Component({
  selector: 'app-projekte-liste',
  templateUrl: './projekte-liste.page.html',
  styleUrls: ['./projekte-liste.page.scss'],
  standalone: false
})
export class ProjekteListePage {
  projekte: Projekt[] = [];
  loading = false;
  fehler = '';

  constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ionViewWillEnter() {
    this.ladeProjekte();
  }

  ladeProjekte() {
    this.loading = true;
    this.fehler = '';

    this.api.getProjekte().subscribe({
      next: (daten) => {
        this.projekte = daten;
        this.loading = false;

        // Angular-Oberfläche aktualisieren
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Fehler beim Laden:', err);
        this.fehler = 'Projekte konnten nicht geladen werden.';
        this.loading = false;

        this.cdr.detectChanges();
      }
    });
  }
}
