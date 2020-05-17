// // Usage: 
// drawLineWithArrows(320,425,240,200,5,8,false,true);
// // x0,y0: the line's starting point
// // x1,y1: the line's ending point
// // width: the distance the arrowhead perpendicularly extends away from the line
// // height: the distance the arrowhead extends backward from the endpoint
// // arrowStart: true/false directing to draw arrowhead at the line's starting point
// // arrowEnd: true/false directing to draw arrowhead at the line's ending point
// function drawLineWithArrows(x0,y0,x1,y1,aWidth,aLength,arrowStart,arrowEnd){
//     var dx=x1-x0;
//     var dy=y1-y0;
//     var angle=Math.atan2(dy,dx);
//     var length=Math.sqrt(dx*dx+dy*dy);
//     //
//     const ctx = document.getElementById('myCanvas').getContext('2d');
//     ctx.translate(x0,y0);
//     ctx.rotate(angle);
//     ctx.beginPath();
//     ctx.moveTo(0,0);
//     ctx.bezierCurveTo(70, 200, 200, 120, 250, 20);
//     // ctx.lineTo(length,0);
//     if(arrowStart){
//         ctx.moveTo(aLength,-aWidth);
//         ctx.moveTo(aLength,-aWidth);
//         ctx.lineTo(0,0);
//         ctx.lineTo(aLength,aWidth);
//     }
//     if(arrowEnd){
//         ctx.moveTo(length-aLength,-aWidth);
//         ctx.lineTo(length,0);
//         ctx.lineTo(length-aLength,aWidth);
//     }
//     //
//     ctx.stroke();
//     ctx.setTransform(1,0,0,1,0,0);
// }
"use strict";