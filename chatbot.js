// leitor de qr code
const qrcode = require('qrcode-terminal');
const { Client, Buttons, List, MessageMedia } = require('whatsapp-web.js'); // Mudança Buttons
const client = new Client();
// serviço de leitura do qr code
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});
// apos isso ele diz que foi tudo certo
client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
});
// E inicializa tudo 
client.initialize();

const delay = ms => new Promise(res => setTimeout(res, ms)); // Função que usamos para criar o delay entre uma ação e outra

// Constantes para mensagens e links
const CONSTANTS = {
    GROUP_LINK: 'https://chat.whatsapp.com/IJXALiCCXNf8Mjf3FsoDB8',
    BOSS_LINE: '841006962',  // Linha principal do boss
    SUPPORT_LINES: [
        '841006962', // Boss
        '856108983',
        '842131520',
        '841678338',
        '844809754',
        '847733693'
    ],
    PAYMENT_INFO: 'Formas de pagamento:\nM-Pesa\n841006962\nM-Mola\n874006962\nBIM\n897555842\nALCIDIO RUBEN MACUACUA'
};

// Adicionando constantes para personalização do bot
const BOT_CONFIG = {
    name: 'Alcidio',
    description: 'seu assistente virtual de vendas de pacotes'
};

// Função para obter saudação baseada na hora
function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
}

client.on('message', async msg => {
    try {
        const saudacoes = msg.body.toLowerCase().trim();
        if ((saudacoes.match(/^(menu|oi|ola|olá|bom dia|boa tarde|boa noite|que)$/i) || 
            saudacoes === 'dia' || 
            saudacoes === 'tarde' || 
            saudacoes === 'noite') && 
            msg.from.endsWith('@c.us')) {
            
            const chat = await msg.getChat();
            const contact = await msg.getContact();
            const name = contact.pushname || 'Cliente';

            await delay(1500);
            await chat.sendStateTyping();
            await delay(1500);

            await client.sendMessage(msg.from, 
                `${getGreeting()}, ${name}! Eu sou o ${BOT_CONFIG.name}, ${BOT_CONFIG.description}. 😊\n\n` +
                `*MENU PRINCIPAL*\n\n` +
                `1 - Como funciona\n` +
                `2 - Pacotes de Internet\n` +
                `3 - Pacotes de Chamadas\n` +
                `4 - Entrar no Grupo\n` +
                `5 - Outras perguntas`
            );
        }

        // Processar apenas as opções do menu (1-5)
        if (msg.body === '1' && msg.from.endsWith('@c.us')) {
            const chat = await msg.getChat();

            await delay(2000);
            await chat.sendStateTyping();
            await delay(2000);
            
            // Primeira mensagem - explicação clara do processo
            await client.sendMessage(msg.from, 
                `É muito simples! 😊\n\n1️⃣ Escolha seu pacote\n2️⃣ Faça o pagamento\n3️⃣ Envie o comprovante no grupo\n4️⃣ Informe o número que receberá o pacote\n\nPronto! Ativaremos seu pacote rapidamente! 🚀`
            );

            await delay(2000);
            await chat.sendStateTyping();
            await delay(2000);
            
            // Segunda mensagem - informações de pagamento
            await client.sendMessage(msg.from, CONSTANTS.PAYMENT_INFO);

            await delay(2000);
            await chat.sendStateTyping();
            await delay(2000);
            
            // Terceira mensagem - links importantes
            await client.sendMessage(msg.from, 
                `✨ Para finalizar, entre no nosso grupo:\n${CONSTANTS.GROUP_LINK}\n\n📞 Precisa de ajuda? Contate nosso suporte:\n${CONSTANTS.BOSS_LINE}`
            );
        }
        if (msg.body === '2' && msg.from.endsWith('@c.us')) {
            const chat = await msg.getChat();

            // Pacotes Diários
            await delay(1500);
            await chat.sendStateTyping();
            await delay(1500);
            
            await client.sendMessage(msg.from, 
                `━━━━ *PACOTES DIÁRIOS* ━━━━\n` +
                `          💫 *INTERNET* 💫\n\n` +
                ` *Pacotes Leves*\n` +
                `• *5MT* = _250MB_\n` +
                `• *10MT* = _512MB_\n` +
                `• *15MT* = _850MB_\n\n` +
                `📱 *Pacotes Médios*\n` +
                `• *18MT* = _1024MB_\n` +
                `• *30MT* = _1707MB_\n` +
                `• *50MT* = _2844MB_ 🏆\n\n` +
                `📱 *Pacotes Plus*\n` +
                `• *80MT* = _4551MB_\n` +
                `• *100MT* = _5698MB_\n` +
                `• *150MT* = _8533MB_\n\n` +
                `_Aguarde para ver os pacotes semanais..._`
            );

            // Pacotes Semanais
            await delay(2000);
            await chat.sendStateTyping();
            await delay(2000);

            await client.sendMessage(msg.from, 
                `━━━━ *PACOTES SEMANAIS* ━━━━\n` +
                `         🌟 *7 DIAS* 🌟\n\n` +
                `📡 *Pacotes Básicos*\n` +
                `• *27MT* = _857MB_\n` +
                `• *44MT* = _1.7GB_\n` +
                `• *73MT* = _2.9GB_\n\n` +
                `📡 *Pacotes Intermédios*\n` +
                `• *85MT* = _3.4GB_\n` +
                `• *126MT* = _5.2GB_ 🏆\n` +
                `• *170MT* = _7.1GB_\n\n` +
                `📡 *Pacotes Avançados*\n` +
                `• *255MT* = _10.7GB_\n` +
                `• *340MT* = _14.3GB_\n\n` +
                `_Aguarde para ver os pacotes mensais..._`
            );

            // Pacotes Mensais
            await delay(2000);
            await chat.sendStateTyping();
            await delay(2000);

            await client.sendMessage(msg.from, 
                `━━━━ *PACOTES MENSAIS* ━━━━\n` +
                `         ⭐ *30 DIAS* ⭐\n\n` +
                `🚀 *Pacotes Económicos*\n` +
                `• *87MT* = _2.8GB_\n` +
                `• *200MT* = _7GB_\n\n` +
                ` *Pacotes Premium*\n` +
                `• *280MT* = _12GB_\n` +
                `• *450MT* = _20GB_ 🏆\n` +
                `🚀 *Pacotes Ultra*\n` +
                `• *750MT* = _34GB_\n` +
                `• *880MT* = _40GB_`
            );

            // Mensagem final
            await delay(1500);
            await chat.sendStateTyping();
            await delay(1500);
            
            await client.sendMessage(msg.from, 
                `━━━━ *COMO ACTIVAR* ━━━━\n\n` +
                `*1.* _Escolha seu pacote preferido_\n` +
                `*2.* _Entre no grupo:_\n` +
                `   ${CONSTANTS.GROUP_LINK}\n\n` +
                `*3.* _Precisa de ajuda?_\n` +
                `   📞 *${CONSTANTS.BOSS_LINE}*\n\n` +
                `🏆 = _Pacotes mais vendidos_`
            );
        }
        if (msg.body === '3' && msg.from.endsWith('@c.us')) {
            const chat = await msg.getChat();

            await delay(1500);
            await chat.sendStateTyping();
            await delay(1500);

            await client.sendMessage(msg.from, 
                `━━━━ *PACOTES ILIMITADOS* ━━━━\n` +
                `        🌟 *30 DIAS* 🌟\n\n` +
                `📞 *Pacote Bronze*\n` +
                `• *1. 450MT*\n` +
                `  _11GB de Internet_\n` +
                `  _Chamadas Ilimitadas_\n` +
                `  _SMS Ilimitadas_\n\n` +
                `📞 *Pacote Prata*\n` +
                `• *2. 500MT*\n` +
                `  _15GB de Internet_\n` +
                `  _Chamadas Ilimitadas_\n` +
                `  _SMS Ilimitadas_\n\n` +
                `📞 *Pacote Ouro* 🏆\n` +
                `• *3. 800MT*\n` +
                `  _31GB de Internet_\n` +
                `  _Chamadas Ilimitadas_\n` +
                `  _SMS Ilimitadas_\n\n` +
                `📞 *Pacote Diamante*\n` +
                `• *4. 950MT*\n` +
                `  _41GB de Internet_\n` +
                `  _Chamadas Ilimitadas_\n` +
                `  _SMS Ilimitadas_`
            );
            
            await delay(1500);
            await chat.sendStateTyping();
            await delay(1500);

            await client.sendMessage(msg.from, 
                `━━━━ *COMO ACTIVAR* ━━━━\n\n` +
                `*1.* _Escolha seu pacote preferido_\n` +
                `*2.* _Entre no grupo:_\n` +
                `   ${CONSTANTS.GROUP_LINK}\n\n` +
                `*3.* _Precisa de ajuda?_\n` +
                `   📞 *${CONSTANTS.BOSS_LINE}*\n\n` +
                `🏆 = _Pacote mais vendido_`
            );
        }
        if (msg.body === '4' && msg.from.endsWith('@c.us')) {
            const chat = await msg.getChat();

            await delay(3000); //delay de 3 segundos
            await chat.sendStateTyping(); // Simulando Digitação
            await delay(3000);
            await client.sendMessage(msg.from, `Link do grupo: ${CONSTANTS.GROUP_LINK}\nLinha do Apoio: ${CONSTANTS.BOSS_LINE}`);
        }
        if (msg.body === '5' && msg.from.endsWith('@c.us')) {
            const chat = await msg.getChat();

            await delay(3000);
            await chat.sendStateTyping();
            await delay(3000);
            
            const supportMessage = `Nossos atendentes estão prontos para te ajudar! 🤝\n\n` +
                `👑 Atendente Principal:\n📞 @${CONSTANTS.BOSS_LINE}\n\n` +
                `Outros atendentes disponíveis:\n` +
                CONSTANTS.SUPPORT_LINES.slice(1).map(number => `📞 @${number}`).join('\n') +
                `\n\nVocê também pode nos encontrar no grupo:\n${CONSTANTS.GROUP_LINK}`;

            await client.sendMessage(msg.from, supportMessage);
        }

    } catch (error) {
        console.error('Erro:', error);
        // Mantém o log de erro mas não envia mensagem para o usuário
    }
});

// Função para verificar se o número está na blacklist
const blacklistedNumbers = new Set();
async function isBlacklisted(number) {
    return blacklistedNumbers.has(number);
}

// Middleware para verificar mensagens antes de processar
client.on('message_create', async (msg) => {
    if (await isBlacklisted(msg.from)) {
        console.log(`Mensagem bloqueada do número: ${msg.from}`);
        return;
    }
    // Continua o processamento normal da mensagem
});