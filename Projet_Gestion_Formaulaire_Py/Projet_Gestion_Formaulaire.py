

from abc import ABC
from array import *


class Presentation():

    invite1 = "\nVoulez-vous entrer des informations pour fins de recherche ('o', 'O', 'n' ou 'N'): "
    invite2 = "\nVoulez-vous entrer d'autres informations pour fins de recherche ('o', 'O', 'n' ou 'N') :"

    def messageBievenue(self):
        print("Bienvenue,\nCeci est un programme de consultation à de fins de recherche et statistiques.\n ")

    def saisirEtValiderOuiNon(self, invite):
        print(invite, end="")
        while True:
            repParticipation = input()
            if repParticipation != 'o' and repParticipation != 'O' and repParticipation != 'n' and repParticipation != 'N':
                print("ERREUR!!!! La réponse DOIT être 'o', 'O', 'n' ou 'N'")
            else:
                break
        return repParticipation.upper()


class Stat_HommeFamme(ABC):

    def afficherStatsHommeFemme(self,hommeSaisons, hommeCouleurs, femmeSaisons, femmeCouleurs):
        nombreDeRépondenats = len(hommeSaisons) + len(femmeSaisons)
        totalHommes = len(hommeSaisons)
        totalHommesControlDivZero = len(hommeSaisons)
        totalFemmes = len(femmeSaisons)
        totalFemmesControlDivZero = len(femmeSaisons)
        print("\nSTATISTIQUES")
        print("Nombre total de répondants:", nombreDeRépondenats)
        print("Nombre total d'hommes:", totalHommes)
        print("Nombre total de femmes:", totalFemmes)

        # SI NB TOTAL HOMMES/FEMMES = 0
        # MODIFIER NB TOTAL PAR 1 POUR PRÉVENIR LA DIVISION PAR ZÉRO
        if totalHommes == 0:
            totalHommesControlDivZero = 1
        else:
            pass
        if totalFemmes == 0:
            totalFemmesControlDivZero = 1
        else:
            pass

        # PRÉFÉRENCES SAISONS et COULEURS [HOMME,FEMME]
        printempsCompteur = [0, 0]
        eteCompteur = [0, 0]
        automneCompteur = [0, 0]
        hiverCompteur = [0, 0]
        rougeCompteur = [0, 0]
        jauneCompteur = [0, 0]
        bleuCompteur = [0, 0]
        for i in range(len(hommeSaisons)):
            if hommeSaisons[i] == 1:
                printempsCompteur[0] += 1
            if hommeSaisons[i] == 2:
                eteCompteur[0] += 1
            if hommeSaisons[i] == 3:
                automneCompteur[0] += 1
            if hommeSaisons[i] == 4:
                hiverCompteur[0] += 1
        for i in range(len(femmeSaisons)):
            if femmeSaisons[i] == 1:
                printempsCompteur[1] += 1
            if femmeSaisons[i] == 2:
                eteCompteur[1] += 1
            if femmeSaisons[i] == 3:
                automneCompteur[1] += 1
            if femmeSaisons[i] == 4:
                hiverCompteur[1] += 1
        for i in range(len(hommeCouleurs)):
            if hommeCouleurs[i] == 1:
                rougeCompteur[0] += 1
            if hommeCouleurs[i] == 2:
                jauneCompteur[0] += 1
            if hommeCouleurs[i] == 3:
                bleuCompteur[0] += 1
        for i in range(len(femmeCouleurs)):
            if femmeCouleurs[i] == 1:
                rougeCompteur[1] += 1
            if femmeCouleurs[i] == 2:
                jauneCompteur[1] += 1
            if femmeCouleurs[i] == 3:
                bleuCompteur[1] += 1

        print("\nSAISON PRÉFÉRÉE")
        print(" Printemps:", str((printempsCompteur[0] / totalHommesControlDivZero) * 100) + "% des hommes,",
              str((printempsCompteur[1] / totalFemmesControlDivZero) * 100) + "% des femmes")
        print(" Été:", str((eteCompteur[0] / totalHommesControlDivZero) * 100) + "% des hommes,",
              str((eteCompteur[1] / totalFemmesControlDivZero) * 100) + "% des femmes")
        print(" Automne:", str((automneCompteur[0] / totalHommesControlDivZero) * 100) + "% des hommes,",
              str((automneCompteur[1] / totalFemmesControlDivZero) * 100) + "% des femmes")
        print(" Hiver:", str((hiverCompteur[0] / totalHommesControlDivZero) * 100) + "% des hommes,",
              str((hiverCompteur[1] / totalFemmesControlDivZero) * 100) + "% des femmes")
        print("\nCOULEUR PRÉFÉRÉE")
        print(" Rouge:", str((rougeCompteur[0] / totalHommesControlDivZero) * 100) + "% des hommes,",
              str((rougeCompteur[1] / totalFemmesControlDivZero) * 100) + "% des femmes")
        print(" Jaune:", str((jauneCompteur[0] / totalHommesControlDivZero) * 100) + "% des hommes,",
              str((jauneCompteur[1] / totalFemmesControlDivZero) * 100) + "% des femmes")
        print(" Bleu:", str((bleuCompteur[0] / totalHommesControlDivZero) * 100) + "% des hommes,",
              str((bleuCompteur[1] / totalFemmesControlDivZero) * 100) + "% des femmes")


class StatsPourUnGroupe(ABC):

    def afficherStatsPourUnGroupe(self,descDuGroupe, groupeSaisons, groupeCouleurs):
        print("\nPREFERENCES PAR GROUPES D'AGES")
        totalGroupe1 = 0
        totalGroupe2 = 0
        totalGroupe3 = 0
        totalGroupe4 = 0
        totalGroupe5 = 0
        # POUR FAIRE UN TOTAL DE LA POPULATION PAR GROUPE D'ÂGE
        for i in range(0, len(groupeSaisons), 2):
            if groupeSaisons[i] == 1:
                totalGroupe1 += 1
            elif groupeSaisons[i] == 2:
                totalGroupe2 += 1
            elif groupeSaisons[i] == 3:
                totalGroupe3 += 1
            elif groupeSaisons[i] == 4:
                totalGroupe4 += 1
            else:
                totalGroupe5 += 1
        totalGroupesDeAge = [totalGroupe1, totalGroupe2, totalGroupe3, totalGroupe4, totalGroupe5]

        for i in range(len(totalGroupesDeAge)):
            print(descDuGroupe[i])
            if totalGroupesDeAge[i] == 0:
                print("AUCUN participant de ce groupe d’âge")
                input("\nAppuyer sur ENTER pour continuer\n")
            else:
                totalPrintemps = 0
                totalEte = 0
                totalAutomne = 0
                totalHiver = 0
                # POUR PARCOURIR LES INDICES PAIRS
                for j in range(0, len(groupeSaisons), 2):
                    # POUR TOTALISER LA CORRESPONDANCE ENTRE LES VALEURS DES INDICES PAIRS DE groupeSaisons ET descDuGroupe
                    # DANS LE TOTAL DE CHAQUE GROUPE SAISON (totalPrintemps, totalEte, totalAutomne, totalHiver)
                    if i + 1 == groupeSaisons[j]:
                        if groupeSaisons[j + 1] == 1:
                            totalPrintemps += 1
                        elif groupeSaisons[j + 1] == 2:
                            totalEte += 1
                        elif groupeSaisons[j + 1] == 3:
                            totalAutomne += 1
                        else:
                            totalHiver += 1
                print("  Saisons :")
                print("  - Printemps :", totalPrintemps * 100 / totalGroupesDeAge[i])
                print("  - Ete :", totalEte * 100 / totalGroupesDeAge[i])
                print("  - Automne :", totalAutomne * 100 / totalGroupesDeAge[i])
                print("  - Hiver :", totalHiver * 100 / totalGroupesDeAge[i])

                totalRouge = 0
                totalJaune = 0
                totalBleu = 0
                # POUR PARCOURIR LES INDICES PAIRS
                for j in range(0, len(groupeCouleurs), 2):
                    # POUR TOTALISER LA CORRESPONDANCE ENTRE LES VALEURS DES INDICES PAIRS DE groupeCouleurs ET descDuGroupe
                    # DANS LE TOTAL DE CHAQUE GROUPE COULEUR (totalRouge, totalJaune, totalBleu)
                    if i + 1 == groupeCouleurs[j]:
                        if groupeCouleurs[j + 1] == 1:
                            totalRouge += 1
                        elif groupeCouleurs[j + 1] == 2:
                            totalJaune += 1
                        else:
                            totalBleu += 1
                print("  Couleurs :")
                print("  - Rouge :", totalRouge * 100 / totalGroupesDeAge[i])
                print("  - Jaune :", totalJaune * 100 / totalGroupesDeAge[i])
                print("  - Bleu :", totalBleu * 100 / totalGroupesDeAge[i])
                input("\nAppuyer sur ENTER pour continuer\n")


class User(Stat_HommeFamme, StatsPourUnGroupe):

    def __init__(self):
        self.age = 0
        self.sexe = 0
        self.saison = 0
        self.couleur = 0

    def set_age(self, age):
        self.age = age

    def get_age(self):
        return self.age

    def set_sexe(self, sexe):
        self.sexe = sexe

    def get_sexe(self):
        return self.sexe

    def set_saison(self, saison):
        self.saison = saison

    def get_saison(self):
        return self.saison

    def set_couleur(self, couleur):
        self.couleur = couleur

    def get_couleur(self):
        return self.couleur

    def __str__(self):
        return f"{self.sexe},{self.age},{self.saison},{self.couleur}"

    def afficherMenuGroupeAge(self):
        print(
            "\nGROUPE D'AGE\n 1 - 5 a 12 ans\n 2 - 13 a 18 ans\n 3 - 19 a 30 ans\n 4 - 31 a 45 ans\n 5 - 46 ans et plus")

    def afficherMenuSaison(self):
        print("\nSAISONS\n 1 - Printemps\n 2 - Eté\n 3 - Automne\n 4 - Hiver")

    def afficherMenuCouleurs(self):
        print("\nCOULEURS\n 1 - Rouge\n 2 - Jaune\n 3 - Bleu")

    def saisirEtValiderSexe(self):
        while True:
            repSexe = input("\nQuel est le sexe du répondant ('M', 'm', 'F' ou 'f'): ")
            if repSexe != 'M' and repSexe != 'm' and repSexe != 'F' and repSexe != 'f':
                print("ERREUR!!!! La réponse DOIT être 'M', 'm', 'F' ou 'f'")
            else:
                break
        self.sexe = repSexe.upper()

    def saisirEtValiderChoix(self, msgInvite, min, max):
        while True:
            repChoix = input(msgInvite.format(min, max))
            if repChoix.isnumeric() == True:
                if int(repChoix) >= min and int(repChoix) <= max:
                    break
                else:
                    print("ERREUR! Les choix possibles sont entre {} et {} inclusivement.".format(min, max))
            else:
                print("ERREUR! Les choix possibles sont entre {} et {} inclusivement.".format(min, max))
        repChoix = int(repChoix)
        return repChoix

    def saisirEtValiderMenuGroupeAge(self):
        self.afficherMenuGroupeAge()
        msjInvite = "Entrez le groupe d’âge du répondant: "
        repGroupeAge = self.saisirEtValiderChoix(msjInvite, 1, 5)
        self.age = repGroupeAge

    def saisirEtValiderMenuSaison(self):
        self.afficherMenuSaison()
        msjInvite = "Entrez la saison préférée du répondant: "
        repSaison = self.saisirEtValiderChoix(msjInvite, 1, 4)
        self.saison = repSaison

    def saisirEtValiderMenuCouleur(self):
        self.afficherMenuCouleurs()
        msjInvite = "Entrez la couleur préférée du répondant: "
        repCouleur = self.saisirEtValiderChoix(msjInvite, 1, 3)
        self.couleur = repCouleur


#   *********************************************************
#   **************  PROGRAMME PRINCIPAL  ********************
#   *********************************************************

msgBienvenue = Presentation()
msgBienvenue.messageBievenue()

if msgBienvenue.saisirEtValiderOuiNon(Presentation.invite1) == "O":
    listeRepondants = []
    femmeCouleurs = array("i",[])
    hommeCouleurs = array("i",[])
    femmeSaisons = array("i",[])
    hommeSaisons = array("i",[])
    descDuGroupe = ["groupe 1 : 5 a 12 ans","groupe 2 : 13 a 18 ans","groupe 3 : 19 a 30 ans","groupe 4 : 31 a 45 ans","groupe 5 : 46 ans et plus"]
    groupeSaisons = array("i",[])
    groupeCouleurs = array("i",[])



    # REMPLIR LA LISTE DES RÉPONDANTS
    while True:
        candidat = User()

        candidat.saisirEtValiderSexe()
        candidat.saisirEtValiderMenuGroupeAge()
        candidat.saisirEtValiderMenuSaison()
        candidat.saisirEtValiderMenuCouleur()

        if candidat.get_age() == 1:
            groupeSaisons.append(candidat.get_age())
            groupeSaisons.append(candidat.get_saison())
            groupeCouleurs.append(candidat.get_age())
            groupeCouleurs.append(candidat.get_couleur())
        elif candidat.get_age() == 2:
            groupeSaisons.append(candidat.get_age())
            groupeSaisons.append(candidat.get_saison())
            groupeCouleurs.append(candidat.get_age())
            groupeCouleurs.append(candidat.get_couleur())

        elif candidat.get_age() == 3:
            groupeSaisons.append(candidat.get_age())
            groupeSaisons.append(candidat.get_saison())
            groupeCouleurs.append(candidat.get_age())
            groupeCouleurs.append(candidat.get_couleur())

        elif candidat.get_age() == 4:
            groupeSaisons.append(candidat.get_age())
            groupeSaisons.append(candidat.get_saison())
            groupeCouleurs.append(candidat.get_age())
            groupeCouleurs.append(candidat.get_couleur())

        else:
            groupeSaisons.append(candidat.get_age())
            groupeSaisons.append(candidat.get_saison())
            groupeCouleurs.append(candidat.get_age())
            groupeCouleurs.append(candidat.get_couleur())


        if candidat.get_sexe() == "M":
            hommeSaisons.append(candidat.get_saison())
            hommeCouleurs.append(candidat.get_couleur())
        else:
            femmeSaisons.append(candidat.get_saison())
            femmeCouleurs.append(candidat.get_couleur())
        listeRepondants.append(candidat)
        if msgBienvenue.saisirEtValiderOuiNon(Presentation.invite2) == "O":
            pass
        else:
            break

    candidat.afficherStatsHommeFemme(hommeSaisons, hommeCouleurs, femmeSaisons, femmeCouleurs)
    candidat.afficherStatsPourUnGroupe(descDuGroupe, groupeSaisons, groupeCouleurs)
    print("FIN NORMALE DU PROGRAMME")


else:
    print("\nAucun Traitement. Au Revoir" )




