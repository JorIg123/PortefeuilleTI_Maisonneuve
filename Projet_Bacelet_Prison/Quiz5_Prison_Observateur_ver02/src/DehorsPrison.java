public class DehorsPrison implements EtatTracker {
    public void sortirPrison(Tracker t) {
    	String message = "Attention! " + t.getAttribue() + " se déplace encore à l'extérieur des limites de la prison.        Coord Pos: (" + t.getcoord_X_Tracker()+","+ t.getcoord_Y_Tracker()+") Allez-y!";
    	System.out.println("Attention! " + t.getAttribue() + " se déplace encore à l'extérieur des limites de la prison.        Coord Pos: (" + t.getcoord_X_Tracker()+","+ t.getcoord_Y_Tracker()+")");
    	t.stdp.StockerDataPos();
    	t.notification= message;
        t.notyfyAll();

      
    }

    public void rentrerPrison(Tracker t) {
    	String message = "Attention! La position de " + t.getAttribue() + " a changé à l'intérieur des limites de la prison.  Coord Pos: (" + t.getcoord_X_Tracker()+","+ t.getcoord_Y_Tracker()+")";
    	System.out.println("Attention! La position de " + t.getAttribue() + " a changé à l'intérieur des limites de la prison.  Coord Pos: (" + t.getcoord_X_Tracker()+","+ t.getcoord_Y_Tracker()+")");
        t.setEt(new DedansPrison());
        t.notification= message;
        t.notyfyAll();
    }
}

