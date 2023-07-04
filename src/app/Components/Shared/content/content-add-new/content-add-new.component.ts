import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from "../../../../Service/Shared/category.service";
import {Category} from "../../../../Model/Shared/category";
import {CatContent} from "../../../../Model/Shared/cat-content";
import {ModelService} from "../../../../Service/Shared/model.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EditorService} from "../../../../Service/Shared/editor.service";
import {AlertService} from "../../../../Service/Shared/alert.service";
import {UiMessage} from "../../../../Model/Shared/ui-message";
import {messageType} from "../../../../Constant/messageType";
import {Router} from "@angular/router";

@Component({
  selector: 'app-content-add-new',
  templateUrl: './content-add-new.component.html',
  styleUrls: ['./content-add-new.component.css']
})
export class ContentAddNewComponent<T extends Category<T>, C extends CatContent<T>> implements OnInit {

  @Input() categoryModel : T;

  @Input() categoryModelService : ModelService<T>;

  @Input() contentModel : C;

  @Input() contentModelService : ModelService<C>;

  public category : Category<T>;

  private editorID : number;

  public categoryLoaded : boolean = false;

  public titleForm = new FormGroup({
    title : new FormControl('' , {validators : [Validators.required, Validators.minLength(5)]})
  })

  constructor(
    private categoryService : CategoryService,
    private editorService : EditorService,
    private alertService : AlertService,
    private router : Router
  ) { }

  ngOnInit(): void {

    const actualCatID = this.categoryService.getParentCategory();

    this.categoryModelService.getOne<T>(actualCatID).subscribe({
      next : (response : T) => {
        this.category = this.categoryModelService.createInstance(response);
        this.categoryLoaded = true;
      }
    })

  }

  public saveContentButton(){

    this.editorService.saveContent(this.editorID).
      then(data => {
        if (this.titleForm.value.title && this.category.id){
          this.contentModel.title = this.titleForm.value.title;
          this.contentModel.category = this.category.id;
        }
        this.contentModel.content = JSON.stringify(data);
        this.createNewContent();

      })
      .catch(err => console.log(err));

  }

  public changeEditorID(id : number){
    this.editorID = id;
  }

  private createNewContent(){
    let newContent = this.contentModelService.createNew<C>(this.contentModel).subscribe({
      next : (response : C)=> {
        this.alertService.addNewAlert(
          new UiMessage(`New Document added successfully: ${response.title}`, messageType.SUCCESS )
        )


        const url = this.router.url.replace('new', 'edit/') + response.id;
        this.router.navigateByUrl(url);

      },
      complete : () => {
        newContent.unsubscribe();
      }
    })
  }

}
