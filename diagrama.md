graph TD
    A([Inicio: monitor.py]) --> B[Captura de paquetes en la red]
    B --> C{¿Se detecta IP / MAC?}
    
    C -- Sí --> D{¿En whitelist.py?}
    C -- No --> B
    
    D -- No --> E[Registro de Intrusión]
    E --> F[mailer.py: Alerta Admin]
    F --> Z([Fin])
    
    D -- Sí --> G[logger.py: Registrar DNS/HTTP]
    G --> H{threatintel.py: ¿IP en Lista Negra?}
    
    H -- Sí --> I[Detección de Amenaza]
    I --> J[whois_lookup.py: Consulta Forense]
    J --> K[mailer.py: Alerta Emergencia]
    K --> Z
    
    H -- No --> L[Tráfico permitido]
    L --> Z
