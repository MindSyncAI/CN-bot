// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
});

// Create background elements
function createBackgroundElements() {
    const backgroundAnimation = document.getElementById('backgroundAnimation');
    
    // Create network nodes and connections
    const nodes = [];
    
    // Create 20 network nodes
    for (let i = 0; i < 20; i++) {
        const node = document.createElement('div');
        node.className = 'network-node';
        
        // Size between 4px and 10px
        const size = 4 + Math.random() * 6;
        node.style.width = `${size}px`;
        node.style.height = `${size}px`;
        
        // Position
        const posX = 10 + Math.random() * 80;
        const posY = 10 + Math.random() * 80;
        node.style.left = `${posX}vw`;
        node.style.top = `${posY}vh`;
        
        // Animation delay
        node.style.animationDelay = `${Math.random() * 3}s`;
        
        backgroundAnimation.appendChild(node);
        
        // Store node positions for creating connections
        nodes.push({ x: posX, y: posY, element: node });
    }
    
    // Create connections between nodes (network lines)
    for (let i = 0; i < nodes.length; i++) {
        // Connect to 2-3 closest nodes
        const connections = Math.floor(2 + Math.random() * 2);
        
        for (let j = 0; j < connections; j++) {
            if (i + j + 1 < nodes.length) {
                const nodeA = nodes[i];
                const nodeB = nodes[i + j + 1];
                
                // Calculate distance and angle
                const dx = (nodeB.x - nodeA.x) * window.innerWidth / 100;
                const dy = (nodeB.y - nodeA.y) * window.innerHeight / 100;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                
                // Create line
                const line = document.createElement('div');
                line.className = 'network-line';
                line.style.width = `${distance}px`;
                line.style.left = `${nodeA.x}vw`;
                line.style.top = `${nodeA.y}vh`;
                line.style.transform = `rotate(${angle}deg)`;
                line.style.animationDelay = `${Math.random() * 2}s`;
                
                backgroundAnimation.appendChild(line);
            }
        }
    }
    
    // Create signal waves that expand outward
    for (let i = 0; i < 8; i++) {
        const wave = document.createElement('div');
        wave.className = 'signal-wave';
        
        // Position
        wave.style.left = `${10 + Math.random() * 80}vw`;
        wave.style.top = `${10 + Math.random() * 80}vh`;
        
        // Animation delay
        wave.style.animationDelay = `${i * 0.5}s`;
        
        backgroundAnimation.appendChild(wave);
    }
    
    // Create digital streams (binary, hex, etc)
    for (let i = 0; i < 15; i++) {
        const digitalStream = document.createElement('div');
        digitalStream.className = 'digital-stream';
        
        // Create random digital string (01s, hex, IP addresses)
        const streamTypes = [
            // Binary
            () => Array(10).fill(0).map(() => Math.round(Math.random())).join(''),
            // Hex
            () => Array(8).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
            // IP-like
            () => `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
            // Protocol-like
            () => ['HTTP', 'TCP', 'IP', 'UDP', 'DNS', 'ARP', 'MAC'][Math.floor(Math.random() * 7)]
        ];
        
        const chosenType = streamTypes[Math.floor(Math.random() * streamTypes.length)];
        digitalStream.textContent = chosenType();
        
        // Set random position and animation
        digitalStream.style.left = `${Math.random() * 100}vw`;
        digitalStream.style.animationDuration = `${5 + Math.random() * 15}s`;
        digitalStream.style.animationDelay = `${Math.random() * 5}s`;
        
        backgroundAnimation.appendChild(digitalStream);
    }
}

// Initialize the background animations
createBackgroundElements();

// Chat functionality
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const chatMessages = document.getElementById('chatMessages');
const chips = document.querySelectorAll('.chip');

function sendMessage() {
    const message = messageInput.value.trim();
    if (message === '') return;
    
    // Add user message
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'message user-message';
    userMessageDiv.textContent = message;
    chatMessages.appendChild(userMessageDiv);
    
    // Clear input
    messageInput.value = '';
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Show typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.className = 'typing-dot';
        typingIndicator.appendChild(dot);
    }
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Simulate bot response after delay
    setTimeout(() => {
        // Remove typing indicator
        chatMessages.removeChild(typingIndicator);
        
        // Add bot response
        const botResponseDiv = document.createElement('div');
        botResponseDiv.className = 'message bot-message';
        
        // Sample Computer Networks responses based on keywords
        const cnResponses = [
            "The OSI model consists of seven layers: Physical, Data Link, Network, Transport, Session, Presentation, and Application. Each layer provides specific functions in the data communication process.",
            "TCP/IP is the fundamental suite of protocols that enables internet communication. It consists of four layers: Link, Internet, Transport, and Application.",
            "Routing is the process of selecting paths in a network to send data packets. Common routing protocols include OSPF, BGP, and RIP.",
            "Subnetting is the practice of dividing a network into smaller network segments. It helps with network management, security, and addressing efficiency.",
            "Network security involves various measures like firewalls, encryption, authentication, and intrusion detection systems to protect network infrastructure and data.",
            "Wireless networks use radio waves to transmit data between devices. Common standards include Wi-Fi (IEEE 802.11), Bluetooth, and cellular networks.",
            "IPv4 uses 32-bit addresses while IPv6 uses 128-bit addresses. IPv6 was developed to address the IPv4 address exhaustion problem."
        ];
        
        botResponseDiv.textContent = cnResponses[Math.floor(Math.random() * cnResponses.length)];
        chatMessages.appendChild(botResponseDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1500);
}

// Event listeners
sendButton.addEventListener('click', sendMessage);

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

chips.forEach(chip => {
    chip.addEventListener('click', () => {
        messageInput.value = chip.textContent;
        messageInput.focus();
    });
});