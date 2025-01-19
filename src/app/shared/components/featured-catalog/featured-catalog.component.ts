import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Catalog } from '../../models/catalog.model';

@Component({
  selector: 'app-featured-catalog',
  templateUrl: './featured-catalog.component.html',
  styleUrls: ['./featured-catalog.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class FeaturedCatalogComponent {
  @Input() catalog!: Catalog;
} 