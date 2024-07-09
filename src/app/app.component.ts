import { Component } from '@angular/core';
import { HttpClientModule} from "@angular/common/http";
import { CurrancyRatesHttpService } from './currancy-rates.http.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [CurrancyRatesHttpService]
})
export class AppComponent {
  constructor(private httpService: CurrancyRatesHttpService){
  }
  ngOnInit(){
    
    this.httpService.getCurrencyRates().subscribe({next:(data:any) => {
        
    }
    });
   
}
    
}

