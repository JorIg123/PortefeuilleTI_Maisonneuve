
public class GRC implements Observateur {
	String nom, prenom;
	
	public GRC(String prenom, String nom ) {
		super();
		this.nom = nom;
		this.prenom = prenom;
	}
	@Override
	public void notifyme(String message) {
		//message = t.notification;
		// TODO Auto-generated method stub
		System.out.println("\nNOTIFICATION  pour l'agent GRC "+ this.prenom +" "+ this.nom+ ": "+ message + "\n");
		
	}
}
