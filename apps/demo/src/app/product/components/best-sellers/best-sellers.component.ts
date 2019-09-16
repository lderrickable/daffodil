import { Component, OnInit } from '@angular/core';
import { DaffBestSellersFacade, DaffProduct, DaffBestSellersLoad } from '@daffodil/product';
import { Observable } from 'rxjs';

@Component({
  selector: 'demo-best-sellers',
  templateUrl: './best-sellers.component.html',
  styleUrls: ['./best-sellers.component.scss']
})
export class BestSellersComponent implements OnInit {
  loading$: Observable<boolean>;
  bestSellers$: Observable<DaffProduct[]>;

  constructor(private facade: DaffBestSellersFacade) { }

  ngOnInit() {
    this.facade.dispatch(new DaffBestSellersLoad());
    this.loading$ = this.facade.loading$;
    this.bestSellers$ = this.facade.bestSellers$;
  }
}
