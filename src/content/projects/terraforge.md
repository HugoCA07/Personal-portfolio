---
title: TerraForge
summary: Un juego sandbox 2D y su propio motor, escritos desde cero en C++ con SFML. Mundos infinitos generados proceduralmente, física propia y un ecosistema vivo.
year: 2026
category: project
status: En desarrollo
featured: true
order: 1
stack: [C++17, SFML 2.6, CMake]
specs:
  - { label: Lenguaje, value: C++17 + SFML }
  - { label: Mundo, value: Procedural e infinito }
  - { label: Física, value: AABB propia }
  - { label: Build, value: CMake }
repo: https://github.com/HugoCA07/TerraForge
accent: "#34c759"
# Huecos preparados (descomenta cuando tengas los archivos, ver src/assets/projects/terraforge/README.md):
# cover: ../../assets/projects/terraforge/cover.jpg
# coverAlt: Un mundo generado en TerraForge
# video: /videos/terraforge.mp4
# videoPoster: ../../assets/projects/terraforge/poster.jpg
# gallery:
#   - { src: ../../assets/projects/terraforge/01.jpg, alt: Cuevas generadas proceduralmente, caption: Cuevas con autómatas celulares }
---

## La idea

TerraForge nace de una pregunta sencilla: *¿cómo funciona por dentro un juego como Terraria?* En lugar de usar un motor existente, decidí construir el mío propio en C++ para entender cada pieza: el bucle de juego, el renderizado, la física y la generación de mundos.

## Características

- **Generación procedural del mundo:** terreno infinito con autómatas celulares para las cuevas y algoritmos de ruido para los biomas (bosque, desierto y nieve).
- **Autotiling inteligente:** un sistema de *bitmasking* propio que crea transiciones orgánicas entre bloques (tierra, piedra) y paredes de fondo.
- **Motor de física propio:** colisiones AABB, gravedad, fricción y movimiento cinético para entidades y partículas, todo escrito a mano.
- **Ciclo día/noche dinámico:** iluminación ambiental interpolada y antorchas que proyectan luz en tiempo real.
- **Ecosistema vivo:** IA para criaturas pacíficas (dodos) y combates contra jefes, como el Alpha T-Rex.
- **Crafteo e inventario:** inventario *drag & drop*, mesas de crafteo y hornos de fundición en tiempo real.

## Hoja de ruta

- [x] Movimiento, física y renderizado de sprites
- [x] Construcción y minería por tiles
- [x] Biomas, cuevas y minerales procedurales
- [x] Inventario y crafteo
- [x] IA básica y jefes
- [ ] Pathfinding A* para enemigos
- [ ] Música ambiental por bioma
- [ ] Multijugador (UDP/TCP)
