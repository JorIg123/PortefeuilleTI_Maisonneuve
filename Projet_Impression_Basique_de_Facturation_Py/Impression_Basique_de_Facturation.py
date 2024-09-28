   #Étudiant: Jorge Espinal
#ID: 2296014
#Course: Intro à la programmation
#Titre: TP2


#Fonction enqueteAcha(): ramasser de l'information sur l'article, prix unitaire et quantité.
# La function renvoie l'information dans le ordre: article, prix unitaire et quantité
def enqueteAchat():
    article = input("Veuillez entrer le nom de votre article: ")
    pUnit = float(input("Veuillez entrer le prix unitaire de l'article: "))
    quant = float(input("Veuillez entrer la quantité de l'article: "))
    return article,pUnit,quant

#Fonction ListAchatGenerator(nomListlisteAchats,article,pUnit,quant,statusTax,TVQ,TPS): prendre une liste
# et ajouter des éléments à cette liste dans l'ordre: article, prix unitaire, quantité, et prix totale pour
# l'article en question en considérant si l'article est taxable ou non(TVQ et TPS).
# La fonction renvoie la liste avec les nouveaux éléments ajoutés à la fin.
def ListAchatGenerator(nomListlisteAchats,article,pUnit,quant,statusTax,TVQ,TPS):
    if statusTax == True:
        pTotArt=pUnit*quant + ((pUnit*quant)*(TPS+TVQ))
    else:
        pTotArt=pUnit*quant
    nomListlisteAchats.append(article)
    nomListlisteAchats.append(pUnit)
    nomListlisteAchats.append(quant)
    nomListlisteAchats.append(pTotArt)
    return nomListlisteAchats

#Fonction delArtList(nomListlisteAchats): éliminer un élément d'une liste ainsi que les trois éléments suivants.
#La fonction renvoie la liste avec les quatre éléments éliminés.
def delArtList(nomListlisteAchats):
    artÀSuppr = input("Entrez le nom de l'article que vous voulez supprimer: ")
    for indexRef in range (len(nomListlisteAchats)):
        if nomListlisteAchats[indexRef]==artÀSuppr:
            del (nomListlisteAchats[indexRef + 3],nomListlisteAchats[indexRef + 2],
                 nomListlisteAchats[indexRef + 1], nomListlisteAchats[indexRef])
            break
        if indexRef+1 == len(nomListlisteAchats):
            print("\n******************************\n** Article n'est pas trouvé **\n******************************\n")
            break
    return nomListlisteAchats

#Fonction plusLargeChain(nomListlisteAchats,elementReprIndex): déterminer la chaîne de caractère la plus longue
# parmi les éléments qui ont une position correspondant parmi les différents groupes d'une liste organisée par
# groupes de quatre éléments. La fonction prend une liste et la position dans le groupe (1 à 4)
# et renvoie la chaîne la plus longue ainsi que le nombre de caractères.
def plusLargeChain(nomListlisteAchats,elementReprIndex):
    element = []
    chain = ""
    for elem in range(elementReprIndex, len(nomListlisteAchats), 4):
        if type(nomListlisteAchats[elem]) == str:
            element.append(nomListlisteAchats[elem])
            for i in range(len(element)):
                if len(element[i]) >= len(chain):
                    chain = element[i]
        if type(nomListlisteAchats[elem]) == float or type(nomListlisteAchats[elem]) == int:
            element.append(str(nomListlisteAchats[elem]))
            for i in range(len(element)):
                if len(element[i]) >= len(chain):
                    chain = element[i]
    return[chain,len(chain)]

#Fonction formatRecu(listeAchats): prendre la liste d'achats et le donner un format pour afficher
# un reçu avec les articles achetés ainsi que leur prix unitaire, la quantité achetée per article,
# le prix total à payer pour l'article et le montant total de l'achat.
def formatRecu(listeAchats):
    espTitle = " "
    esp = " "
    print("═" * 60)
    print("\n" * 2)
    print("Votre reçu:")
    print("###########\n")
    plusLargeMot = plusLargeChain(listeAchats, 0)
    totEspPrArt ,TitleColArt,TitlePrixUnit,TitleQuantite,TitleTot = (plusLargeMot[1] // 2) * 2 + 15,"Article","P.U","Qte","Tot."
    print(espTitle * (((totEspPrArt - len(TitleColArt)) // 2) - 4), TitleColArt,
          espTitle * (((totEspPrArt - len(TitleColArt)) // 2) + 3),
          TitlePrixUnit, espTitle * 20,
          TitleQuantite, espTitle * 20,
          TitleTot)
    for i in range(0,len(listeAchats),4):
        print(listeAchats[i], esp * (totEspPrArt - len(listeAchats[i])),
              listeAchats[i+1], esp * (23 - len(str(listeAchats[i+1]))),
              listeAchats[i+2], esp * (23 - len(str(listeAchats[i+2]))),
              format(listeAchats[i+3],".2f"))
    totalGlobal=0
    for i in range(3,len(listeAchats),4):
        totalGlobal+=listeAchats[i]
    print("____"* 21)
    print(" "*50,"Montant à payer: --->",  format(totalGlobal,".2f"))


#Programme principal
TVQ = 0.09975
TPS = 0.05
listeAchats=[] #Créer une liste vide d'achats.
prenomCassier=input("Quel est le prénom du caissier(ère): ")
print("\nBonjour ",prenomCassier,", bon courage en cette journée de travail !")
while True: #Créer un bucle pour continuer à ajouter des éléments dans la liste d'achats (options 1 ou2)
            # ou à éliminer des éléments de la liste(option 3).
            # Le bucle finisse si  générer un reçu est choisi parmi les options offertes(option 4).
    print("\n\nLE MENU DISPONIBLE À VOTRE CAISSE ES LE SUIVANT:\n\n1- Ajouter un article non-taxable\n"
          "2- Ajouter un article taxable\n3- Supprimer un article de la liste d'achats\n4- Générer le reçu et Quiter")
    choix = input("Quelle est votre choix: ")
    if choix != "1" and choix != "2" and choix != "3" and choix != "4":    #Le codage conditionnel renvoie vers la liste
        print("\n******************************************************")  #d'option principale dans le bucle while True
        print("**   Désolé, ce choix n'est pas parmi les options   **")    #si l'option choisi n'existe pas.
        print("******************************************************")
    else:
        if choix == "1":
            statusTax=False
            article, pUnit, quant = enqueteAchat()
            listeAchats= ListAchatGenerator(listeAchats,article,pUnit,quant,statusTax,TVQ,TPS)
            continue
        if choix == "2":
            statusTax = True
            article, pUnit, quant = enqueteAchat()
            listeAchats = ListAchatGenerator(listeAchats,article, pUnit, quant, statusTax, TVQ, TPS)
            continue
        if choix == "3":
            listeAchats=delArtList(listeAchats)
            print(listeAchats)
            continue
        if choix == "4":
             formatRecu(listeAchats)
             break