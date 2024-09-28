import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

public class Stockage_En_TXT extends StockageData {

    public Stockage_En_TXT(Tracker t) {
        super(t);
    }

    @Override
 
    public void StockerDataPos() {
        try {
            String nom_Tracker = t.getAttribue().replace(" ", "") + ".txt";
            String coord = "(" + t.getcoord_X_Tracker() + "," + t.getcoord_Y_Tracker() + ") ";
            FileWriter fileWriter = new FileWriter(nom_Tracker, true);

            // Se usa un bloque try-with-resources para garantizar que los recursos se cierren correctamente
            try (BufferedWriter bufferedWriter = new BufferedWriter(fileWriter)) {
                bufferedWriter.write(coord);
                bufferedWriter.newLine();
            }

            System.out.println("Datos de coordenadas escritos en el archivo: " + nom_Tracker);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
 
    
}


