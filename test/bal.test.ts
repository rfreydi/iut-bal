// Vous pouvez mettre en commentaire l'import des classes et les tests pour lesquels vous n'avez pas encore écrit le code

import { Lettre, Colis, Boite } from "../src/bal";

describe("Lettre", () => {
  test("Affranchir lettre A3", () => {
    let lettre = new Lettre(200, true, "IUT de Metz, Iles du Saulcy, 57000 Metz", "A3");
    expect(lettre.affranchirNormal()).toBe(3.7);
  });

  test("Affranchir lettre A4", () => {
    let lettre = new Lettre(300, false, "", "A4");
    expect(lettre.affranchirNormal()).toBe(2.8);
  });

  test("Retour chaîne de caractère lettre express valide", () => {
    let lettre = new Lettre(200, true, "IUT de Metz, Iles du Saulcy, 57000 Metz", "A3");
    expect(lettre.toString()).toEqual(
      "Lettre\nPoids : 200 g\nExpress : oui\nDestination : IUT de Metz, Iles du Saulcy, 57000 Metz\nPrix : 7.4€\nFormat : A3\n"
    );
  });

  test("Retour chaîne de caractère lettre non express valide", () => {
    let lettre = new Lettre(300, false, "12 rue de Paris, 57000 Metz", "A4");
    expect(lettre.toString()).toEqual(
      "Lettre\nPoids : 300 g\nExpress : non\nDestination : 12 rue de Paris, 57000 Metz\nPrix : 2.8€\nFormat : A4\n"
    );
  });

  test("Retour chaîne de caractère lettre non valide", () => {
    let lettre = new Lettre(300, false, "", "A4");
    expect(lettre.toString()).toEqual(
      "Lettre\n(Courrier invalide)\nPoids : 300 g\nExpress : non\nDestination : \nPrix : 0€\nFormat : A4\n"
    );
  });
});

describe("Colis", () => {
  test("Affranchier colis", () => {
    let colis = new Colis(500, true, "1 rue George, 54000 Nancy", 30);
    expect(colis.affranchirNormal()).toBe(8);
  });

  test("Retour chaîne de caractères colis express", () => {
    let colis = new Colis(500, true, "1 rue George, 54000 Nancy", 30);
    expect(colis.toString()).toEqual(
      "Colis\nPoids : 500 g\nExpress : oui\nDestination : 1 rue George, 54000 Nancy\nPrix : 16€\nVolume : 30 litre(s)\n"
    );
  });

  test("Retour chaîne de caractères colis non express", () => {
    let colis = new Colis(700, false, "1 rue George, 54000 Nancy", 30);
    expect(colis.toString()).toEqual(
      "Colis\nPoids : 700 g\nExpress : non\nDestination : 1 rue George, 54000 Nancy\nPrix : 8.2€\nVolume : 30 litre(s)\n"
    );
  });

  test("Retour chaîne de caractères colis non valide", () => {
    let colis = new Colis(700, false, "", 30);
    expect(colis.toString()).toEqual(
      "Colis\n(Courrier invalide)\nPoids : 700 g\nExpress : non\nDestination : \nPrix : 0€\nVolume : 30 litre(s)\n"
    );
  });
});

describe("Boite", () => {
  test("ajouterCourrier", () => {
    let boite = new Boite();
    let lettre = new Lettre(200, true, "IUT de Metz, Iles du Saulcy, 57000 Metz", "A3");
    let colis = new Colis(500, true, "1 rue George, 54000 Nancy", 30);
    boite.ajouterCourrier(lettre);
    boite.ajouterCourrier(colis);
    expect(boite.courriers.length).toBe(2);
  });

  test("Lettre invalide", () => {
    let boite = new Boite();
    let lettre = new Lettre(200, true, "IUT de Metz, Iles du Saulcy, 57000 Metz", "A3");
    let lettre2 = new Lettre(300, false, "", "A4");
    boite.ajouterCourrier(lettre);
    boite.ajouterCourrier(lettre2);
    expect(boite.courriersInvalides()).toBe(1);
  });

  test("Colis avec adresse invalide", () => {
    let boite = new Boite();
    let colis = new Colis(500, true, "", 30);
    boite.ajouterCourrier(colis);
    expect(boite.courriersInvalides()).toBe(1);
  });

  test("Colis avec volume invalide", () => {
    let boite = new Boite();
    let colis = new Colis(5000, true, "1 rue George, 54000 Nancy", 75);
    boite.ajouterCourrier(colis);
    expect(boite.courriersInvalides()).toBe(1);
  });

  test("affranchir", () => {
    let boite = new Boite();
    let lettre = new Lettre(200, true, "IUT de Metz, Iles du Saulcy, 57000 Metz", "A3");
    let lettre2 = new Lettre(300, false, "", "A4");
    boite.ajouterCourrier(lettre);
    boite.ajouterCourrier(lettre2);
    expect(boite.affranchir()).toBe(7.4);
  });

  test("Retour du contenu de la boite au lettre sous forme de chaînes de caratères", () => {
    let boite = new Boite();
    let lettre = new Lettre(200, true, "IUT de Metz, Iles du Saulcy, 57000 Metz", "A3");
    let lettre2 = new Lettre(300, false, "", "A4");
    let colis = new Colis(500, true, "1 rue George, 54000 Nancy", 30);
    boite.ajouterCourrier(lettre);
    boite.ajouterCourrier(colis);
    boite.ajouterCourrier(lettre2);
    expect(boite.toString()).toEqual(
      "Lettre\nPoids : 200 g\nExpress : oui\nDestination : IUT de Metz, Iles du Saulcy, 57000 Metz\nPrix : 7.4€\nFormat : A3\n\nColis\nPoids : 500 g\nExpress : oui\nDestination : 1 rue George, 54000 Nancy\nPrix : 16€\nVolume : 30 litre(s)\n\nLettre\n(Courrier invalide)\nPoids : 300 g\nExpress : non\nDestination : \nPrix : 0€\nFormat : A4\n\n"
    );
  });
});
