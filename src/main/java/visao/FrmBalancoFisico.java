
package visao;

import cliente.ClienteRMI;
import modelo.Produto;
import service.EstoqueService;
import java.util.List;
import javax.swing.JOptionPane;
import javax.swing.table.DefaultTableModel;

/**
 * Classe que representa a tela de Balanço Físico e Financeiro do estoque.
 * Permite visualizar todos os produtos com suas quantidades e valores totais,
 * além de filtrar produtos por nome e calcular o valor total do estoque.
 * 
 * @author Sistema Distribuído
 * @version 1.0
 */
public class FrmBalancoFisico extends javax.swing.JFrame {
    
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
    private List<Produto> produtos;

    /**
     * Construtor padrão da classe FrmBalancoFisico.
     * Inicializa os componentes da interface, conecta ao servidor RMI
     * e carrega o balanço físico e financeiro.
     */
    public FrmBalancoFisico() {
        initComponents();
        conectarServidorRMI();
        carregarBalanco();
    }
    
    /**
     * Construtor alternativo da classe FrmBalancoFisico.
     * Permite inicializar a tela com um cliente RMI já existente.
     * 
     * @param clienteRMI Cliente RMI pré-configurado para comunicação com o servidor
     */
     public FrmBalancoFisico(ClienteRMI clienteRMI) {
        initComponents();
        this.clienteRMI = clienteRMI;
        conectarServidorRMI();
        carregarBalanco();
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
                        "Falha ao conectar com o servidor RMI.");
            }

        } catch (Exception e) {
            JOptionPane.showMessageDialog(this,
                    "Erro ao conectar: " + e.getMessage());
        }
    }


    
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        JTFBuscar = new javax.swing.JTextField();
        JBFiltrar = new javax.swing.JButton();
        jLabel2 = new javax.swing.JLabel();
        jSeparator2 = new javax.swing.JSeparator();
        jSeparator3 = new javax.swing.JSeparator();
        JLTotal = new javax.swing.JLabel();
        jLabel1 = new javax.swing.JLabel();
        JBFechar = new javax.swing.JButton();
        jSeparator1 = new javax.swing.JSeparator();
        jScrollPane1 = new javax.swing.JScrollPane();
        JTBalanco = new javax.swing.JTable();

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);

        JTFBuscar.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                JTFBuscarActionPerformed(evt);
            }
        });

        JBFiltrar.setText("Filtrar");
        JBFiltrar.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                JBFiltrarActionPerformed(evt);
            }
        });

        jLabel2.setText("Buscar:");

        JLTotal.setText("💰 Total do Estoque: R$ 0,00");

        jLabel1.setFont(new java.awt.Font("Segoe UI", 1, 18)); // NOI18N
        jLabel1.setText("Balanço Físico/Financeiro");

        JBFechar.setBackground(new java.awt.Color(220, 53, 69));
        JBFechar.setText("Fechar");
        JBFechar.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                JBFecharActionPerformed(evt);
            }
        });

        JTBalanco.setModel(new javax.swing.table.DefaultTableModel(
            new Object [][] {
                {null, null, null, null, null},
                {null, null, null, null, null},
                {null, null, null, null, null},
                {null, null, null, null, null}
            },
            new String [] {
                "Nome", "Categoria", "Quantidade Disponivel", "Preço Unitário", "Valor Total"
            }
        ));
        jScrollPane1.setViewportView(JTBalanco);

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(jSeparator1, javax.swing.GroupLayout.Alignment.TRAILING)
            .addComponent(jSeparator3, javax.swing.GroupLayout.Alignment.TRAILING)
            .addComponent(jSeparator2)
            .addGroup(layout.createSequentialGroup()
                .addGap(242, 242, 242)
                .addComponent(jLabel2)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addComponent(JTFBuscar, javax.swing.GroupLayout.PREFERRED_SIZE, 239, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(24, 24, 24)
                .addComponent(JBFiltrar)
                .addGap(0, 0, Short.MAX_VALUE))
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                .addContainerGap(194, Short.MAX_VALUE)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                        .addComponent(jScrollPane1, javax.swing.GroupLayout.PREFERRED_SIZE, 796, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGap(131, 131, 131))
                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                        .addComponent(jLabel1)
                        .addGap(416, 416, 416))
                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                        .addComponent(JLTotal)
                        .addGap(468, 468, 468))
                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                        .addComponent(JBFechar)
                        .addGap(503, 503, 503))))
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addGap(21, 21, 21)
                .addComponent(jLabel1)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addComponent(jSeparator1, javax.swing.GroupLayout.PREFERRED_SIZE, 11, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 45, Short.MAX_VALUE)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(JTFBuscar, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(jLabel2)
                    .addComponent(JBFiltrar))
                .addGap(18, 18, 18)
                .addComponent(jScrollPane1, javax.swing.GroupLayout.PREFERRED_SIZE, 283, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(39, 39, 39)
                .addComponent(jSeparator2, javax.swing.GroupLayout.PREFERRED_SIZE, 10, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addComponent(JLTotal)
                .addGap(13, 13, 13)
                .addComponent(jSeparator3, javax.swing.GroupLayout.PREFERRED_SIZE, 10, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(18, 18, 18)
                .addComponent(JBFechar)
                .addGap(37, 37, 37))
        );

        pack();
    }// </editor-fold>//GEN-END:initComponents

    /**
     * Carrega o balanço físico e financeiro do estoque.
     * Busca todos os produtos e exibe na tabela com as informações:
     * ID, Nome, Categoria, Preço, Quantidade e Subtotal.
     * Calcula e exibe o valor total do estoque.
     * Em caso de erro, exibe uma mensagem ao usuário.
     */
private void carregarBalanco() {
        try {
            produtos = estoqueService.listarProdutos();

            String[] colunas = {
                "ID", "Nome", "Categoria", "Preço", "Quantidade", "Subtotal"
            };

            DefaultTableModel model = new DefaultTableModel(colunas, 0);

            double total = 0.0;

            for (Produto p : produtos) {
                double subtotal = p.getPreco() * p.getQuantidade();
                total += subtotal;

                model.addRow(new Object[]{
                    p.getId(),
                    p.getNome(),
                    p.getCategoria(),
                    p.getPreco(),
                    p.getQuantidade(),
                    subtotal
                });
            }

            JTBalanco.setModel(model);
            JLTotal.setText("R$ " + total);

        } catch (Exception e) {
            JOptionPane.showMessageDialog(this,
                    "Erro ao carregar balanço: " + e.getMessage());
        }
    }

    /**
     * Filtra o balanço por nome de produto.
     * Busca produtos cujo nome contenha o texto digitado no campo de busca
     * e atualiza a tabela e o valor total com os produtos filtrados.
     * Em caso de erro, exibe uma mensagem ao usuário.
     */
private void filtrarBalanco() {
        try {
            String busca = JTFBuscar.getText().trim().toLowerCase();

            String[] colunas = {
                "ID", "Nome", "Categoria", "Preço", "Quantidade", "Subtotal"
            };

            DefaultTableModel model = new DefaultTableModel(colunas, 0);

            double total = 0.0;

            for (Produto p : produtos) {
                if (p.getNome().toLowerCase().contains(busca)) {

                    double subtotal = p.getPreco() * p.getQuantidade();
                    total += subtotal;

                    model.addRow(new Object[]{
                        p.getId(),
                        p.getNome(),
                        p.getCategoria(),
                        p.getPreco(),
                        p.getQuantidade(),
                        subtotal
                    });
                }
            }

            JTBalanco.setModel(model);
            JLTotal.setText("R$ " + total);

        } catch (Exception e) {
            JOptionPane.showMessageDialog(this,
                    "Erro ao filtrar: " + e.getMessage());
        }
    }

    /**
     * Manipula o evento de digitação no campo de busca.
     * Método vazio, mantido para compatibilidade com o NetBeans Form Editor.
     * 
     * @param evt Evento de ação do campo de busca
     */
    private void JTFBuscarActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_JTFBuscarActionPerformed

    }//GEN-LAST:event_JTFBuscarActionPerformed

    /**
     * Manipula o evento de clique no botão Filtrar.
     * Executa a filtragem do balanço baseado no texto digitado.
     * 
     * @param evt Evento de ação do botão Filtrar
     */
    private void JBFiltrarActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_JBFiltrarActionPerformed
        filtrarBalanco();
    }//GEN-LAST:event_JBFiltrarActionPerformed

    /**
     * Manipula o evento de clique no botão Fechar.
     * Fecha a tela e libera os recursos da janela.
     * 
     * @param evt Evento de ação do botão Fechar
     */
    private void JBFecharActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_JBFecharActionPerformed
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
            java.util.logging.Logger.getLogger(FrmBalancoFisico.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (InstantiationException ex) {
            java.util.logging.Logger.getLogger(FrmBalancoFisico.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            java.util.logging.Logger.getLogger(FrmBalancoFisico.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (javax.swing.UnsupportedLookAndFeelException ex) {
            java.util.logging.Logger.getLogger(FrmBalancoFisico.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        }
        //</editor-fold>

        /* Create and display the form */
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new FrmBalancoFisico().setVisible(true);
            }
        });
    }

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JButton JBFechar;
    private javax.swing.JButton JBFiltrar;
    private javax.swing.JLabel JLTotal;
    private javax.swing.JTable JTBalanco;
    private javax.swing.JTextField JTFBuscar;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JScrollPane jScrollPane1;
    private javax.swing.JSeparator jSeparator1;
    private javax.swing.JSeparator jSeparator2;
    private javax.swing.JSeparator jSeparator3;
    // End of variables declaration//GEN-END:variables
}
