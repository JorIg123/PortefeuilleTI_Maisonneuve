
public class Test {

	public static void main(String[] args) {
		
		Observateur agentGRC = new GRC("Frank","Ramirez");
		Observateur agentPolice = new Police("Robert","Peel");
		Prison alcatraz = new Penitencier(10, 10, 30, 30);
		
		Tracker phillips01 = new Bracelet(15, 15, "Jack The Ripper", new DehorsPrison(), alcatraz );
		

		phillips01.inscrire(agentGRC);
		phillips01.inscrire(agentPolice);
		
		Tracker phillips02 = new Bracelet(5, 5, "Carlos The Jackal", new DedansPrison(), alcatraz );
		

		phillips02.inscrire(agentGRC);
		phillips02.inscrire(agentPolice);
		
		
		phillips01.rapporterChangementPosition(70, 70);
		phillips01.rapporterChangementPosition(20, 70);
		phillips01.rapporterChangementPosition(70, 20);
		phillips01.rapporterChangementPosition(20, 20);
		phillips01.rapporterChangementPosition(20, 10);
		phillips01.rapporterChangementPosition(15, 15);
		
		

		phillips02.rapporterChangementPosition(7, 7);
		phillips02.rapporterChangementPosition(25, 70);
		phillips02.rapporterChangementPosition(7, 20);
		phillips02.rapporterChangementPosition(20, 20);
		phillips02.rapporterChangementPosition(20, 10);
		phillips02.rapporterChangementPosition(15, 15);
	}
	
	

}
