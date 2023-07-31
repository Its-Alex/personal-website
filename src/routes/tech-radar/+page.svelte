<script lang="ts">
  import { onMount } from "svelte";
  import * as d3 from "d3";

  // Définir une interface pour le type des données
  interface TechnologyData {
    category: string;
    name: string;
    radiusPercentage: number;
    anglePercentage: number;
  }

  onMount(() => {
    // Les données du Tech Radar (exemple)
    const data: TechnologyData[] = [
      { category: "Adopter", name: "Svelte", radiusPercentage: 100, anglePercentage: 100 },
      { category: "Adopter", name: "D3.js", radiusPercentage: 20, anglePercentage: 20 },
      { category: "Évaluer", name: "GraphQL", radiusPercentage: 30, anglePercentage: 30 },
      { category: "Évaluer", name: "TypeScript", radiusPercentage: 40, anglePercentage: 40 },
      { category: "Essayer", name: "WebAssembly", radiusPercentage: 50, anglePercentage: 50 },
      { category: "Essayer", name: "Tailwind CSS", radiusPercentage: 0, anglePercentage: 0 },
      { category: "Éviter", name: "jQuery", radiusPercentage: 70, anglePercentage: 70 },
      { category: "Éviter", name: "AngularJS", radiusPercentage: 80, anglePercentage: 100 },
    ];

    // Configuration du Tech Radar
    const radarConfig = {
      width: 600,
      height: 600,
      radius: 250,
      rings: ["Adopter", "Évaluer", "Essayer", "Éviter"],
    };

    // Fonction pour convertir les données en coordonnées polaires
    const convertToPolar = (d: TechnologyData) => {
      const ringIndex = radarConfig.rings.indexOf(d.category);
      const categoryData = data.filter((tech) => tech.category === radarConfig.rings[ringIndex]);
      const pointIndex = categoryData.findIndex((item) => item.name === d.name);

      const angle = (2 * Math.PI) * d.anglePercentage / 100;
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
    radarConfig.rings.forEach((ring, index) => {
      const quadrant = index; // Identifie le quadrant (0 à 3)
      const offsetAngle = quadrant * (Math.PI / 2); // Ajoute un décalage pour chaque quadrant

      svg
        .append("path")
        .attr(
          "d",
          d3.arc<SVGPathElement, TechnologyData[]>()
            .innerRadius(0)
            .outerRadius(radarConfig.radius)
            .startAngle(offsetAngle)
            .endAngle(offsetAngle + Math.PI / 2)
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
