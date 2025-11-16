
package visao;

import cliente.ClienteRMI;
import service.EstoqueService;
import java.util.List;
import javax.swing.JOptionPane;
import javax.swing.table.DefaultTableModel;
import modelo.Produto;

/**
 * Classe que representa a tela de listagem de preços dos produtos.
 * Permite visualizar todos os produtos cadastrados com seus respectivos preços
 * e possibilita a edição dos preços através do botão Editar.
 * 
 * @author Sistema Distribuído
 * @version 1.0
 */
public class FrmListadePreco extends javax.swing.JFrame {
    
    /**
     * Cliente RMI utilizado para comunicação com o servidor.
     */
    private ClienteRMI clienteRMI;
    
    /**
     * Serviço de estoque utilizado para operações relacionadas aos produtos.
     */
    private EstoqueService estoqueService;
    
    /**
     * Lista de produtos carregada do servidor.
     */
    private List<Produto> listaProdutos;

    /**
     * Construtor padrão da classe FrmListadePreco.
     * Inicializa os componentes da interface, conecta ao servidor RMI
     * e carrega a lista de preços dos produtos.
     */
    public FrmListadePreco() {
        initComponents();
        conectarServidorRMI();
        carregarListaDePrecos();
    }
    
    /**
     * Carrega a lista de preços dos produtos do servidor e exibe na tabela.
     * Busca todos os produtos através do serviço de estoque e popula
     * a tabela com as informações: ID, Nome, Categoria e Preço.
     * Em caso de erro, exibe uma mensagem de erro ao usuário.
     */
    public void carregarListaDePrecos() {
    try {
        listaProdutos = estoqueService.listarProdutos();

        String[] colunas = {"ID", "Nome", "Categoria", "Preço"};
        DefaultTableModel model = new DefaultTableModel(colunas, 0);

        for (Produto p : listaProdutos) {
            model.addRow(new Object[]{
                p.getId(),
                p.getNome(),
                p.getCategoria(), // Produto.getCategoria() -> String
                p.getPreco()
            });
        }

        JTListaDePreco.setModel(model);

    } catch (Exception e) {
        JOptionPane.showMessageDialog(this,
            "Erro ao carregar lista de preços: " + e.getMessage());
    }
}
    
    /**
     * Construtor alternativo da classe FrmListadePreco.
     * Permite inicializar a tela com um cliente RMI já existente.
     * 
     * @param clienteRMI Cliente RMI pré-configurado para comunicação com o servidor
     */
    public FrmListadePreco(ClienteRMI clienteRMI) {
        initComponents();
        this.clienteRMI = clienteRMI;
        conectarServidorRMI();
        carregarListaDePrecos();
    }
    
    /**
     * Conecta ao servidor RMI e inicializa o serviço de estoque.
     * Se o clienteRMI for null, cria uma nova instância.
     * Em caso de falha na conexão ou erro, exibe mensagem de erro ao usuário.
     */
    private void conectarServidorRMI() {
        try {
            if (clienteRMI == null)
                clienteRMI = new ClienteRMI();

            if (clienteRMI.conectar()) {
                estoqueService = clienteRMI.getService();
            } else {
                JOptionPane.showMessageDialog(this,
                        "Não foi possível conectar ao servidor RMI.");
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this,
                    "Erro ao conectar ao servidor: " + e.getMessage());
        }
    }

    
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        JBEditar = new javax.swing.JButton();
        JBFechar = new javax.swing.JButton();
        jSeparator1 = new javax.swing.JSeparator();
        jLabel1 = new javax.swing.JLabel();
        jScrollPane1 = new javax.swing.JScrollPane();
        JTListaDePreco = new javax.swing.JTable();

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);

        JBEditar.setText("Editar");
        JBEditar.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                JBEditarActionPerformed(evt);
            }
        });

        JBFechar.setBackground(new java.awt.Color(220, 53, 69));
        JBFechar.setText("Fechar");
        JBFechar.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                JBFecharActionPerformed(evt);
            }
        });

        jLabel1.setFont(new java.awt.Font("Segoe UI", 1, 18)); // NOI18N
        jLabel1.setText("Lista de Preços");

        JTListaDePreco.setModel(new javax.swing.table.DefaultTableModel(
            new Object [][] {
                {null, null, null, null, null},
                {null, null, null, null, null},
                {null, null, null, null, null},
                {null, null, null, null, null}
            },
            new String [] {
                "ID", "Nome", "Unidade", "Categoria", "Preço Unitário"
            }
        ));
        jScrollPane1.setViewportView(JTListaDePreco);

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(layout.createSequentialGroup()
                        .addGap(71, 71, 71)
                        .addComponent(jScrollPane1, javax.swing.GroupLayout.PREFERRED_SIZE, 422, javax.swing.GroupLayout.PREFERRED_SIZE))
                    .addComponent(jSeparator1, javax.swing.GroupLayout.PREFERRED_SIZE, 534, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addGap(0, 0, Short.MAX_VALUE))
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                        .addComponent(JBEditar)
                        .addGap(85, 85, 85)
                        .addComponent(JBFechar)
                        .addGap(138, 138, 138))
                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                        .addComponent(jLabel1)
                        .addGap(194, 194, 194))))
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addGap(19, 19, 19)
                .addComponent(jLabel1)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(jSeparator1, javax.swing.GroupLayout.PREFERRED_SIZE, 10, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(jScrollPane1, javax.swing.GroupLayout.PREFERRED_SIZE, 283, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(42, 42, 42)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(JBFechar, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addComponent(JBEditar))
                .addGap(38, 38, 38))
        );

        pack();
    }// </editor-fold>//GEN-END:initComponents
 
    /**
     * Manipula o evento de clique no botão Editar.
     * Verifica se uma linha foi selecionada na tabela, busca o produto
     * correspondente pelo ID e abre a tela de reajuste de preço.
     * Em caso de erro, exibe uma mensagem ao usuário.
     * 
     * @param evt Evento de ação do botão Editar
     */
    private void JBEditarActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_JBEditarActionPerformed
        int linha = JTListaDePreco.getSelectedRow();

        if (linha < 0) {
            JOptionPane.showMessageDialog(this, "Selecione um produto.");
            return;
        }

        int id = (int) JTListaDePreco.getValueAt(linha, 0);

        try {
            Produto produto = estoqueService.buscarProdutoPorId(id);

            FrmReajustarPreco tela =
                    new FrmReajustarPreco(clienteRMI, produto, this);

            tela.setVisible(true);

        } catch (Exception e) {
            JOptionPane.showMessageDialog(this,
                    "Erro ao abrir reajuste: " + e.getMessage());
        }
    }//GEN-LAST:event_JBEditarActionPerformed

    /**
     * Manipula o evento de clique no botão Fechar.
     * Fecha a tela atual, abre a tela de Relatório e libera os recursos da janela.
     * 
     * @param evt Evento de ação do botão Fechar
     */
    private void JBFecharActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_JBFecharActionPerformed
        FrmRelatorio relatorio = new FrmRelatorio();
        relatorio.setVisible(true);
        dispose();
    }//GEN-LAST:event_JBFecharActionPerformed

    /**
     * Método principal para execução da aplicação.
     * Configura o Look and Feel Nimbus e inicia a interface gráfica.
     * 
     * @param args Argumentos da linha de comando (não utilizados)
     */
    public static void main(String args[]) {
        /* Set the Nimbus look and feel */
        //<editor-fold defaultstate="collapsed" desc=" Look and feel setting code (optional) ">
        /* If Nimbus (introduced in Java SE 6) is not available, stay with the default look and feel.
         * For details see http://download.oracle.com/javase/tutorial/uiswing/lookandfeel/plaf.html 
         */
        try {
            for (javax.swing.UIManager.LookAndFeelInfo info : javax.swing.UIManager.getInstalledLookAndFeels()) {
                if ("Nimbus".equals(info.getName())) {
                    javax.swing.UIManager.setLookAndFeel(info.getClassName());
                    break;
                }
            }
        } catch (ClassNotFoundException ex) {
            java.util.logging.Logger.getLogger(FrmListadePreco.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (InstantiationException ex) {
            java.util.logging.Logger.getLogger(FrmListadePreco.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            java.util.logging.Logger.getLogger(FrmListadePreco.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (javax.swing.UnsupportedLookAndFeelException ex) {
            java.util.logging.Logger.getLogger(FrmListadePreco.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        }
        //</editor-fold>

        /* Create and display the form */
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new FrmListadePreco().setVisible(true);
            }
        });
    }

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JButton JBEditar;
    private javax.swing.JButton JBFechar;
    private javax.swing.JTable JTListaDePreco;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JScrollPane jScrollPane1;
    private javax.swing.JSeparator jSeparator1;
    // End of variables declaration//GEN-END:variables
}
