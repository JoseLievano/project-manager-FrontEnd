import {Business} from "./Business";

export class bsGeneralSettings{

  public id : Number | undefined | null;

  public logoUrl : String | undefined | null;

  public address : String | undefined | null;

  public website : String | undefined | null;

  public email : String | undefined | null;

  public business : Business | undefined | null;

  public bsGeneralSettings(
                            id : Number | undefined | null,
                            logoUrl : String | undefined | null,
                            address : String | undefined | null,
                            website : String | undefined | null,
                            email : String | undefined | null,
                            business : Business | undefined | null
  ){
    this.id = id;
    this.logoUrl = logoUrl;
    this.address = address;
    this.website = website;
    this.email = email;
    this.business = business;
  }

  static builder() : bsGeneralSettings{
    return new bsGeneralSettings();
  }

  public setId (id : Number) : bsGeneralSettings{
    this.id = id;
    return this;
  }

  public setLogoUrl (logoUrl : String) : bsGeneralSettings{
    this.logoUrl = logoUrl;
    return this;
  }

  public setAddress (address : String) : bsGeneralSettings{
    this.address = address;
    return this;
  }

  public setWebsite (website : String) : bsGeneralSettings{
    this.website = website;
    return this;
  }

  public setEmail (email : String) : bsGeneralSettings{
    this.email = email;
    return this;
  }

  public setBusiness (business : Business) : bsGeneralSettings{
    this.business = business;
    return this;
  }

  public build() : bsGeneralSettings{
    return this;
  }

}
