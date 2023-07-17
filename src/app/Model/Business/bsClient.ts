import {Business} from "./Business";
import {User} from "../Shared/User";
import {Projects} from "@angular/cli/lib/config/workspace-schema";
import {bsInvoice} from "./bsInvoice";

export class bsClient extends User{

  public isActive : Boolean | null;

  public dateCreated : Date | null;

  public lastLoginDate : Date | null;

  public business : Business | number | null;

  public projects : Projects[] | number[] | null;

  public invoices : bsInvoice[] | number[] | null;

  public address : string | null;

  public website : string | null;

  public phone : string | null;

  public country : string | null;

  public companyName : string | null;

  public constructor(
    id ?: number | null ,
    firstName ?: string ,
    lastName ?: string ,
    email ?: string,
    roles ?: string[],
    password ?: string | null,
    username ?: string,
    accountNonExpired ?: boolean,
    accountNonLocked ?: boolean,
    credentialsNonExpired ?: boolean,
    enabled ?: boolean,
    isActive ?: boolean | null,
    dateCreated ?: Date | null,
    lastLoginDate ?: Date | null,
    business ?: Business | number | null,
    projects ?: Projects[] | number[] | null,
    invoices ?: bsInvoice[] | number[] | null,
    address ?: string | null,
    website ?: string | null,
    phone ?: string | null,
    country ?: string | null,
    companyName ?: string | null
  ){
    super(id, firstName, lastName, email, roles, password, username, accountNonExpired, accountNonLocked, credentialsNonExpired, enabled);
    if (isActive)
      this.isActive = isActive;
    if (dateCreated)
      this.dateCreated = dateCreated;
    if (lastLoginDate)
      this.lastLoginDate = lastLoginDate;
    if (business)
      this.business = business;
    if (projects)
      this.projects = projects;
    if (invoices)
      this.invoices = invoices;
    if (address)
      this.address = address;
    if (website)
      this.website = website;
    if (phone)
      this.phone = phone;
    if (country)
      this.country = country;
    if (companyName)
      this.companyName = companyName;
  }

}
