import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

  tecnico: Tecnico = {
    id: '',
    nome:'',
    cpf: '',
    telefone: ''
  }

  nome = new UntypedFormControl('',[Validators.minLength(2)])
  cpf = new UntypedFormControl('',[Validators.minLength(11)])
  telefone = new UntypedFormControl('',[Validators.minLength(11)])

  constructor(private router: Router, private service: TecnicoService) { }

  ngOnInit(): void {
  }

  cancel():void{
    this.router.navigate(['tecnicos'])
  }

  create():void{
    this.service.create(this.tecnico).subscribe((resposta) => {
      this.router.navigate(['tecnicos'])
      this.service.message('Técnico criado com sucesso!')
    }, err =>{
        
      if(err.error.error.match('já cadastrado')){
      this.service.message(err.error.error)
      }else if(err.error.errors[0].message === 'número do registro de contribuinte individual brasileiro (CPF) inválido'){
        this.service.message("CPF inválido")
        //this.service.message(err.error.error)
      }
    })

    
  }

  errorValidName(){
    if(this.nome.invalid ){
      return 'O campo nome deve ter entre 2 e 100 caracteres ';
    }
    return false;
  }
  errorValidCPF(){
    if(this.cpf.invalid ){
      return 'O campo cpf deve ter entre 11 e 15 caracteres ';
    }
    return false;
  }
  errorValidPhone(){
    if(this.telefone.invalid ){
      return 'O campo telefone deve ter entre 11 e 18 caracteres';
    }
    return false;
  }

  buttonDisabled(){
    if(this.errorValidName() || this.errorValidCPF() || this.errorValidPhone()){
      return true
    }
    return false;
  }
}
