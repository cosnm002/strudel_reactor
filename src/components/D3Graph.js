import { useEffect, useState } from "react";
import * as d3 from 'd3';


export default function D3Graph() {

    const [note, setNote] = useState(0);
    const [noteArray, setNoteArray] = useState([]);
    const [numberNoteArray, setNumberNoteArray] = useState([]);

    const maxItems = 50;
    const maxValue = 15;

    const noteMap = ["d3", "e3", "f3", "g3", "ab3", "a3", "bb3", "b3", "c4", "d4", "d#4", "e4", "f4", "g4"]








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


        const svg = d3.select('svg');
        svg.selectAll("*").remove();

        let w = svg.node().getBoundingClientRect().width;
        w = w - 1;
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
            .attr('transform', 'translate(0,-20)')
            .call(yAxis);


      

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
        chartGroup
            .append("linearGradient")
            .attr("id", "line-gradient")
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", 0)
            .attr("y1", yScale(-10))
            .attr("x2", 0)
            .attr("y2", yScale(maxValue))
            .selectAll("stop")
            .data([
                { offset: "50%", color: "blue" },
                { offset: "100%", color: "green" }
            ])
            .enter().append("stop")
            .attr("offset", function (d) { return d.offset; })
            .attr("stop-color", function (d) { return d.color; });

        chartGroup
            .append('path')
            .datum(numberNoteArray)
            .attr('fill', 'none')
            .attr('stroke', 'url(#line-gradient)')
            .attr('stroke-width', 3)
            .attr('d', d3.line()
                .x((d, i) => i * barWidth)
                .y((d) => yScale(d))
            )

    }, [numberNoteArray]);

    return (
        <div className="App container">

            <h1>
                Guitar Output: Note - {note}
            </h1>
            <div className="row">
                <svg width="100%" height="380px" className="border border-primary rounded p-2"></svg>

            </div>
        </div>
    );
};

