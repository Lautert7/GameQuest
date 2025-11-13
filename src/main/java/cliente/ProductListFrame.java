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
 * Janela que exibe uma lista de produtos obtidos do serviço remoto via RMI.
 * Permite visualizar produtos em uma tabela e atualizar a lista.
 * 
 * @author Sistema de Controle de Estoque
 * @version 1.0
 */
public class ProductListFrame extends JFrame {

    /**
     * Cliente RMI para comunicação com o servidor.
     */
    private ClienteRMI cliente;
    
    /**
     * Serviço remoto de estoque.
     */
    private EstoqueService service;
    
    /**
     * Tabela que exibe os produtos.
     */
    private JTable table;
    
    /**
     * Modelo de dados da tabela.
     */
    private ProductTableModel tableModel;
    
    /**
     * Botão para atualizar a lista de produtos.
     */
    private JButton btnRefresh;
    
    /**
     * Botão para criar novo produto.
     */
    private JButton btnNovo;

    /**
     * Construtor que inicializa a janela e carrega os produtos do servidor.
     * 
     * @param cliente Cliente RMI para comunicação com o servidor
     */
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

    /**
     * Inicializa os componentes da interface gráfica.
     * Cria a tabela, botões e organiza o layout da janela.
     */
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

    /**
     * Carrega a lista de produtos do servidor de forma assíncrona.
     * Utiliza SwingWorker para não bloquear a interface durante a operação.
     */
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

    /**
     * Modelo de tabela personalizado para exibir produtos.
     * Implementa AbstractTableModel para fornecer dados à JTable.
     */
    private static class ProductTableModel extends AbstractTableModel {
        
        /**
         * Nomes das colunas da tabela.
         */
        private final String[] colunas = {"ID", "Nome", "Categoria", "Quantidade", "Preço"};
        
        /**
         * Lista de produtos a serem exibidos na tabela.
         */
        private List<Produto> produtos = new ArrayList<>();

        /**
         * Define a lista de produtos e atualiza a tabela.
         * 
         * @param produtos Lista de produtos a serem exibidos
         */
        public void setProdutos(List<Produto> produtos) {
            this.produtos = produtos != null ? produtos : new ArrayList<>();
            fireTableDataChanged();
        }

        /**
         * Retorna o número de linhas da tabela.
         * 
         * @return Número de produtos na lista
         */
        @Override
        public int getRowCount() {
            return produtos.size();
        }

        /**
         * Retorna o número de colunas da tabela.
         * 
         * @return Número de colunas definidas
         */
        @Override
        public int getColumnCount() {
            return colunas.length;
        }

        /**
         * Retorna o nome da coluna especificada.
         * 
         * @param col Índice da coluna
         * @return Nome da coluna
         */
        @Override
        public String getColumnName(int col) {
            return colunas[col];
        }

        /**
         * Retorna o valor da célula na posição especificada.
         * 
         * @param rowIndex Índice da linha
         * @param columnIndex Índice da coluna
         * @return Valor da célula
         */
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