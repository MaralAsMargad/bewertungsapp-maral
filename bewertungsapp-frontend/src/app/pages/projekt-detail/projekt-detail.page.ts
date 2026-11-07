
import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, Projekt } from '../../services/api';

@Component({
  selector: 'app-projekt-detail',
  templateUrl: './projekt-detail.page.html',
  styleUrls: ['./projekt-detail.page.scss'],
  standalone: false
})
export class ProjektDetailPage {
  projekt?: Projekt;
  loading = false;
  fehler = '';

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ionViewWillEnter() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isInteger(id) || id <= 0) {
      this.fehler = 'Ungültige Projekt-ID.';
      this.cdr.detectChanges();
      return;
    }

    this.ladeProjekt(id);
  }

  ladeProjekt(id: number) {
    this.loading = true;
    this.fehler = '';
    this.projekt = undefined;

    this.api.getProjekt(id).subscribe({
      next: (daten) => {
        this.projekt = daten;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Fehler beim Laden des Projekts:', err);
        this.fehler = 'Projekt konnte nicht geladen werden.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
