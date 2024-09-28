import java.util.ArrayList;

public class Bracelet extends Tracker {
	ArrayList<Observateur> lesobservateurs;


	public Bracelet(int coord_X_Tracker, int coord_Y_Tracker, String attribue, EtatTracker et, Prison p) {
		super(coord_X_Tracker, coord_Y_Tracker, attribue, et, p);
		this.lesobservateurs= new ArrayList<Observateur>();

	}
	
	public void notyfyAll() {
		for(Observateur o: this.lesobservateurs)
			o.notifyme(notification);
	};
	public void inscrire(Observateur o) {
		this.lesobservateurs.add(o);

	};
	public void desinscrire( Observateur o) {
		for(Observateur k:this.lesobservateurs)
			if(k.equals(o))
				this.lesobservateurs.remove(o);
	};
}
