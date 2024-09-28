-- Creation d'un trigger pour une nouvelle reservation
CREATE TRIGGER IF NOT EXISTS Nouvelle_Reservation
AFTER INSERT ON Reservations
BEGIN
    UPDATE DeplacementsOfferts
    SET nbrPlaceDisponible = nbrPlaceDisponible - 1
    WHERE idDeplacement = NEW.idDeplacement;
END;

-- Creation d'un trigger pour retirer une reservation
CREATE TRIGGER IF NOT EXISTS Retirer_Reservation
AFTER DELETE ON Reservations
BEGIN
    UPDATE DeplacementsOfferts
    SET nbrPlaceDisponible = nbrPlaceDisponible + 1
    WHERE idDeplacement = OLD.idDeplacement;
END;