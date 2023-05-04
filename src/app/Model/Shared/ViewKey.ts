export class ViewKey{

  public privateKeyName : string;

  public publicKeyName : string;

  public accessRole : string[];

  public constructor() {
  }

  public setPublicKeyName(name : string) : ViewKey{
    this.publicKeyName = name;
    return this;
  }

  public setPrivateKeyName(name : string) : ViewKey{
    this.privateKeyName = name;
    return this;
  }

  public setAccessRole (role : string[]) : ViewKey {
    this.accessRole = role;
    return this;
  }

}

export class ViewKeyBuilder{

  public static builder() : ViewKey{
    return new ViewKey();
  }

}
