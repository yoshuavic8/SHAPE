"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import type { CategoryScore, ShapeRecommendations } from "@/lib/shape-analyzer-adapter"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ShapeRelationshipChartProps {
  spiritualGifts: CategoryScore[]
  heartDesire: CategoryScore[]
  personality: CategoryScore[]
  experiences: CategoryScore[]
  recommendations: ShapeRecommendations
}

interface Node {
  id: string
  group: number
  score: number
  label: string
}

interface Link {
  source: string
  target: string
  value: number
  description: string
}

export function ShapeRelationshipChart({
  spiritualGifts,
  heartDesire,
  personality,
  experiences,
  recommendations,
}: ShapeRelationshipChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState("network")
  const [highlightedGroup, setHighlightedGroup] = useState<number | null>(null)

  // Get top items from each category
  const topSpiritual = spiritualGifts.slice(0, 3)
  const topHeart = heartDesire.slice(0, 3)
  const topAbilities = personality.filter(item => item.category.includes("Kemampuan:")).slice(0, 3)
  const personalityType = personality.find(p => p.category.includes("Tipe Kepribadian"))
  const topExperiences = experiences.slice(0, 3)

  // Prepare data for network visualization
  const prepareNetworkData = () => {
    const nodes: Node[] = []
    const links: Link[] = []

    // Add center node
    nodes.push({
      id: "SHAPE",
      group: 0,
      score: 5,
      label: "SHAPE Profile"
    })

    // Add category nodes
    nodes.push({
      id: "Spiritual",
      group: 1,
      score: 4,
      label: "Spiritual Gifts"
    })

    nodes.push({
      id: "Heart",
      group: 2,
      score: 4,
      label: "Heart Desire"
    })

    nodes.push({
      id: "Abilities",
      group: 3,
      score: 4,
      label: "Abilities"
    })

    nodes.push({
      id: "Personality",
      group: 4,
      score: 4,
      label: "Personality"
    })

    nodes.push({
      id: "Experiences",
      group: 5,
      score: 4,
      label: "Experiences"
    })

    // Connect category nodes to center
    links.push({ source: "SHAPE", target: "Spiritual", value: 3, description: "Spiritual Gifts component" })
    links.push({ source: "SHAPE", target: "Heart", value: 3, description: "Heart Desire component" })
    links.push({ source: "SHAPE", target: "Abilities", value: 3, description: "Abilities component" })
    links.push({ source: "SHAPE", target: "Personality", value: 3, description: "Personality component" })
    links.push({ source: "SHAPE", target: "Experiences", value: 3, description: "Experiences component" })

    // Add specific nodes for each category
    // Spiritual Gifts
    topSpiritual.forEach(gift => {
      const id = `S-${gift.category}`
      nodes.push({
        id,
        group: 1,
        score: gift.score,
        label: gift.category
      })
      links.push({
        source: "Spiritual",
        target: id,
        value: gift.score / 2,
        description: `Spiritual Gift: ${gift.category}`
      })
    })

    // Heart Desire
    topHeart.forEach(heart => {
      const id = `H-${heart.category}`
      nodes.push({
        id,
        group: 2,
        score: heart.score,
        label: heart.category
      })
      links.push({
        source: "Heart",
        target: id,
        value: heart.score / 2,
        description: `Heart Desire: ${heart.category}`
      })
    })

    // Abilities
    topAbilities.forEach(ability => {
      const abilityName = ability.category.replace("Kemampuan: ", "")
      const id = `A-${abilityName}`
      nodes.push({
        id,
        group: 3,
        score: ability.score,
        label: abilityName
      })
      links.push({
        source: "Abilities",
        target: id,
        value: ability.score / 2,
        description: `Ability: ${abilityName}`
      })
    })

    // Personality
    if (personalityType) {
      const mbtiType = personalityType.category.split(": ")[1]
      const id = `P-${mbtiType}`
      nodes.push({
        id,
        group: 4,
        score: 5,
        label: mbtiType
      })
      links.push({
        source: "Personality",
        target: id,
        value: 2.5,
        description: `Personality Type: ${mbtiType}`
      })
    }

    // Experiences
    topExperiences.forEach(exp => {
      const id = `E-${exp.category}`
      nodes.push({
        id,
        group: 5,
        score: exp.score,
        label: exp.category
      })
      links.push({
        source: "Experiences",
        target: id,
        value: exp.score / 2,
        description: `Experience: ${exp.category}`
      })
    })

    // Add synergy links based on SHAPE synergy
    if (recommendations.shapeSynergy) {
      // For each synergy, try to find the relevant nodes and connect them
      recommendations.shapeSynergy.forEach(synergy => {
        // Check for spiritual + personality synergy
        if (synergy.includes("Karunia") && synergy.includes("kepribadian")) {
          topSpiritual.forEach(gift => {
            if (synergy.includes(gift.category.split(" ")[0])) {
              if (personalityType) {
                const mbtiType = personalityType.category.split(": ")[1]
                links.push({
                  source: `S-${gift.category}`,
                  target: `P-${mbtiType}`,
                  value: 1,
                  description: synergy
                })
              }
            }
          })
        }

        // Check for heart + abilities synergy
        if (synergy.includes("passion") && synergy.includes("kemampuan")) {
          topHeart.forEach(heart => {
            if (synergy.includes(heart.category)) {
              topAbilities.forEach(ability => {
                const abilityName = ability.category.replace("Kemampuan: ", "")
                if (synergy.includes(abilityName)) {
                  links.push({
                    source: `H-${heart.category}`,
                    target: `A-${abilityName}`,
                    value: 1,
                    description: synergy
                  })
                }
              })
            }
          })
        }

        // Check for abilities + experiences synergy
        if (synergy.includes("Kemampuan") && synergy.includes("pengalaman")) {
          topAbilities.forEach(ability => {
            const abilityName = ability.category.replace("Kemampuan: ", "")
            if (synergy.includes(abilityName)) {
              topExperiences.forEach(exp => {
                if (synergy.includes(exp.category)) {
                  links.push({
                    source: `A-${abilityName}`,
                    target: `E-${exp.category}`,
                    value: 1,
                    description: synergy
                  })
                }
              })
            }
          })
        }
      })
    }

    return { nodes, links }
  }

  // Prepare data for chord diagram
  const prepareChordData = () => {
    const categories = ["Spiritual", "Heart", "Abilities", "Personality", "Experiences"]
    const matrix = [
      [0, 2, 3, 4, 1], // Spiritual connections
      [2, 0, 3, 1, 1], // Heart connections
      [3, 3, 0, 2, 3], // Abilities connections
      [4, 1, 2, 0, 2], // Personality connections
      [1, 1, 3, 2, 0]  // Experiences connections
    ]

    // Adjust matrix based on synergies
    if (recommendations.shapeSynergy) {
      recommendations.shapeSynergy.forEach(synergy => {
        if (synergy.includes("Karunia") && synergy.includes("kepribadian")) {
          matrix[0][3] += 1
          matrix[3][0] += 1
        }
        if (synergy.includes("passion") && synergy.includes("kemampuan")) {
          matrix[1][2] += 1
          matrix[2][1] += 1
        }
        if (synergy.includes("Kemampuan") && synergy.includes("pengalaman")) {
          matrix[2][4] += 1
          matrix[4][2] += 1
        }
      })
    }

    return { categories, matrix }
  }

  // Render network visualization
  const renderNetworkVisualization = () => {
    if (!svgRef.current || !tooltipRef.current) return

    const { nodes, links } = prepareNetworkData()

    // Clear previous visualization
    d3.select(svgRef.current).selectAll("*").remove()

    const width = svgRef.current.clientWidth
    const height = svgRef.current.clientHeight

    const svg = d3.select(svgRef.current)
    const tooltip = d3.select(tooltipRef.current)

    // Define color scale for groups
    const color = d3.scaleOrdinal()
      .domain([0, 1, 2, 3, 4, 5].map(String))
      .range(["#6366f1", "#22c55e", "#ef4444", "#3b82f6", "#a855f7", "#eab308"])

    // Create simulation
    const simulation = d3.forceSimulation(nodes as any)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius((d: any) => 20 + d.score * 3))

    // Add links
    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke-width", (d: any) => Math.sqrt(d.value) * 2)
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)

    // Add nodes
    const node = svg.append("g")
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", (d: any) => 10 + d.score * 3)
      .attr("fill", (d: any) => color(d.group.toString()))
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .on("mouseover", function(event, d: any) {
        // Highlight node
        d3.select(this)
          .attr("stroke", "#000")
          .attr("stroke-width", 2)

        // Highlight connected links
        link
          .attr("stroke", (l: any) => (l.source.id === d.id || l.target.id === d.id) ? "#000" : "#999")
          .attr("stroke-opacity", (l: any) => (l.source.id === d.id || l.target.id === d.id) ? 1 : 0.6)
          .attr("stroke-width", (l: any) => (l.source.id === d.id || l.target.id === d.id)
            ? Math.sqrt(l.value) * 3
            : Math.sqrt(l.value) * 2)

        // Show tooltip
        tooltip
          .style("opacity", 1)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 10) + "px")
          .html(`
            <div class="font-bold">${d.label}</div>
            <div class="text-xs">${d.group === 0 ? "Center" :
              d.group === 1 ? "Spiritual Gift" :
              d.group === 2 ? "Heart Desire" :
              d.group === 3 ? "Ability" :
              d.group === 4 ? "Personality Type" :
              "Experience"}</div>
            ${d.score ? `<div class="text-xs">Score: ${d.score}/5</div>` : ""}
          `)
      })
      .on("mouseout", function() {
        // Reset node
        d3.select(this)
          .attr("stroke", "#fff")
          .attr("stroke-width", 1.5)

        // Reset links
        link
          .attr("stroke", "#999")
          .attr("stroke-opacity", 0.6)
          .attr("stroke-width", (d: any) => Math.sqrt(d.value) * 2)

        // Hide tooltip
        tooltip.style("opacity", 0)
      })
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended) as any)

    // Add labels
    const label = svg.append("g")
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .text((d: any) => d.id === "SHAPE" ? d.label : d.id.includes("-") ? d.id.split("-")[1] : d.label)
      .attr("font-size", (d: any) => d.id === "SHAPE" ? "12px" : "10px")
      .attr("dx", (d: any) => d.id === "SHAPE" ? -30 : -15)
      .attr("dy", 4)
      .style("pointer-events", "none")

    // Update positions on simulation tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y)

      node
        .attr("cx", (d: any) => d.x = Math.max(20, Math.min(width - 20, d.x)))
        .attr("cy", (d: any) => d.y = Math.max(20, Math.min(height - 20, d.y)))

      label
        .attr("x", (d: any) => d.x)
        .attr("y", (d: any) => d.y)
    })

    // Drag functions
    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    }

    function dragged(event: any, d: any) {
      d.fx = event.x
      d.fy = event.y
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    }
  }

  // Render chord diagram
  const renderChordDiagram = () => {
    if (!svgRef.current || !tooltipRef.current) return

    const { categories, matrix } = prepareChordData()

    // Clear previous visualization
    d3.select(svgRef.current).selectAll("*").remove()

    const width = svgRef.current.clientWidth
    const height = svgRef.current.clientHeight
    const outerRadius = Math.min(width, height) * 0.4
    const innerRadius = outerRadius - 20

    const svg = d3.select(svgRef.current)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`)

    const tooltip = d3.select(tooltipRef.current)

    // Define color scale for groups
    const color = d3.scaleOrdinal()
      .domain(categories)
      .range(["#22c55e", "#ef4444", "#3b82f6", "#a855f7", "#eab308"])

    // Create chord layout
    const chord = d3.chord()
      .padAngle(0.05)
      .sortSubgroups(d3.descending)

    const chords = chord(matrix)

    // Create arc generator
    const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)

    // Create ribbon generator
    const ribbon = d3.ribbon()
      .radius(innerRadius)

    // Add groups
    const group = svg.append("g")
      .selectAll("g")
      .data(chords.groups)
      .enter()
      .append("g")

    // Add arcs
    group.append("path")
      .attr("d", arc as any)
      .style("fill", (d: any) => color(categories[d.index]))
      .style("stroke", "#fff")
      .on("mouseover", function(event, d: any) {
        // Highlight group
        d3.select(this)
          .style("opacity", 0.8)

        // Highlight ribbons
        ribbons
          .style("opacity", (r: any) =>
            r.source.index === d.index || r.target.index === d.index ? 0.9 : 0.1)

        // Show tooltip
        tooltip
          .style("opacity", 1)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 10) + "px")
          .html(`
            <div class="font-bold">${categories[d.index]}</div>
            <div class="text-xs">Connections: ${matrix[d.index].reduce((a, b) => a + b, 0)}</div>
          `)

        setHighlightedGroup(d.index)
      })
      .on("mouseout", function() {
        // Reset group
        d3.select(this)
          .style("opacity", 1)

        // Reset ribbons
        ribbons.style("opacity", 0.6)

        // Hide tooltip
        tooltip.style("opacity", 0)

        setHighlightedGroup(null)
      })

    // Add labels
    group.append("text")
      .each((d: any) => { d.angle = (d.startAngle + d.endAngle) / 2 })
      .attr("dy", ".35em")
      .attr("transform", (d: any) => `
        rotate(${(d.angle * 180 / Math.PI - 90)})
        translate(${outerRadius + 10})
        ${d.angle > Math.PI ? "rotate(180)" : ""}
      `)
      .attr("text-anchor", (d: any) => d.angle > Math.PI ? "end" : null)
      .text((d: any) => categories[d.index])
      .style("font-size", "10px")

    // Add ribbons
    const ribbons = svg.append("g")
      .selectAll("path")
      .data(chords)
      .enter()
      .append("path")
      .attr("d", ribbon as any)
      .style("fill", (d: any) => color(categories[d.source.index]))
      .style("opacity", 0.6)
      .on("mouseover", function(event, d: any) {
        // Highlight ribbon
        d3.select(this)
          .style("opacity", 0.9)

        // Show tooltip
        tooltip
          .style("opacity", 1)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 10) + "px")
          .html(`
            <div class="font-bold">${categories[d.source.index]} → ${categories[d.target.index]}</div>
            <div class="text-xs">Strength: ${d.source.value}</div>
          `)
      })
      .on("mouseout", function() {
        // Reset ribbon
        d3.select(this)
          .style("opacity", 0.6)

        // Hide tooltip
        tooltip.style("opacity", 0)
      })
  }

  // Render visualization based on active tab
  useEffect(() => {
    if (activeTab === "network") {
      renderNetworkVisualization()
    } else if (activeTab === "chord") {
      renderChordDiagram()
    }

    // Resize handler
    const handleResize = () => {
      if (activeTab === "network") {
        renderNetworkVisualization()
      } else if (activeTab === "chord") {
        renderChordDiagram()
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [activeTab])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>SHAPE Component Relationships</CardTitle>
        <CardDescription>
          Visualize how your SHAPE components interact and complement each other
        </CardDescription>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="network">Network View</TabsTrigger>
            <TabsTrigger value="chord">Chord Diagram</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <svg ref={svgRef} width="100%" height="500" />
          <div
            ref={tooltipRef}
            className="absolute bg-white dark:bg-gray-800 p-2 rounded shadow-lg text-sm opacity-0 pointer-events-none transition-opacity z-50 border"
            style={{ top: 0, left: 0 }}
          />
        </div>

        <div className="mt-4 text-sm">
          {activeTab === "network" && (
            <div>
              <p className="mb-2">This network visualization shows how your SHAPE components are connected. Larger nodes represent higher scores, and thicker lines represent stronger connections.</p>
              <p>Drag nodes to explore relationships. Hover over nodes and connections to see details.</p>
            </div>
          )}

          {activeTab === "chord" && (
            <div>
              <p className="mb-2">This chord diagram shows the strength of relationships between different SHAPE components. Thicker ribbons represent stronger connections.</p>
              <p>Hover over arcs and ribbons to see details about the connections.</p>

              {highlightedGroup !== null && (
                <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded">
                  <p className="font-bold">{categories[highlightedGroup]} Connections:</p>
                  <ul className="list-disc list-inside mt-1">
                    {categories.map((category, index) => {
                      if (index !== highlightedGroup && matrix[highlightedGroup][index] > 0) {
                        return (
                          <li key={index}>
                            {category}: Strength {matrix[highlightedGroup][index]}
                          </li>
                        )
                      }
                      return null
                    })}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
