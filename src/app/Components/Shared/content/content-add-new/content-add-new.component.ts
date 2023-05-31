import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from "../../../../Service/Shared/category.service";
import {Category} from "../../../../Model/Shared/category";
import {CatContent} from "../../../../Model/Shared/cat-content";
import {ModelService} from "../../../../Service/Shared/model.service";

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

  public category : Category<T>

  constructor(
    private categoryService : CategoryService
  ) { }

  ngOnInit(): void {

    const actualCatID = this.categoryService.getParentCategory();

    this.categoryModelService.getOne<T>(actualCatID).subscribe({
      next : (response : T) => {
        this.category = this.categoryModelService.createInstance(response);
        console.log(this.category);
      }
    })

  }

}
