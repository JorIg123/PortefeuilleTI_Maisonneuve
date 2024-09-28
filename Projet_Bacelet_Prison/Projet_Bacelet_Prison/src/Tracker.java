

public  abstract class Tracker implements Observable{
	public String attribue;
	public int[] coordonneesTracker;
	public EtatTracker et;
	public Prison p;
	public String notification;
	public StockageData stdp;

	
	public Tracker(int coord_X_Tracker, int coord_Y_Tracker, String attribue, EtatTracker et, Prison p) {
		this.coordonneesTracker = new int[] {coord_X_Tracker,coord_Y_Tracker};
		this.attribue = attribue;
		this.et = et;
		this.p = p; 
		stdp = new Stockage_En_TXT(this);
	}
	
	public int getcoord_X_Tracker() {
		return coordonneesTracker[0];
	}
	
	public void setcoord_X_Tracker(int x) {
		coordonneesTracker[0] = x;
	}
	
	public int getcoord_Y_Tracker() {
		return coordonneesTracker[1];
	}
	
	public void setcoord_Y_Tracker(int y) {
		coordonneesTracker[1] = y;
	}
	

	public int[] getCoordonneesTracker() {
		return coordonneesTracker;
	}

	public void setCoordonneesTracker(int x, int y) {
		this.coordonneesTracker = new int[] {x, y};

	}

	public String getAttribue() {
		return attribue;
	}

	public void setAttribue(String attribue) {
		this.attribue = attribue;
	}

	public EtatTracker getEt() {
		return et;
	}

	public void setEt(EtatTracker et) {
		this.et = et;
	}

	public Prison getP() {
		return p;
	}

	public void setP(Prison p) {
		this.p = p;
	}
	
	void correctionEtatActuelTracker(EtatTracker et){
		if( this.getcoord_X_Tracker()<= this.p.pos_X_Max() &&
			this.getcoord_X_Tracker() >=  this.p.pos_X_Min() &&
			this.getcoord_Y_Tracker()<= this.p.pos_Y_Max() &&
			this.getcoord_Y_Tracker() >=  this.p.pos_Y_Min()) {
				if(this.et instanceof DehorsPrison) { 
					String messaje = "\n\nCORRECTION de l'EtatTracker de "+ this.getAttribue()+""
							+ ", en fonction des coordonnées de position saisis à la création du Tracker, à l'EtatTracker: \'DedansPrison\'.\n\n";
					System.out.println(messaje);
					
				}
			this.setEt(new DedansPrison());

				}
		else {
				if(this.et instanceof DedansPrison) {
					String messaje = "\n\nCORRECTION de l'EtatTracker de "+ this.getAttribue()+""
							+ ", en fonction des coordonnées de position saisis à la création du Tracker, à l'EtatTracker: \'DehorsPrison\'.\n\n";
					System.out.println(messaje);
					this.stdp.StockerDataPos();
			}
			this.setEt(new DehorsPrison());


			
		}
	}

	void sortirPrison(EtatTracker et) {this.et.sortirPrison(this);}
	void rentrerPrison(EtatTracker et) {this.et.rentrerPrison(this);}
	
	void rapporterChangementPosition (int x, int y) {
		this.correctionEtatActuelTracker(et);
		this.setCoordonneesTracker(x, y);
		if (this.getEt() instanceof DehorsPrison) {
			if( this.getcoord_X_Tracker()<= this.p.pos_X_Max() &&
				this.getcoord_X_Tracker() >=  this.p.pos_X_Min() &&
				this.getcoord_Y_Tracker()<= this.p.pos_Y_Max() &&
				this.getcoord_Y_Tracker() >=  this.p.pos_Y_Min()) {
			
				this.rentrerPrison(et);
					}
			else
				this.sortirPrison(et);
		}
		else {
			if( this.getcoord_X_Tracker() > this.p.pos_X_Max() ||
				this.getcoord_X_Tracker() <  this.p.pos_X_Min() ||
				this.getcoord_Y_Tracker() > this.p.pos_Y_Max() ||
				this.getcoord_Y_Tracker() <  this.p.pos_Y_Min()) {
				
				this.sortirPrison(et);
			}
			else
				this.rentrerPrison(et);
		}
		
	}
	
	
}
