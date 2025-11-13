package cliente;

import java.rmi.Naming;
import service.EstoqueService;

/**
 * Classe responsável por gerenciar a conexão RMI com o servidor de estoque.
 * Fornece métodos para conectar, verificar conexão e obter o serviço remoto.
 * 
 * @author Sistema de Controle de Estoque
 * @version 1.0
 */
public class ClienteRMI {
    
    /**
     * Referência ao serviço remoto de estoque.
     */
    private EstoqueService estoqueService;
    
    /**
     * Endereço do servidor RMI.
     */
    private String host;
    
    /**
     * Porta do servidor RMI.
     */
    private int porta;
    
    /**
     * Indica se a conexão com o servidor está ativa.
     */
    private boolean conectado = false;
    
    /**
     * Construtor padrão que inicializa o cliente com localhost e porta padrão (1099).
     */
    public ClienteRMI() {
        this("localhost", 1099);
    }
    
    /**
     * Construtor que permite especificar host e porta do servidor RMI.
     * 
     * @param host Endereço do servidor RMI
     * @param porta Porta do servidor RMI
     */
    public ClienteRMI(String host, int porta) {
        this.host = host;
        this.porta = porta;
    }
    
    /**
     * Estabelece conexão com o servidor RMI e obtém referência ao serviço remoto.
     * 
     * @return true se a conexão foi estabelecida com sucesso, false caso contrário
     */
    public boolean conectar() {
        try {
            String url = "rmi://" + host + ":" + porta + "/EstoqueService";
            estoqueService = (EstoqueService) Naming.lookup(url);
            conectado = true;
            return true;
        } catch (Exception e) {
            conectado = false;
            return false;
        }
    }
    
    /**
     * Retorna a referência ao serviço remoto de estoque.
     * 
     * @return Referência ao EstoqueService ou null se não estiver conectado
     */
    public EstoqueService getService() {
        return estoqueService;
    }
    
    /**
     * Verifica se o cliente está conectado ao servidor RMI.
     * 
     * @return true se estiver conectado e o serviço estiver disponível, false caso contrário
     */
    public boolean estaConectado() {
        return conectado && estoqueService != null;
    }
    
    /**
     * Desconecta do servidor RMI, liberando a referência ao serviço remoto.
     */
    public void desconectar() {
        estoqueService = null;
        conectado = false;
    }
}

