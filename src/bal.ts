export abstract class Courrier {
  protected _poids: number;
  protected _express: boolean;
  protected _adresse: string;

  constructor(poids: number, express: boolean, adresse: string) {
    this._poids = poids;
    this._express = express;
    this._adresse = adresse;
  }

  abstract affranchirNormal(): number;

  valide(): boolean {
    return this._adresse.length > 0;
  }

  affranchir(): number {
    if (!this.valide()) {
      return 0;
    } else if (this._express) {
      return 2 * this.affranchirNormal();
    } else {
      return this.affranchirNormal();
    }
  }

  toString(): string {
    let s = "";
    if (!this.valide()) {
      s += "(Courrier invalide)\n";
    }
    s += "Poids : " + this._poids + " g\n";
    s += "Express : " + (this._express ? "oui" : "non") + "\n";
    s += "Destination : " + this._adresse + "\n";
    s += "Prix : " + this.affranchir() + "€\n";
    return s;
  }
}
