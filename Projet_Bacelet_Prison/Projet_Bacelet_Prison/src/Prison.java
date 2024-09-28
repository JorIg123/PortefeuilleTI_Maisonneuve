

public  abstract class Prison {
	public int[] coordonneesPrison;
	public int hauteur_Prison;
	public int largeur_Prison;
	

	
	public Prison(int coord_X_Prison, int coord_Y_Prison, int hauteur, int largeur) {

		this.coordonneesPrison = new int[] {coord_X_Prison, coord_Y_Prison};
		this.hauteur_Prison = hauteur;
		this.largeur_Prison = largeur;
		
	}
	
	public int getcoord_X_Prison() {
		return coordonneesPrison[0];
	}
	
	public void setcoord_X_Prison(int x) {
		coordonneesPrison[0] = x;
	}
	
	public int getcoord_Y_Prison() {
		return coordonneesPrison[1];
	}
	
	public void setcoord_Y_Prison(int y) {
		coordonneesPrison[1] = y;
	}
	

	public int[] getCoordonneesPrison() {
		return coordonneesPrison;
	}

	public void setCoordonneesPrison(int x, int y) {
		this.coordonneesPrison = new int[] {x, y};

	}

	public int getHauteur_Prison() {
		return hauteur_Prison;
	}

	public void setHauteur_Prison(int hauteur_Prison) {
		this.hauteur_Prison = hauteur_Prison;
	}

	public int getLargeur_Prison() {
		return largeur_Prison;
	}

	public void setLargeur_Prison(int largeur_Prison) {
		this.largeur_Prison = largeur_Prison;
	}
	
	public int pos_X_Max() {
		return (getcoord_X_Prison() + this.getLargeur_Prison());
		}
	
	public int pos_X_Min() {
		return getcoord_X_Prison();
		}
	
	public int pos_Y_Max() {
		return getcoord_Y_Prison() + this.getHauteur_Prison();
		}
	
	public int pos_Y_Min() {
		return getcoord_Y_Prison();
		}
	
	
}
