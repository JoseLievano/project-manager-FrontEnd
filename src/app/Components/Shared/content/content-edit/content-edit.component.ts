import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../../../Model/Shared/category";
import {CatContent} from "../../../../Model/Shared/cat-content";
import {ModelService} from "../../../../Service/Shared/model.service";
import {ActivatedRoute} from "@angular/router";
import {EditorService} from "../../../../Service/Shared/editor.service";
import {BusinessService} from "../../../../Service/Business/business.service";
import {AlertService} from "../../../../Service/Shared/alert.service";
import {UiMessage} from "../../../../Model/Shared/ui-message";
import {messageType} from "../../../../Constant/messageType";

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

  private contentChanged : boolean = false;

  private editorID : number;

  public titleForm = new FormGroup({
    title : new FormControl('', {validators: [Validators.required, Validators.minLength(5)]})
  });

  constructor(
    private activatedRoute : ActivatedRoute,
    private editorService: EditorService,
    private businessService : BusinessService,
    private alertService : AlertService) {
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
        console.log(this.contentModel);
        this.categoryModel = this.categoryModelService.createInstance(response.category);
        this.contentDataLoaded = true;
      }
    })
  }

  public checkIfContentHasBeenModified(state : boolean){
    this.contentChanged = state;
  }

  public validToSave() : boolean{
    return this.titleForm.valid || this.contentChanged;
  }

  public changeEditorID(id : number){
    this.editorID = id;
  }

  public saveChanges(){
    this.editorService.saveContent(this.editorID)
      .then(data => {

        if (this.titleForm.value.title)
          this.contentModel.title = this.titleForm.value.title;

        this.contentModel.content = JSON.stringify(data);

        if (this.categoryModel.id)
          this.contentModel.category = this.categoryModel.id;

        this.contentModel.business = this.businessService.getLoadedBusiness();

        this.updateContent();
      })
  }

  private updateContent(){
    if (this.contentModel.id)
      this.contentModelService.updateOne(this.contentModel.id, this.contentModel).subscribe({
        next : (response : C) => {
          this.alertService.addNewAlert(new UiMessage(response.title + " has been updated", messageType.SUCCESS))
        }
      })
  }

}
