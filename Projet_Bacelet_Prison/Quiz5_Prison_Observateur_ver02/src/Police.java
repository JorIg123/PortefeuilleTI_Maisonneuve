
public class Police implements Observateur {
	String nom, prenom;
	
	public Police(String prenom, String nom ) {
		super();
		this.nom = nom;
		this.prenom = prenom;
	}
	@Override
	public void notifyme(String message) {
		//message = t.notification;
		// TODO Auto-generated method stub
		System.out.println("\nNOTIFICATION  pour l'agent Police "+ this.prenom +" "+ this.nom+ ": "+ message + "\n");
		
	}
}