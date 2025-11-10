package cliente;

import modelo.Produto;
import service.EstoqueService;

import javax.swing.*;
import javax.swing.table.AbstractTableModel;
import java.awt.*;
import java.rmi.RemoteException;
import java.util.List;
import java.util.ArrayList;

/**
 * JFrame que lista produtos consumindo o serviço remoto via RMI.
 */
public class ProductListFrame extends JFrame {

    private ClienteRMI cliente;
    private EstoqueService service;
    private JTable table;
    private ProductTableModel tableModel;
    private JButton btnRefresh, btnNovo;

    public ProductListFrame(ClienteRMI cliente) {
        super("Lista de Produtos - Sistema Distribuído de Estoque");
        this.cliente = cliente;

        initComponents();
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(800, 450);
        setLocationRelativeTo(null);

        try {
            if (cliente.conectar()) {
                this.service = cliente.getService();
                carregarProdutos();
            } else {
                JOptionPane.showMessageDialog(this, 
                    "Não foi possível conectar ao servidor RMI.",
                    "Erro de Conexão", JOptionPane.ERROR_MESSAGE);
            }
        } catch (Exception e) {
            e.printStackTrace();
            JOptionPane.showMessageDialog(this, 
                "Erro ao conectar: " + e.getMessage(), 
                "Erro", JOptionPane.ERROR_MESSAGE);
        }
    }

    private void initComponents() {
        tableModel = new ProductTableModel();
        table = new JTable(tableModel);
        JScrollPane scroll = new JScrollPane(table);

        btnRefresh = new JButton("Atualizar");
        btnNovo = new JButton("Novo Produto");

        btnRefresh.addActionListener(e -> carregarProdutos());
        btnNovo.addActionListener(e -> JOptionPane.showMessageDialog(this, "Abrir tela de cadastro (a implementar)"));

        JPanel topPanel = new JPanel(new FlowLayout(FlowLayout.LEFT));
        topPanel.add(btnRefresh);
        topPanel.add(btnNovo);

        getContentPane().setLayout(new BorderLayout());
        getContentPane().add(topPanel, BorderLayout.NORTH);
        getContentPane().add(scroll, BorderLayout.CENTER);
    }

    private void carregarProdutos() {
        btnRefresh.setEnabled(false);

        SwingWorker<List<Produto>, Void> worker = new SwingWorker<>() {
            @Override
            protected List<Produto> doInBackground() throws Exception {
                if (service == null) throw new RemoteException("Serviço não disponível");
                return service.listarProdutos();
            }

            @Override
            protected void done() {
                try {
                    List<Produto> produtos = get();
                    tableModel.setProdutos(produtos);
                } catch (Exception ex) {
                    ex.printStackTrace();
                    JOptionPane.showMessageDialog(ProductListFrame.this, 
                        "Erro ao carregar produtos: " + ex.getMessage(),
                        "Erro", JOptionPane.ERROR_MESSAGE);
                } finally {
                    btnRefresh.setEnabled(true);
                }
            }
        };
        worker.execute();
    }

    private static class ProductTableModel extends AbstractTableModel {
        private final String[] colunas = {"ID", "Nome", "Categoria", "Quantidade", "Preço"};
        private List<Produto> produtos = new ArrayList<>();

        public void setProdutos(List<Produto> produtos) {
            this.produtos = produtos != null ? produtos : new ArrayList<>();
            fireTableDataChanged();
        }

        @Override
        public int getRowCount() {
            return produtos.size();
        }

        @Override
        public int getColumnCount() {
            return colunas.length;
        }

        @Override
        public String getColumnName(int col) {
            return colunas[col];
        }

        @Override
        public Object getValueAt(int rowIndex, int columnIndex) {
            Produto p = produtos.get(rowIndex);
            switch (columnIndex) {
                case 0: return p.getId();
                case 1: return p.getNome();
                case 2: return (p.getCategoria() != null) ? p.getCategoria() : "";
                case 3: return p.getQuantidade();
                case 4: return p.getPreco();
                default: return "";
            }
        }
    }
}