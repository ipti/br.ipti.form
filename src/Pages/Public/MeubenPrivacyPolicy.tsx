import React from "react";

const containerStyle: React.CSSProperties = {
  maxWidth: 920,
  margin: "0 auto",
  padding: "32px 20px 56px",
  color: "#1f2937",
  lineHeight: 1.6,
};

const cardStyle: React.CSSProperties = {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: 24,
  boxShadow: "0 6px 24px rgba(15, 23, 42, 0.06)",
};

const titleStyle: React.CSSProperties = {
  marginTop: 0,
  marginBottom: 8,
  fontSize: 30,
  lineHeight: 1.2,
  color: "#0f172a",
};

const subtitleStyle: React.CSSProperties = {
  marginTop: 0,
  marginBottom: 24,
  fontSize: 14,
  color: "#475569",
};

const sectionTitleStyle: React.CSSProperties = {
  marginTop: 24,
  marginBottom: 8,
  fontSize: 18,
  color: "#0f172a",
};

const paragraphStyle: React.CSSProperties = {
  marginTop: 0,
  marginBottom: 10,
};

const listStyle: React.CSSProperties = {
  marginTop: 0,
  marginBottom: 14,
  paddingLeft: 24,
  listStylePosition: "outside",
};

const listItemStyle: React.CSSProperties = {
  marginBottom: 4,
  paddingLeft: 4,
};

const MeubenPrivacyPolicy = () => {
  return (
    <main style={{ background: "#f8fafc", maxHeight: "100vh", overflowY: "auto" }}>
      <div style={containerStyle}>
        <article style={cardStyle}>
          <h1 style={titleStyle}>Política de Privacidade - Meuben</h1>
          <p style={subtitleStyle}>Última atualização: 15 de abril de 2026</p>

          <p style={paragraphStyle}>
            Esta Política de Privacidade descreve como o aplicativo Meuben
            coleta, utiliza, armazena e protege dados pessoais dos usuários,
            nos termos da Lei Geral de Proteção de Dados (LGPD - Lei nº
            13.709/2018).
          </p>

          <h2 style={sectionTitleStyle}>1. Controlador</h2>
          <p style={paragraphStyle}>
            Responsável: The Human Project
            <br />
            Contato de privacidade: articulacao@tag.ong.br
          </p>

          <h2 style={sectionTitleStyle}>2. Dados que podem ser tratados</h2>
          <ul style={listStyle}>
            <li style={listItemStyle}>
              Dados de identificação e cadastro informados durante o uso do
              aplicativo.
            </li>
            <li style={listItemStyle}>
              Dados de uso e registros de atividades relacionadas aos encontros.
            </li>
            <li style={listItemStyle}>Imagens enviadas pelo usuário.</li>
            <li style={listItemStyle}>
              Dados técnicos do dispositivo para funcionamento, segurança e
              auditoria.
            </li>
          </ul>

          <h2 style={sectionTitleStyle}>3. Permissões do dispositivo</h2>
          <ul style={listStyle}>
            <li style={listItemStyle}>
              Câmera: utilizada quando o usuário escolhe tirar foto no
              aplicativo.
            </li>
            <li style={listItemStyle}>
              Galeria/arquivos de imagem: utilizada para anexar imagens já
              existentes.
            </li>
            <li style={listItemStyle}>
              Internet: utilizada para sincronização de dados e uso de serviços
              online.
            </li>
          </ul>

          <h2 style={sectionTitleStyle}>4. Finalidades do uso dos dados</h2>
          <ul style={listStyle}>
            <li style={listItemStyle}>Executar as funcionalidades do Meuben.</li>
            <li style={listItemStyle}>
              Registrar e organizar dados de encontros e anexos.
            </li>
            <li style={listItemStyle}>
              Sincronizar dados entre aplicativo e serviços de backend.
            </li>
            <li style={listItemStyle}>
              Garantir segurança, prevenção a fraudes e melhoria da aplicação.
            </li>
            <li style={listItemStyle}>
              Cumprir obrigações legais e regulatórias aplicáveis.
            </li>
          </ul>

          <h2 style={sectionTitleStyle}>5. Bases legais</h2>
          <p style={paragraphStyle}>
            O tratamento pode ocorrer com base em execução de contrato,
            cumprimento de obrigação legal, legítimo interesse e, quando
            necessário, consentimento do titular.
          </p>

          <h2 style={sectionTitleStyle}>6. Compartilhamento</h2>
          <p style={paragraphStyle}>
            Os dados podem ser compartilhados com provedores de tecnologia e
            serviços essenciais para operação do aplicativo, além de autoridades
            públicas quando houver obrigação legal. Não há comercialização de
            dados pessoais.
          </p>

          <h2 style={sectionTitleStyle}>7. Retenção e segurança</h2>
          <p style={paragraphStyle}>
            Os dados são mantidos pelo período necessário às finalidades desta
            política e obrigações legais. São adotadas medidas técnicas e
            administrativas para proteção contra acessos não autorizados,
            alteração, perda ou divulgação indevida.
          </p>

          <h2 style={sectionTitleStyle}>8. Direitos do titular</h2>
          <p style={paragraphStyle}>
            O titular pode solicitar confirmação de tratamento, acesso, correção,
            anonimização, bloqueio, eliminação, portabilidade quando aplicável e
            revogação de consentimento, nos termos da LGPD.
          </p>

          <h2 style={sectionTitleStyle}>9. Contato</h2>
          <p style={paragraphStyle}>
            Solicitações de privacidade podem ser enviadas para:
            <br />
            articulacao@tag.ong.br
          </p>

          <h2 style={sectionTitleStyle}>10. Atualizações</h2>
          <p style={paragraphStyle}>
            Esta política pode ser atualizada a qualquer momento. A versão
            vigente estará sempre disponível nesta página pública.
          </p>
        </article>
      </div>
    </main>
  );
};

export default MeubenPrivacyPolicy;
