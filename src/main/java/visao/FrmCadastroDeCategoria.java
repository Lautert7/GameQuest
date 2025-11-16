
package visao;

import cliente.ClienteRMI;
import service.EstoqueService;
import javax.swing.JOptionPane;
import modelo.Categoria;

/**
 * Classe que representa a tela de Cadastro e Edição de Categoria.
 * Permite criar novas categorias e editar categorias existentes,
 * definindo nome, tamanho e embalagem.
 * 
 * @author Sistema Distribuído
 * @version 1.0
 */
public class FrmCadastroDeCategoria extends javax.swing.JFrame {
    /**
     * Cliente RMI utilizado para comunicação com o servidor.
     */
    private ClienteRMI clienteRMI;
    
    /**
     * Serviço de estoque utilizado para operações relacionadas às categorias.
     */
    private EstoqueService estoqueService;
    
    /**
     * Categoria em modo de edição. Null quando está criando uma nova categoria.
     */
    private Categoria categoriaEdicao = null;
    
    /**
     * Construtor padrão da classe FrmCadastroDeCategoria.
     * Inicializa os componentes da interface e conecta ao servidor RMI.
     */
    public FrmCadastroDeCategoria() {
        initComponents();
        conectarServidorRMI();
    }
    
    /**
     * Construtor alternativo da classe FrmCadastroDeCategoria.
     * Permite inicializar a tela com um cliente RMI já existente.
     * 
     * @param clienteRMI Cliente RMI pré-configurado para comunicação com o servidor
     */
    public FrmCadastroDeCategoria(ClienteRMI clienteRMI) {
    initComponents();
    this.clienteRMI = clienteRMI;
    conectarServidorRMI();
}
    
    /**
     * Construtor para modo de edição de categoria.
     * Permite inicializar a tela com uma categoria existente para edição.
     * 
     * @param clienteRMI Cliente RMI pré-configurado para comunicação com o servidor
     * @param categoria Categoria a ser editada
     */
     public FrmCadastroDeCategoria(ClienteRMI clienteRMI, Categoria categoria) {
        initComponents();
        this.clienteRMI = clienteRMI;
        this.categoriaEdicao = categoria;
        conectarServidorRMI();
        carregarDadosEdicao();
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
     
    /**
     * Carrega os dados da categoria em modo de edição nos campos do formulário.
     * Preenche os campos com nome, tamanho e embalagem da categoria.
     */
     private void carregarDadosEdicao() {
        if (categoriaEdicao != null) {
            JTFNomeCategoria.setText(categoriaEdicao.getNomeCategoria());
            JCBTamanho.setSelectedItem(categoriaEdicao.getTamanho());
            JCBEmbalagem.setSelectedItem(categoriaEdicao.getEmbalagem());
        }
    }

    
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        JBSalvar = new javax.swing.JButton();
        JBLimpar = new javax.swing.JButton();
        jLabel1 = new javax.swing.JLabel();
        JBCancelar = new javax.swing.JButton();
        jLabel2 = new javax.swing.JLabel();
        jSeparator1 = new javax.swing.JSeparator();
        jLabel3 = new javax.swing.JLabel();
        jLabel4 = new javax.swing.JLabel();
        JTFNomeCategoria = new javax.swing.JTextField();
        JCBTamanho = new javax.swing.JComboBox<>();
        JCBEmbalagem = new javax.swing.JComboBox<>();
        jSeparator2 = new javax.swing.JSeparator();

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);

        JBSalvar.setText("💾 Salvar");
        JBSalvar.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                JBSalvarActionPerformed(evt);
            }
        });

        JBLimpar.setText("🗑️ Limpar");
        JBLimpar.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                JBLimparActionPerformed(evt);
            }
        });

        jLabel1.setFont(new java.awt.Font("Segoe UI", 1, 18)); // NOI18N
        jLabel1.setText("Cadastro de Categoria");

        JBCancelar.setText("✖ Cancelar");
        JBCancelar.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                JBCancelarActionPerformed(evt);
            }
        });

        jLabel2.setFont(new java.awt.Font("Segoe UI", 1, 12)); // NOI18N
        jLabel2.setText("Nome da Categoria:");

        jLabel3.setFont(new java.awt.Font("Segoe UI", 1, 12)); // NOI18N
        jLabel3.setText("Tamanho:");

        jLabel4.setFont(new java.awt.Font("Segoe UI", 1, 12)); // NOI18N
        jLabel4.setText("Embalagem:");

        JTFNomeCategoria.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                JTFNomeCategoriaActionPerformed(evt);
            }
        });

        JCBTamanho.setModel(new javax.swing.DefaultComboBoxModel<>(new String[] { "Pequeno", "Médio", "Grande" }));
        JCBTamanho.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                JCBTamanhoActionPerformed(evt);
            }
        });

        JCBEmbalagem.setModel(new javax.swing.DefaultComboBoxModel<>(new String[] { "Lata", "Vidro", "Plástico", " " }));

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(jSeparator1)
            .addComponent(jSeparator2)
            .addGroup(layout.createSequentialGroup()
                .addGap(48, 48, 48)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(jLabel3)
                    .addComponent(jLabel2)
                    .addComponent(jLabel4))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(JCBEmbalagem, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(JCBTamanho, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(JTFNomeCategoria, javax.swing.GroupLayout.PREFERRED_SIZE, 100, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addGap(0, 0, Short.MAX_VALUE))
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                .addContainerGap(98, Short.MAX_VALUE)
                .addComponent(JBSalvar)
                .addGap(83, 83, 83)
                .addComponent(JBLimpar)
                .addGap(74, 74, 74)
                .addComponent(JBCancelar)
                .addGap(105, 105, 105))
            .addGroup(layout.createSequentialGroup()
                .addGap(211, 211, 211)
                .addComponent(jLabel1)
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addGap(20, 20, 20)
                .addComponent(jLabel1)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(jSeparator1, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(57, 57, 57)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jLabel2)
                    .addComponent(JTFNomeCategoria, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addGap(33, 33, 33)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jLabel3)
                    .addComponent(JCBTamanho, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addGap(36, 36, 36)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                    .addComponent(jLabel4)
                    .addComponent(JCBEmbalagem, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 66, Short.MAX_VALUE)
                .addComponent(jSeparator2, javax.swing.GroupLayout.PREFERRED_SIZE, 10, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(JBSalvar)
                    .addComponent(JBLimpar)
                    .addComponent(JBCancelar))
                .addGap(14, 14, 14))
        );

        pack();
    }// </editor-fold>//GEN-END:initComponents

    /**
     * Manipula o evento de clique no botão Salvar.
     * Valida os campos e salva a categoria (criação ou atualização)
     * no servidor através do serviço de estoque.
     * 
     * @param evt Evento de ação do botão Salvar
     */
    private void JBSalvarActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_JBSalvarActionPerformed

        String nome = JTFNomeCategoria.getText().trim();
        String tamanho = (String) JCBTamanho.getSelectedItem();
        String embalagem = (String) JCBEmbalagem.getSelectedItem();

        if (nome.isEmpty()) {
            JOptionPane.showMessageDialog(this,
                "Informe o nome da categoria.");
            return;
        }

        try {

            if (categoriaEdicao == null) {
    // Criação
    Categoria nova = new Categoria(0, nome, tamanho, embalagem);
    estoqueService.criarCategoria(nova);
    JOptionPane.showMessageDialog(this,
        "Categoria cadastrada com sucesso!");

} else {
    // Edição
    categoriaEdicao.setNomeCategoria(nome);
    categoriaEdicao.setTamanho(tamanho);
    categoriaEdicao.setEmbalagem(embalagem);

    estoqueService.atualizarCategoria(categoriaEdicao);

    JOptionPane.showMessageDialog(this,
        "Categoria atualizada com sucesso!");
}

            dispose();

        } catch (Exception e) {
            JOptionPane.showMessageDialog(this,
                "Erro ao salvar categoria: " + e.getMessage());
        }
    }//GEN-LAST:event_JBSalvarActionPerformed

    /**
     * Manipula o evento de clique no botão Limpar.
     * Limpa todos os campos do formulário e reseta o modo de edição.
     * 
     * @param evt Evento de ação do botão Limpar
     */
    private void JBLimparActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_JBLimparActionPerformed
         JTFNomeCategoria.setText("");
        JCBTamanho.setSelectedIndex(0);
        JCBEmbalagem.setSelectedIndex(0);
        categoriaEdicao = null;
    }//GEN-LAST:event_JBLimparActionPerformed

    /**
     * Manipula o evento de clique no botão Cancelar.
     * Fecha a tela sem salvar alterações.
     * 
     * @param evt Evento de ação do botão Cancelar
     */
    private void JBCancelarActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_JBCancelarActionPerformed
        dispose();
    }//GEN-LAST:event_JBCancelarActionPerformed

    /**
     * Manipula o evento do campo de texto Nome da Categoria.
     * Método vazio, mantido para compatibilidade com o NetBeans Form Editor.
     * 
     * @param evt Evento de ação do campo de texto
     */
    private void JTFNomeCategoriaActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_JTFNomeCategoriaActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_JTFNomeCategoriaActionPerformed

    /**
     * Manipula o evento do combo box Tamanho.
     * Método vazio, mantido para compatibilidade com o NetBeans Form Editor.
     * 
     * @param evt Evento de ação do combo box
     */
    private void JCBTamanhoActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_JCBTamanhoActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_JCBTamanhoActionPerformed

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
            java.util.logging.Logger.getLogger(FrmCadastroDeCategoria.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (InstantiationException ex) {
            java.util.logging.Logger.getLogger(FrmCadastroDeCategoria.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            java.util.logging.Logger.getLogger(FrmCadastroDeCategoria.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (javax.swing.UnsupportedLookAndFeelException ex) {
            java.util.logging.Logger.getLogger(FrmCadastroDeCategoria.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        }
        //</editor-fold>

        /* Create and display the form */
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new FrmCadastroDeCategoria().setVisible(true);
            }
        });
    }

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JButton JBCancelar;
    private javax.swing.JButton JBLimpar;
    private javax.swing.JButton JBSalvar;
    private javax.swing.JComboBox<String> JCBEmbalagem;
    private javax.swing.JComboBox<String> JCBTamanho;
    private javax.swing.JTextField JTFNomeCategoria;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JLabel jLabel3;
    private javax.swing.JLabel jLabel4;
    private javax.swing.JSeparator jSeparator1;
    private javax.swing.JSeparator jSeparator2;
    // End of variables declaration//GEN-END:variables
}
