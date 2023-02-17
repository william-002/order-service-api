import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { Router } from '@angular/router';
import { OS } from 'src/app/models/os';
import { ClienteService } from 'src/app/services/cliente.service';
import { OsService } from 'src/app/services/os.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-os-closed',
  templateUrl: './os-closed.component.html',
  styleUrls: ['./os-closed.component.css']
})
export class OsClosedComponent implements AfterViewInit {
  
  osList: OS[] = [];

  displayedColumns: string[] = ['tecnico', 'cliente', 'abertura', 'fechamento', 'prioridade', 'status', 'action'];
  dataSource = new MatTableDataSource<OS>(this.osList);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private service: OsService, private router: Router,
     private tecnicoService: TecnicoService, private clienteService: ClienteService){}
 

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel="Ordens por página";
    this.findAll();
  }

  findAll():void{
    this.service.findAll().subscribe((resposta) =>{
      resposta.forEach(x => {
        if(x.status == "ENCERRADO"){
          this.osList.push(x)
        }
      })

      this.listarTecnico();
      this.listarCliente();
      this.dataSource = new MatTableDataSource<OS>(this.osList);
      this.dataSource.paginator = this.paginator;
    })
  }

listarTecnico(): void{
  this.osList.forEach(x => {
    this.tecnicoService.findById(x.tecnico).subscribe(resposta => {
      x.tecnico = resposta.nome;
    })
  })
}

listarCliente(): void {
  this.osList.forEach(x => {
    this.clienteService.findById(x.cliente).subscribe(resposta => {
      x.cliente = resposta.nome;
    })
  })
}

 prioridade(x: any){
   if(x == 'BAIXA'){
     return 'baixa'
   } else if(x == 'MEDIA'){
     return 'media'
   }else {
     return 'alta'
   }
 }

 

}


