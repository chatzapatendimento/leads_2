document.addEventListener('DOMContentLoaded', () => {
    const chatChamada = document.getElementById('chat-call');
    const chatJa = document.getElementById('chat-now');
    const profileContainer = document.querySelector('.profile-container');
    const chatBubble = document.querySelector('.chat-bubble');
    const chatCloseBtn = document.querySelector('.chat-close-btn');

    console.log('Chat Bubble:', chatBubble);
    console.log('Chat Close Button:', chatCloseBtn);

    let isTypebotClosed = false; // Flag para controlar a reabertura
    let isTypebotOpen = false; // Flag para controlar se o Typebot está aberto

    // Função para adicionar evento de fechar
    const setupCloseButton = () => {
        const closeBtn = chatBubble.querySelector('.chat-close-btn');
        if (closeBtn) {
            closeBtn.onclick = (event) => {
                event.stopPropagation();
                chatBubble.style.display = 'none';
            };
        }
    };

    // Configurar evento inicial
    setupCloseButton();

    // Observar mudanças no conteúdo da bolha
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                // Reconfigurar evento de fechar sempre que o conteúdo mudar
                setupCloseButton();
            }
        });
    });

    // Iniciar observação
    observer.observe(chatBubble, { 
        childList: true, 
        subtree: true 
    });

    // Evento simples de fechar a bolha
    if (chatCloseBtn) {
        chatCloseBtn.addEventListener('click', (event) => {
            console.log('Botão de fechar clicado!');
            event.stopPropagation(); // Impedir propagação do evento
            if (chatBubble) {
                chatBubble.style.display = 'none';
            }
        });
    } else {
        console.error('Botão de fechar não encontrado!');
    }

    const startChatCallSequence = () => {
        if (chatBubble) {
            chatBubble.innerHTML = `
                <span class="chat-close-btn">&times;</span>
                <div class="typing-dots">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
            `;

            // Após 3 segundos, substituir bolha pela mensagem
            setTimeout(() => {
                chatBubble.innerHTML = `
                    <span class="chat-close-btn">&times;</span>
                    <p>
                        Quer <strong>Começar</strong> seu <strong>Teste Grátis</strong> da Plataforma? 
                        <span class="emoji">😄</span>
                    </p>
                `;
            }, 3000);
        }
    };

    // Função para fechar completamente o chat call
    const closeChatCall = () => {
        if (chatChamada) chatChamada.style.display = 'none';
        if (chatBubble) chatBubble.style.display = 'none';
        if (profileContainer) profileContainer.style.display = 'none';
        if (chatJa) chatJa.style.display = 'none';
    };

    // Função para inicializar o Typebot e abrir diretamente
    const initializeTypebot = () => {
        // Verifica se o Typebot já foi fechado ou já está aberto
        if (isTypebotClosed || isTypebotOpen) return;

        if (window.Typebot) {
            console.log("Inicializando Typebot...");
            
            // Fecha completamente o chat call
            closeChatCall();

            Typebot.initBubble({
                typebot: "my-typebot-2usgp7j",
                theme: {
                    button: {
                        backgroundColor: "#B30400",
                        customIconSrc: "https://s3.typebot.io/public/workspaces/cm1phfshl003t3eii8w05yvqa/typebots/cm2uxrjgl000114hkqz5xo2ta/blocks/phehu4kfk6fvxk7f0qr2h17y?v=1734639126382",
                        size: "large"
                    }
                }
            });

            // Abrir o Typebot imediatamente
            Typebot.open();
            document.body.classList.add('typebot-active');
            isTypebotOpen = true;
            isTypebotClosed = false;
        } else {
            console.error("Typebot não está disponível no momento.");
        }
    };

    // Adicionar evento de clique ao Chat Call para abrir o Typebot
    if (chatChamada) {
        chatChamada.addEventListener('click', (event) => {
            // Verifica se não é o botão de fechar
            if (!event.target.classList.contains('chat-close-btn')) {
                console.log("Chat Call clicado!");
                initializeTypebot();
            }
        });
    }

    // Adicionar evento de clique ao avatar para abrir o Typebot
    if (profileContainer) {
        profileContainer.addEventListener('click', (event) => {
            // Verifica se não é o botão de fechar
            if (!event.target.classList.contains('chat-close-btn')) {
                initializeTypebot();
            }
        });
    }

    // Restaurar comportamento após fechar o Typebot
    if (window.Typebot) {
        Typebot.onClose(() => {
            isTypebotClosed = true;
            isTypebotOpen = false;
            document.body.classList.remove('typebot-active');
            
            // Voltar ao estado inicial do chat
            if (chatChamada) chatChamada.style.display = 'flex';
            if (chatBubble) {
                chatBubble.style.display = 'flex';
                // Recriar o botão de fechar
                chatBubble.innerHTML = `
                    <span class="chat-close-btn">&times;</span>
                    <p>
                        Quer <strong>Começar</strong> seu <strong>Teste Grátis</strong> da Plataforma? 
                        <span class="emoji">😄</span>
                    </p>
                `;
            }
            if (profileContainer) profileContainer.style.display = 'flex';

            // Impede reabertura imediata
            setTimeout(() => {
                isTypebotClosed = false;
            }, 1000);
        });
    }

    // Iniciar a sequência do chat de chamada
    startChatCallSequence();
});
