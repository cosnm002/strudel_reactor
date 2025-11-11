import { useEffect, useState } from "react";
import * as d3 from 'd3';


export default function D3Graph() {

    const [note, setNote] = useState(0);
    const [noteArray, setNoteArray] = useState([]);
    const [numberNote, setNumberNote] = useState(0);
    const [numberNoteArray, setNumberNoteArray] = useState([]);

    const maxItems = 50;
    const maxValue = 15;

    const noteMap = ["d3", "f3", "g3", "e3", "a3", "ab3", "bb3", "bb3", "c4", "d4", "b3", "d#4", "e4", "f4", "g4"]








    useEffect(() => {

        const handleD3Data = (event) => {
            const logArray = event.detail;

            const notes = logArray.map(line => {
                const match = line.match(/note:([a-g][b#]?\d)/);
                if (match) {
                    return match[1]
                } else {
                    return null;
                }

            })
            setNote(notes[notes.length - 1]);

            setNoteArray(notes);



            let tempArray = [...noteArray, note];
            if (tempArray.length > maxItems) {

                tempArray.shift();
            }

            setNoteArray(tempArray);



            const numberNotes = notes.map(e => noteMap.indexOf(e));
            setNumberNoteArray(numberNotes);
        };


            document.addEventListener("d3Data", handleD3Data);

        

    }, []);

    useEffect(() => {

        console.log(numberNoteArray);

        const svg = d3.select('svg');
        svg.selectAll("*").remove();

        let w = svg.node().getBoundingClientRect().width;
        w = w - 1; //change this to space out each value
        const barMargin = 10;
        const barWidth = 2;

        let h = svg.node().getBoundingClientRect().height;
        h = h - barMargin;



        let yScale = d3.scaleLinear()
            .domain([0, maxValue])
            .range([h, 0]);

        const chartGroup = svg.append('g')
            .classed('chartGroup', true)
            .attr('transform', 'translate(20, 4)');

        let yAxis = d3.axisLeft(yScale);
        chartGroup.append('g')
            .classed('axis y', true)
            .call(yAxis);

        //Bar Graph
        //let barGroups = chartGroup.selectAll()
        //    .data(rngArray.map((d) => LogToNum(d)))

        //let newBarGroups = barGroups.enter()
        //    .append('g')
        //    .attr('transform', (d, i) => {
        //        return `translate(${i * barWidth}, ${yScale(d)})`
        //    });

        //newBarGroups
        //    .append('rect')
        //    .attr('x', 5)
        //    .attr('height', d => h - yScale(d))
        //    .attr('width', barWidth - barMargin)
        //    .attr('y', 0)
        //    .style('fill', (d, i) => `rgb(${(360 / maxValue * d + 1)},
        //    ${ 360 - (360 / maxValue * d + 1) }, 60)`);


        //COLOUR THE ENTIRE LINE GRAPH
        //const colourScale = d3.scaleSequential(d3.interpolateRgb('Lime', 'Red')).domain([0, maxValue]);


      

        chartGroup
            .append('path')
            .datum(numberNoteArray)
            .attr('fill', 'none')
            .attr('stroke', 'black')
            .attr('stroke-width', 4)
            .attr('d', d3.line()
                .x((d, i) => i * barWidth)
                .y((d) => yScale(d))
            )

        ////COLOUR GRADIENT THE LINE GRAPH
        //chartGroup
        //    .append("linearGradient")
        //    .attr("id", "line-gradient")
        //    .attr("gradientUnits", "userSpaceOnUse")
        //    .attr("x1", 0)
        //    .attr("y1", yScale(0))
        //    .attr("x2", 0)
        //    .attr("y2", yScale(maxValue))
        //    .selectAll("stop")
        //    .data([
        //        { offset: "0%", color: "green" },
        //        { offset: "100%", color: "red" }
        //    ])
        //    .enter().append("stop")
        //    .attr("offset", function (d) { return d.offset; })
        //    .attr("stop-color", function (d) { return d.color; });

        //chartGroup
        //    .append('path')
        //    .datum(numberNoteArray)
        //    .attr('fill', 'none')
        //    .attr('stroke', 'url(#line-gradient)')
        //    .attr('stroke-width', 3)
        //    .attr('d', d3.line()
        //        .x((d, i) => i * barWidth)
        //        .y((d) => yScale(d))
        //    )

    }, [numberNoteArray]);

    return (
        <div className="App container">

            <h1>
                Guitar Output: Note - {note}
            </h1>
            <div className="row">
                <svg width="100%" height="380px" class="border border-primary rounded p-2"></svg>

            </div>
        </div>
    );
};

function LogToNum(input) {
    if (!input) { return 0 };
    var stringArray = input.split(/(\s+)/);
    for (const item of stringArray) {
        if (item.startsWith('gain:')) {
            let val = item.substring(5)
            return Number(val)
        }
    }
    return 0;
}
