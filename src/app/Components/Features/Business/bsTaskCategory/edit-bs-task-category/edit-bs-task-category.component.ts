import {Component, Input, OnInit} from '@angular/core';
import {bsTaskCategory} from "../../../../../Model/Business/bsTaskCategory";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-bs-task-category',
  templateUrl: './edit-bs-task-category.component.html',
  styleUrls: ['./edit-bs-task-category.component.css']
})
export class EditBsTaskCategoryComponent implements OnInit{

  @Input() toEdit : bsTaskCategory;

  public editForm : FormGroup = new FormGroup<any>({
    name : new FormControl("", {validators : [Validators.required]})
  })

  ngOnInit(): void {
    if (this.toEdit.name){
      this.editForm.controls['name'].setValue(this.toEdit.name);
    }
  }

}
