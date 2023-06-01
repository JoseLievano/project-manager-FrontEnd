import {Component, Input, OnInit} from '@angular/core';
import {Category} from "../../../Model/Shared/category";
import {ModelService} from "../../../Service/Shared/model.service";
import {CategoryService} from "../../../Service/Shared/category.service";

@Component({
  selector: 'app-category-add-new',
  templateUrl: './category-add-new.component.html',
  styleUrls: ['./category-add-new.component.css']
})
export class CategoryAddNewComponent<T extends Category<T>> implements OnInit {

  @Input() model :T;

  @Input() modelService : ModelService<T>;

  public parentCategory : number;
  constructor(
    private categoryService : CategoryService
  ) {

    this.parentCategory = categoryService.getParentCategory();

  }

  ngOnInit(): void {
    console.log("Parent Category");
    console.log(this.parentCategory);
  }

}
