import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { ApiClient } from '../api/api-client';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonDto } from '../api/button-dto';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductModalComponent } from './product-modal/product-modal.component';
import { NgStyle } from '@angular/common';
import { InvertHexColorPipe } from '../pipes/invert-hex-color.pipe';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgStyle, InvertHexColorPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  private readonly apiClient = inject(ApiClient);
  private readonly destroyRef = inject(DestroyRef);
  private readonly toastrService = inject(ToastrService);
  private readonly ngbModal = inject(NgbModal);

  buttons: ButtonDto[] = [];

  ngOnInit(): void {
    this.apiClient
      .getButtonData()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (buttons) =>
          (this.buttons = buttons.concat(buttons).concat(buttons)),
        error: (error) => this.toastrService.error(error),
      });
  }

  onProductClick(productId: string): void {
    const ngbModalRef = this.ngbModal.open(ProductModalComponent, {
      backdropClass: 'product-modal-backdrop',
      windowClass: 'product-modal-window',
      centered: true,
      size: 'sm',
    });

    ngbModalRef.componentInstance.productId = productId;
  }
}
