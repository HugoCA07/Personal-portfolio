---
title: Gestor de Aparcamientos
summary: Aplicación de escritorio para administrar una cadena de tres parkings — accesos, abonados, servicios, stock y personal — con arquitectura MVC, Java Swing y MySQL.
year: 2026
category: project
status: Completado
featured: true
order: 2
stack: [Java, Swing, MySQL, JDBC, MVC]
specs:
  - { label: Lenguaje, value: Java }
  - { label: Interfaz, value: Swing (JFrame) }
  - { label: Datos, value: MySQL + JDBC }
  - { label: Arquitectura, value: MVC }
repo: https://github.com/HugoCA07/1DAW-Proyecto_Gestor_Aparcamientos
team: [Jorge Fuentes Serrano, Hugo Cruz Aranda]
accent: "#0071e3"
---

## El reto

Proyecto académico de Bases de Datos y Programación: centralizar todas las operaciones de una cadena de tres aparcamientos en una única aplicación de escritorio.

## Qué hace

- Gestión de accesos para usuarios normales, abonados y trabajadores.
- Control de servicios adicionales como limpieza y cambios de aceite.
- Pedidos automáticos a proveedores según los niveles de stock.
- Administración de personal y turnos rotativos.

## Arquitectura

El proyecto sigue el patrón **Modelo-Vista-Controlador** para separar responsabilidades:

- **Modelo:** lógica de negocio y persistencia con JDBC y MySQL.
- **Vista:** interfaz gráfica con Java Swing.
- **Controlador:** eventos y flujo de datos entre la interfaz y la base de datos.

Desarrollado en equipo junto a Jorge Fuentes Serrano.
