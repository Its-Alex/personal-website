<script lang="ts">
  import { onMount } from "svelte";
  import * as d3 from "d3";

  // Définir une interface pour le type des données
  interface TechnologyData {
    category: string;
    name: string;
    circularSector: string;
    radiusPercentage: number;
    anglePercentage: number;
  }

  onMount(() => {
    // Les données du Tech Radar (exemple)
    const data: TechnologyData[] = [
      { category: "Adopter", name: "Svelte", circularSector: "Quadrant1", radiusPercentage: 45, anglePercentage: 95 },
      { category: "Adopter", name: "D3.js", circularSector: "Quadrant2", radiusPercentage: 20, anglePercentage: 20 },
      { category: "Évaluer", name: "GraphQL", circularSector: "Quadrant3", radiusPercentage: 30, anglePercentage: 30 },
      { category: "Évaluer", name: "TypeScript", circularSector: "Quadrant4", radiusPercentage: 40, anglePercentage: 40 },
      { category: "Essayer", name: "WebAssembly", circularSector: "Quadrant1", radiusPercentage: 50, anglePercentage: 50 },
      { category: "Essayer", name: "Tailwind CSS", circularSector: "Quadrant2", radiusPercentage: 10, anglePercentage: 25 },
      { category: "Éviter", name: "jQuery", circularSector: "Quadrant3", radiusPercentage: 70, anglePercentage: 70 },
      { category: "Éviter", name: "AngularJS", circularSector: "Quadrant4", radiusPercentage: 80, anglePercentage: 85 },
    ];

    // Configuration du Tech Radar
    const radarConfig = {
      width: 600,
      height: 600,
      radius: 250,
      rings: ["Adopter", "Évaluer", "Essayer", "Éviter"],
      circularSectors: ["Quadrant1", "Quadrant2", "Quadrant3", "Quadrant4", "Quadrant5", "Quadrant6"],
    };

    // Fonction pour convertir les données en coordonnées polaires
    const convertToPolar = (d: TechnologyData) => {
      const ringIndex = radarConfig.rings.indexOf(d.category);
      const circularSectorIndex = radarConfig.circularSectors.indexOf(d.circularSector);
      const circularSectorsSize = (2 * Math.PI) / radarConfig.circularSectors.length;

      const angle = circularSectorsSize * d.anglePercentage / 100 + circularSectorIndex * circularSectorsSize;
      const currentRingRadius = ((radarConfig.radius * (ringIndex + 1)) / radarConfig.rings.length);
      const previousRingRadius = ((radarConfig.radius * (ringIndex)) / radarConfig.rings.length);
      const radius = previousRingRadius + (currentRingRadius - previousRingRadius) * d.radiusPercentage / 100;
      const centerX = radarConfig.width / 2;
      const centerY = radarConfig.height / 2;

      return {
        x: centerX + radius * Math.cos(angle - Math.PI / 2),
        y: centerY + radius * Math.sin(angle - Math.PI / 2),
      };
    };

    // Créer le SVG
    const svg = d3
      .select<SVGSVGElement, TechnologyData[]>("#radar")
      .append("svg")
      .attr("width", radarConfig.width)
      .attr("height", radarConfig.height);

    // Dessiner les quadrants 
    radarConfig.circularSectors.forEach((circularSector, index) => {
      const quadrant = index; // Identifie le quadrant
      const circularSectorsSize = (2 * Math.PI) / radarConfig.circularSectors.length;
      const offsetAngle = quadrant * circularSectorsSize; // Ajoute un décalage pour chaque quadrant

      svg
        .append("path")
        .attr(
          "d",
          d3.arc<SVGPathElement, TechnologyData[]>()
            .innerRadius(0)
            .outerRadius(radarConfig.radius)
            .startAngle(offsetAngle)
            .endAngle(offsetAngle + circularSectorsSize)
        )
        .attr(
          "transform",
          `translate(${radarConfig.width / 2},${radarConfig.height / 2})`
        ) // Centre le quadrant au même centre que les cercles
        .attr("stroke", "gray")
        .attr("fill", "none");
    });

    // Dessiner les cercles de chaque anneau
    radarConfig.rings.forEach((ring, index) => {
      svg
        .append("circle")
        .attr("cx", radarConfig.width / 2)
        .attr("cy", radarConfig.height / 2)
        .attr(
          "r",
          radarConfig.radius * ((index + 1) / radarConfig.rings.length)
        )
        .attr("stroke", "gray")
        .attr("fill", "none");
    });

    // Créer le scaleOrdinal avec les types appropriés
    const colors = d3
      .scaleOrdinal<string>()
      .domain(radarConfig.rings.map(String))
      .range(["#7fc97f", "#beaed4", "#fdc086", "#ffff99"]);

    // Dessiner les points pour chaque technologie
    svg
      .selectAll("circle.tech")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "tech")
      .attr(
        "cx",
        (d: TechnologyData) =>
          convertToPolar(d).x
      )
      .attr(
        "cy",
        (d: TechnologyData) =>
          convertToPolar(d).y
      )
      .attr("r", 5)
      .attr("fill", (d: TechnologyData) => colors(String(radarConfig.rings.indexOf(d.category))))
      .append("title")
      .text((d: TechnologyData) => `${d.name} - ${d.category}`);
  });
</script>

<div id="radar"></div>

<style>
  :global(svg) {
    display: block;
    margin: 0 auto;
  }

  :global(circle.tech) {
    cursor: pointer;
  }
</style>
