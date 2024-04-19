import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
import { ApiClient } from '../../api/api-client';
import { ProductDto } from '../../api/product-dto';
import {
  NgbActiveModal,
  NgbCarouselConfig,
  NgbCarouselModule,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [NgbCarouselModule],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss',
  providers: [NgbCarouselConfig],
})
export class ProductModalComponent implements OnInit {
  private readonly apiClient = inject(ApiClient);
  private readonly destroyRef = inject(DestroyRef);
  private readonly toastrService = inject(ToastrService);
  private readonly ngbActiveModal = inject(NgbActiveModal);
  private readonly ngbCarouselConfig = inject(NgbCarouselConfig);

  @Input() productId!: string;

  product: ProductDto | undefined = undefined;

  constructor() {
    this.ngbCarouselConfig.showNavigationIndicators = false;
  }

  ngOnInit(): void {
    this.apiClient
      .getProduct(this.productId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (product) => (this.product = product),
        error: (error) => this.toastrService.error(error),
      });
  }

  onCloseClick(): void {
    this.ngbActiveModal.dismiss();
  }
}
