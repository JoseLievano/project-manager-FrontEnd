import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../../../Model/Shared/category";
import {CatContent} from "../../../../Model/Shared/cat-content";
import {ModelService} from "../../../../Service/Shared/model.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-content-edit',
  templateUrl: './content-edit.component.html',
  styleUrls: ['./content-edit.component.css']
})
export class ContentEditComponent<T extends Category<T>, C extends CatContent<T>> implements OnInit{

  @Input() categoryModel : T;

  @Input() categoryModelService : ModelService<T>;

  @Input() contentModel : C;

  @Input() contentModelService : ModelService<C>;

  public id : number;

  public contentDataLoaded : boolean = false;

  public titleForm = new FormGroup({
    title : new FormControl('', {validators: [Validators.required, Validators.minLength(5)]})
  });

  constructor(private activatedRoute : ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        this.id = params['id'];
        if (this.id > 0){
          this.loadContentWithID();
        }
      }
    );
  }

  private loadContentWithID(){
    this.contentModelService.getOne<C>(this.id).subscribe({
      next : (response : C) => {
        this.contentModel = response;
        this.categoryModel = this.categoryModelService.createInstance(response.category);
        this.contentDataLoaded = true;
      }
    })
  }

}
