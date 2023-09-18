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

  interface RadarConfig {
    width: number;
    height: number;
    radius: number;
    rings: string[];
    circularSectors: string[];
  }

  onMount(() => {
    // Les données du Tech Radar (exemple)
    const data: TechnologyData[] = [
      {
        category: "Adopter",
        name: "Svelte",
        circularSector: "Quadrant1",
        radiusPercentage: 45,
        anglePercentage: 95,
      },
      {
        category: "Adopter",
        name: "D3.js",
        circularSector: "Quadrant1",
        radiusPercentage: 20,
        anglePercentage: 20,
      },
      {
        category: "Évaluer",
        name: "GraphQL",
        circularSector: "Quadrant1",
        radiusPercentage: 30,
        anglePercentage: 30,
      },
      {
        category: "Évaluer",
        name: "TypeScript",
        circularSector: "Quadrant1",
        radiusPercentage: 40,
        anglePercentage: 40,
      },
      {
        category: "Essayer",
        name: "WebAssembly",
        circularSector: "Quadrant1",
        radiusPercentage: 50,
        anglePercentage: 50,
      },
      {
        category: "Essayer",
        name: "Tailwind CSS",
        circularSector: "Quadrant1",
        radiusPercentage: 10,
        anglePercentage: 25,
      },
      {
        category: "Éviter",
        name: "jQuery",
        circularSector: "Quadrant1",
        radiusPercentage: 70,
        anglePercentage: 70,
      },
      {
        category: "Éviter",
        name: "AngularJS",
        circularSector: "Quadrant1",
        radiusPercentage: 50,
        anglePercentage: 50,
      },
    ];

    const radarConfig: RadarConfig = {
      width: 500,
      height: 0,
      radius: 0,
      rings: ["Adopter", "Évaluer", "Essayer", "Éviter"],
      circularSectors: ["Quadrant1", "Quadrant2", "Quadrant3", "Quadrant4"],
    };
    radarConfig.height = radarConfig.width;
    radarConfig.radius = radarConfig.width / 2 - 10;

    const convertToPolar = (d: TechnologyData) => {
      const ringIndex = radarConfig.rings.indexOf(d.category);
      const circularSectorIndex = radarConfig.circularSectors.indexOf(
        d.circularSector
      );
      const circularSectorsSize =
        (2 * Math.PI) / radarConfig.circularSectors.length;

      const angle =
        (circularSectorsSize * d.anglePercentage) / 100 +
        circularSectorIndex * circularSectorsSize;
      const currentRingRadius =
        (radarConfig.radius * (ringIndex + 1)) / radarConfig.rings.length;
      const previousRingRadius =
        (radarConfig.radius * ringIndex) / radarConfig.rings.length;
      const radius =
        previousRingRadius +
        ((currentRingRadius - previousRingRadius) * d.radiusPercentage) / 100;
      const centerX = radarConfig.width / 2;
      const centerY = radarConfig.height / 2;

      return {
        x: centerX + radius * Math.cos(angle - Math.PI / 2),
        y: centerY + radius * Math.sin(angle - Math.PI / 2),
      };
    };

    const svg = d3
      .select<HTMLDivElement, TechnologyData[]>("#radar")
      .append("svg")
      .attr("viewBox", `0 0 ${radarConfig.width} ${radarConfig.height}`);

    radarConfig.circularSectors.forEach((circularSector, index) => {
      const quadrant = index; // Identifie le quadrant
      const circularSectorsSize =
        (2 * Math.PI) / radarConfig.circularSectors.length;
      const offsetAngle = quadrant * circularSectorsSize;

      svg
        .append("path")
        .attr(
          "d",
          d3
            .arc<SVGPathElement, TechnologyData[]>()
            .innerRadius(0)
            .outerRadius(radarConfig.radius)
            .startAngle(offsetAngle)
            .endAngle(offsetAngle + circularSectorsSize)
        )
        .attr(
          "transform",
          `translate(${radarConfig.width / 2},${radarConfig.height / 2})`
        )
        .attr("stroke", "gray")
        .attr("fill", "none");
    });

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

    const colors = d3
      .scaleOrdinal<string>()
      .domain(radarConfig.rings.map(String))
      .range(["#7fc97f", "#beaed4", "#fdc086", "#ffff99"]);

    svg
      .selectAll("circle.tech")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "tech")
      .attr("cx", (d: TechnologyData) => convertToPolar(d).x)
      .attr("cy", (d: TechnologyData) => convertToPolar(d).y)
      .attr("r", 5)
      .attr("fill", (d: TechnologyData) =>
        colors(String(radarConfig.rings.indexOf(d.category)))
      )
      .append("title")
      .text((d: TechnologyData) => `${d.name} - ${d.category}`);
  });
</script>

<div id="radar"></div>

<style>
  #radar {
    display: block;
    margin: 0 auto;
    width: 50%;
    padding-bottom: 50%;
  }

  #radar:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }

  :global(#radar svg) {
    display: block;
    margin: 0 auto;
  }

  :global(#radar circle.tech) {
    cursor: pointer;
  }
</style>
