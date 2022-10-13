import {Plan} from "./Plan";
import {Invoice} from "./Invoice";

export class MainHQ{

  public id : Number | undefined | null ;

  public name : String | undefined | null ;

  public plans : Plan[] | undefined | null ;

  public invoices : Invoice[] | undefined | null ;

  public MainHQ(
                id : Number | undefined | null ,
                name : String | undefined | null,
                plans : Plan[] | undefined | null
  ){
    this.id = id;
    this.name = name;
    this.plans = plans;
  }

  static builder() : MainHQ{
    return new MainHQ();
  }

  public setId (id : Number) : MainHQ{
    this.id = id;
    return this;
  }

  public setName (name : String) : MainHQ{
    this.name = name;
    return this;
  }

  public setPlans (plans : Plan[]) : MainHQ{
    this.plans = plans;
    return this;
  }

  public build() : MainHQ{
    return this;
  }

}
