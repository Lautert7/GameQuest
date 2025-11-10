package cliente;

import javax.swing.SwingUtilities;

public class Main {
    public static void main(String[] args) {
        ClienteRMI cliente = new ClienteRMI();

        SwingUtilities.invokeLater(() -> {
            ProductListFrame frame = new ProductListFrame(cliente);
            frame.setVisible(true);
        });
    }
}