export class HiddenKey{

  public actualKey : string;
  public authorizeRoles : string[] = [];

  constructor(actualKey? : string, authorizeRoles? : string[]) {
    if (actualKey)
      this.actualKey = actualKey;
    if (authorizeRoles)
      this.authorizeRoles = authorizeRoles;
  }
}
