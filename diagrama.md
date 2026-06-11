graph TD
    A([Inicio: monitor.py]) --> B[Captura de paquetes en la red]
    B --> C{¿Se detecta IP / MAC origen?}
    C -- Sí --> D{¿IP/MAC en whitelist.py?}
    C -- No --> B
    D -- No --> E[Bloqueo Lógico / Registro de Intrusión]
    E --> F[mailer.py: Enviar correo de Alerta a Admin]
    F --> Z([Fin del ciclo de paquete])
    D -- Sí --> G[logger.py: Registrar tráfico y consultas DNS]
    G --> H{threatintel.py: ¿IP destino en Lista Negra?}
    H -- Sí --> I[Detección de Amenaza / Virus]
    I --> J[whois_lookup.py: Ejecutar consulta Forense/Abuse]
    J --> K[mailer.py: Enviar Alerta de Emergencia + Reporte]
    K --> Z
    H -- No --> L[Tráfico limpio permitido]
    L --> Z
    Z -.-> M[(Actualización en Dashboard Web: app.py)]
